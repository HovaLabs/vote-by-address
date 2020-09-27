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

export const formatDate = (date: string): string => {
  const d = new Date(date.replace(/-/g, "/"));
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${mo} ${da}, ${ye}`;
};
