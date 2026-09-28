/*
POLLING LOCATION TYPE
address: {
  line1: string,
  city: string,
  state: string,
  zip: string
}, 
notes: string, 
pollingHours: string, 
sources: [
  name: string,
  official: boolean
]
*/
type HookOutputPollingLocations = {
  columnsPollingLocations: { width: string; name: string }[];
  rowsPollingLocations: string[][];
};

export const usePollingLocations = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | null
): HookOutputPollingLocations => {
  // Bail if no data
  if (data === null || data.pollingLocations === undefined) {
    return { columnsPollingLocations: [], rowsPollingLocations: [] };
  }

  const { pollingLocations } = data;

  const columnsPollingLocations: { width: string; name: string }[] = [
    { width: "40%", name: "ADDRESS" },
    { width: "30%", name: "POLLING HOURS" },
    { width: "30%", name: "SOURCES" },
  ];

  const rowsPollingLocations: string[][] = pollingLocations.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (location: any) => {
      const sources = location.sources
        .map((source: { name: string; official: boolean }) => {
          return source.name;
        })
        .join(", ");
      return [
        Object.values(location.address).join(" "),
        location.pollingHours,
        sources,
      ];
    }
  );

  return { columnsPollingLocations, rowsPollingLocations };
};

type HookOutputStateInfo = {
  columnsStateInfo: { width: string; name: string }[];
  rowsStateInfo: string[][];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStateInfo = (data: any | null): HookOutputStateInfo => {
  // Bail if no data
  if (data === null || data.state === undefined) {
    return { columnsStateInfo: [], rowsStateInfo: [] };
  }
  const { state } = data;
  const columnsStateInfo: { width: string; name: string }[] = [
    { width: "1fr", name: "BALLOT INFO" },
    { width: "1fr", name: "ELECTION INFO" },
    { width: "1fr", name: "VOTING LOCATION FINDER" },
    { width: "1fr", name: "CORRESPONDENCE ADDRESS" },
    { width: "1fr", name: "SOURCES" },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowsStateInfo: string[][] = state.map((info: any) => {
    const { electionAdministrationBody, sources: infoSources } = info;
    const {
      ballotInfoUrl,
      correspondenceAddress,
      electionInfoUrl,
      votingLocationFinderUrl,
    } = electionAdministrationBody;
    const sources = infoSources
      .map((source: { name: string; official: boolean }) => {
        return source.name;
      })
      .join(", ");
    return [
      ballotInfoUrl,
      electionInfoUrl,
      votingLocationFinderUrl,
      Object.values(correspondenceAddress || []).join(" "),
      sources,
    ];
  });

  return { columnsStateInfo, rowsStateInfo };
};

// Matches the home page, e.g. "Tuesday, November 3, 2026"
export const formatDate = (date: string): string =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date.replace(/-/g, "/")));
