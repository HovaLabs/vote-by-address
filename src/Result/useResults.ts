import React from "react";
import { useHistory } from "react-router";

type Address = {
  city: string;
  line1: string;
  line2?: string;
  locationName?: string;
  state: string;
  zip: string;
};

type Source = {
  name: string;
  official: boolean;
};

type DropOffLocation = {
  address: Address;
  endDate: string;
  latitude: string;
  longitude: string;
  notes: string;
  pollingHours: string;
  sources: Source[];
  startDate: string;
};

type EarlyVoteSite = {
  address: Address;
  startDate: string;
  endDate: string;
  latitude: string;
  longitude: string;
  notes: string;
  pollingHours: string;
  sources: Source[];
};

type Location = {
  address: Address;
  sources: Source[];
  pollingHours: string;
  notes: string;
  voterServices: string;
  name: string;
  startDate: string;
  endDate: string;
  latitude: string;
  longitude: string;
};

type RequestData = {
  dropOffLocations: DropOffLocation[];
  earlyVoteSites: EarlyVoteSite[];
  pollingLocations?: Location[];
  election: {
    electionDay: string;
    id: string;
    name: string;
    ocdDivisionId: string;
  };
  kind: "civicinfo#voterInfoResponse";
  normalizedInput: Address;
  state: {
    name: string;
    electionAdministrationBody: {
      name: string;
      electionInfoUrl: string;
      electionRegistrationUrl: string;
      electionRegistrationConfirmationUrl: string;
      absenteeVotingInfoUrl: string;
      ballotInfoUrl: string;
      electionRulesUrl: string;
      physicalAddress: Address;
      correspondenceAddress?: Address;
      votingLocationFinderUrl?: string;
    };
    local_jurisdiction: {
      name: string;
      electionAdministrationBody: {
        name: string;
        electionInfoUrl: string;
        electionRegistrationUrl: string;
        electionRegistrationConfirmationUrl: string;
        absenteeVotingInfoUrl: string;
        ballotInfoUrl: string;
        electionRulesUrl: string;
        physicalAddress: Address;
      };
      sources: Source[];
    };
    sources: Source[];
  }[];
} | null;

type DropOffLocations = {
  columnsDropOffLocations: { width: string; name: string }[];
  rowsDropOffLocations: string[][];
};

type EarlyVoteSites = {
  columnsEarlyVoteSites: { width: string; name: string }[];
  rowsEarlyVoteSites: string[][];
};

type PollingLocations = {
  columnsPollingLocations: { width: string; name: string }[];
  rowsPollingLocations: string[][];
};

type StateInfo = {
  columnsStateInfo: { width: string; name: string }[];
  rowsStateInfo: string[][];
};

const GOOGLE_CIVIC_INFO_URL =
  "https://www.googleapis.com/civicinfo/v2/voterinfo";

// used to get the initial list of tables and handles all top level tables logic
export const useGetData = (
  address: string
): DropOffLocations &
  PollingLocations &
  StateInfo &
  EarlyVoteSites & {
    data: RequestData;
    loading: boolean;
    error: string | void;
  } => {
  const history = useHistory();
  const [data, setData] = React.useState<RequestData>(null);
  const [error, setError] = React.useState<string | void>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const doTheThing = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const queryParams: Record<string, string> = {
          address: address,
          electionId: "7000", // 2000 is test election
          key: process.env.REACT_APP_GOOGLE_CIVIC_API_KEY ?? "", // https://console.developers.google.com/apis/credentials
        };
        const stringifiedQueryParams = new URLSearchParams(
          queryParams
        ).toString();
        const url = `${GOOGLE_CIVIC_INFO_URL}?${stringifiedQueryParams}`;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: myHeaders,
        });

        const fetchData = await response.json();
        if (fetchData.error) {
          const params = new URLSearchParams();
          if (fetchData.error.message === "Failed to parse address") {
            params.set("error", `${fetchData.error.message}: "${address}"`);
          } else {
            params.set("error", fetchData.error.message);
          }
          params.set("address", address);
          history.push(`/?${params.toString()}`);
        }

        setData(fetchData);
      } catch (ex) {
        console.error("fetch fail", ex);
        setError("Request error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    doTheThing();
  }, [address, history]);

  const { columnsDropOffLocations, rowsDropOffLocations } = getDropOffLocations(
    data
  );

  const { columnsEarlyVoteSites, rowsEarlyVoteSites } = getEarlyVoteSites(data);

  const { columnsPollingLocations, rowsPollingLocations } = getPollingLocations(
    data
  );
  const { columnsStateInfo, rowsStateInfo } = getStateInfo(data);

  return {
    data,
    error,
    loading,
    columnsDropOffLocations,
    rowsDropOffLocations,
    columnsEarlyVoteSites,
    rowsEarlyVoteSites,
    columnsPollingLocations,
    rowsPollingLocations,
    columnsStateInfo,
    rowsStateInfo,
  };
};

