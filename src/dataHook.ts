import React from "react";
// used to get the initial list of tables and handles all top level tables logic
export const useGetData = (address: string): { data: any } => {
  const [data, setData] = React.useState<any>(null);
  const GOOGLE_CIVIC_INFO_URL = `https://www.googleapis.com/civicinfo/v2/voterinfo`;

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
  }, []);

  return { data };
};
