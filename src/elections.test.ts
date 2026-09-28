import { getNextElection, pickCurrentElectionId } from "./elections";

describe("getNextElection", () => {
  it("counts down to the 2026 midterms", () => {
    const election = getNextElection(new Date(2026, 8, 27, 16, 30));
    expect(election.name).toBe("2026 Midterm Election");
    expect(election.date).toEqual(new Date(2026, 10, 3));
  });

  it("stays on the election through the end of election day", () => {
    expect(getNextElection(new Date(2026, 10, 3, 0, 0)).date).toEqual(
      new Date(2026, 10, 3)
    );
    expect(getNextElection(new Date(2026, 10, 3, 23, 59, 59)).date).toEqual(
      new Date(2026, 10, 3)
    );
  });

  it("rolls over to the presidential election the day after", () => {
    const election = getNextElection(new Date(2026, 10, 4));
    expect(election.name).toBe("2028 Presidential Election");
    expect(election.date).toEqual(new Date(2028, 10, 7));
  });

  it("skips odd years", () => {
    expect(getNextElection(new Date(2027, 0, 1)).date).toEqual(
      new Date(2028, 10, 7)
    );
  });

  it("uses the Tuesday after the first Monday, never November 1st", () => {
    // Nov 1 2022 was a Tuesday, so election day was the 8th
    expect(getNextElection(new Date(2022, 0, 1)).date).toEqual(
      new Date(2022, 10, 8)
    );
    // Nov 1 2032 is a Monday, so election day is the 2nd
    expect(getNextElection(new Date(2032, 0, 1)).date).toEqual(
      new Date(2032, 10, 2)
    );
    expect(getNextElection(new Date(2030, 0, 1)).date).toEqual(
      new Date(2030, 10, 5)
    );
  });
});

describe("pickCurrentElectionId", () => {
  const elections = [
    {
      id: "2000",
      name: "VIP Test Election",
      electionDay: "2031-12-06",
      ocdDivisionId: "ocd-division/country:us",
    },
    {
      id: "12001",
      name: "Virginia Special Election",
      electionDay: "2026-10-01",
      ocdDivisionId: "ocd-division/country:us/state:va",
    },
    {
      id: "12000",
      name: "2026 General Midterm Election",
      electionDay: "2026-11-03",
      ocdDivisionId: "ocd-division/country:us",
    },
  ];

  it("picks the upcoming national election, skipping the test and state elections", () => {
    expect(pickCurrentElectionId(elections, new Date(2026, 8, 27))).toBe(
      "12000"
    );
  });

  it("still picks it on election day", () => {
    expect(pickCurrentElectionId(elections, new Date(2026, 10, 3, 20))).toBe(
      "12000"
    );
  });

  it("returns null once the election has passed", () => {
    expect(pickCurrentElectionId(elections, new Date(2026, 10, 4))).toBeNull();
  });
});
