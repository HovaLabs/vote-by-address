const GOOGLE_CIVIC_ELECTIONS_URL =
  "https://www.googleapis.com/civicinfo/v2/elections";
const NATIONAL_DIVISION_ID = "ocd-division/country:us";
const TEST_ELECTION_ID = "2000";

export type Election = {
  name: string;
  // Start of election day, local time
  date: Date;
};

type CivicElection = {
  id: string;
  name: string;
  electionDay: string;
  ocdDivisionId: string;
};

// Federal general elections fall on the Tuesday after the first Monday in November
const getElectionDay = (year: number): Date => {
  const novemberFirstWeekday = new Date(year, 10, 1).getDay();
  const firstMonday = 1 + ((8 - novemberFirstWeekday) % 7);
  return new Date(year, 10, firstMonday + 1);
};

// The next midterm or presidential election, which stays "next" through the
// end of election day
export const getNextElection = (now: Date): Election => {
  let year = now.getFullYear() + (now.getFullYear() % 2);
  const electionDay = getElectionDay(year);
  const dayAfter = new Date(year, 10, electionDay.getDate() + 1);
  if (now >= dayAfter) {
    year += 2;
  }
  const type = year % 4 === 0 ? "Presidential" : "Midterm";
  return { name: `${year} ${type} Election`, date: getElectionDay(year) };
};

const toDateString = (date: Date): string =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((n) => String(n).padStart(2, "0"))
    .join("-");

export const pickCurrentElectionId = (
  elections: CivicElection[],
  now: Date
): string | null => {
  const today = toDateString(now);
  const upcoming = elections
    .filter(
      (election) =>
        election.id !== TEST_ELECTION_ID &&
        election.ocdDivisionId === NATIONAL_DIVISION_ID &&
        election.electionDay >= today
    )
    .sort((a, b) => a.electionDay.localeCompare(b.electionDay));
  return upcoming.length > 0 ? upcoming[0].id : null;
};

// Google's ID for the upcoming national election, or null if it hasn't
// published one yet
export const fetchCurrentElectionId = async (): Promise<string | null> => {
  const queryParams = new URLSearchParams({
    key: process.env.REACT_APP_GOOGLE_CIVIC_API_KEY ?? "",
  });
  const response = await fetch(
    `${GOOGLE_CIVIC_ELECTIONS_URL}?${queryParams.toString()}`
  );
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return pickCurrentElectionId(data.elections ?? [], new Date());
};
