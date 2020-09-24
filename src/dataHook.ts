import React from "react";

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
  latitude: string;
  longitude: string;
  notes: string;
  sources: Source[];
};

type RequestData = {
  dropOffLocations: DropOffLocation[];
  earlyVoteSites: EarlyVoteSite[];
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

const GOOGLE_CIVIC_INFO_URL = `https://www.googleapis.com/civicinfo/v2/voterinfo`;

// used to get the initial list of tables and handles all top level tables logic
export const useGetData = (address: string): { data: RequestData } => {
  const [data, setData] = React.useState<RequestData>(null);

  React.useEffect(() => {
    const doTheThing = async () => {
      try {
        const queryParams: Record<string, string> = {
          address: address,
          electionId: "7000",
          key: process.env.REACT_APP_GOOGLE_CIVIC_API_KEY ?? "",
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
        setData(fetchData);
      } catch (ex) {
        console.error("fetch fail", ex);
      }
    };

    doTheThing();
  }, [address]);

  return { data };
};