export const getDropOffLocations = (data: RequestData): DropOffLocations => {
  // Bail if no data
  if (data == null || data.dropOffLocations == null) {
    return { columnsDropOffLocations: [], rowsDropOffLocations: [] };
  }
  const { dropOffLocations } = data;

  const columnsDropOffLocations: { width: string; name: string }[] = [
    { width: "2fr", name: "ADDRESS" },
    { width: "2fr", name: "START DATE" },
    { width: "2fr", name: "END DATE" },
    { width: "2fr", name: "POLLING HOURS" },
    { width: "2fr", name: "NOTES" },
    { width: "2fr", name: "SOURCES" },
  ];

  const rowsDropOffLocations: string[][] = dropOffLocations.map((location) => {
    const sources = location.sources
      .map((source: { name: string; official: boolean }) => {
        return source.name;
      })
      .join(", ");
    return [
      Object.values(location.address).join(" "),
      formatDate(location.startDate),
      formatDate(location.endDate),
      location.pollingHours,
      location.notes,
      sources,
    ];
  });

  return { columnsDropOffLocations, rowsDropOffLocations };
};

export const getEarlyVoteSites = (data: RequestData): EarlyVoteSites => {
  // Bail if no data
  if (data == null || data.earlyVoteSites == null) {
    return { columnsEarlyVoteSites: [], rowsEarlyVoteSites: [] };
  }
  const { earlyVoteSites } = data;

  const columnsEarlyVoteSites: { width: string; name: string }[] = [
    { width: "2fr", name: "ADDRESS" },
    { width: "2fr", name: "START DATE" },
    { width: "2fr", name: "END DATE" },
    { width: "2fr", name: "POLLING HOURS" },
    { width: "2fr", name: "NOTES" },
    { width: "2fr", name: "SOURCES" },
  ];

  const rowsEarlyVoteSites: string[][] = earlyVoteSites.map((location) => {
    const sources = location.sources
      .map((source: { name: string; official: boolean }) => {
        return source.name;
      })
      .join(", ");
    return [
      Object.values(location.address).join(" "),
      formatDate(location.startDate),
      formatDate(location.endDate),
      location.pollingHours,
      location.notes,
      sources,
    ];
  });

  return { columnsEarlyVoteSites, rowsEarlyVoteSites };
};

export const getPollingLocations = (data: RequestData): PollingLocations => {
  // Bail if no data
  if (data == null || data.pollingLocations == null) {
    return { columnsPollingLocations: [], rowsPollingLocations: [] };
  }
  const { pollingLocations } = data;

  const columnsPollingLocations: { width: string; name: string }[] = [
    { width: "2fr", name: "ADDRESS" },
    { width: "2fr", name: "START DATE" },
    { width: "2fr", name: "END DATE" },
    { width: "2fr", name: "POLLING HOURS" },
    { width: "2fr", name: "NOTES" },
    { width: "2fr", name: "SOURCES" },
  ];

  const rowsPollingLocations: string[][] = pollingLocations.map((location) => {
    const sources = location.sources
      .map((source: { name: string; official: boolean }) => {
        return source.name;
      })
      .join(", ");
    return [
      Object.values(location.address).join(" "),
      location.startDate,
      location.endDate,
      location.pollingHours,
      location.notes,
      sources,
    ];
  });

  return { columnsPollingLocations, rowsPollingLocations };
};

export const getStateInfo = (data: RequestData): StateInfo => {
  // Bail if no data
  if (data == null || data.state == null) {
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

  const rowsStateInfo: string[][] = state.map((info) => {
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
      votingLocationFinderUrl || "",
      Object.values(correspondenceAddress || []).join(" "),
      sources,
    ];
  });

  return { columnsStateInfo, rowsStateInfo };
};

export const formatDate = (date: string | undefined): string => {
  if (date === undefined) {
    return "";
  }
  const d = new Date(date.replace(/-/g, "/"));
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${mo} ${da}, ${ye}`;
};
