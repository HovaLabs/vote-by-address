import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "./useResults";
import { Link } from "react-router-dom";
import { Box, Spacer, Text } from "../design-system";
import { Footer } from "../Footer";
import arrow from "./media/arrow-white.svg";
import * as S from "./ResultStyles";
import { formatDate } from "./ResultUtils";
import Table from "../Table/Table";
import { LocationTabs } from "./LocationTabs";

type ResultProps = {
  // Defaults to the address in the URL
  address?: string;
  // Defaults to the upcoming national election
  electionId?: string;
};

const Result: React.FC<ResultProps> = (props) => {
  const params = useParams<{ address?: string }>();
  const address = props.address ?? params.address;
  const {
    data,
    loading,
    columnsEarlyVoteSites,
    rowsEarlyVoteSites,
    columnsDropOffLocations,
    rowsDropOffLocations,
    columnsPollingLocations,
    rowsPollingLocations,
    columnsStateInfo,
    rowsStateInfo,
  } = useGetData(address || "", props.electionId);

  if (loading || data == null) {
    return <p>...Loading</p>;
  }

  // ELECTION DATA
  const { line1, city, state, zip } = data.normalizedInput;
  const { electionDay, name } = data.election;
  const addressFormatted = [line1, city, [state, zip].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");

  const location = (
    <S.ContainerLocation>
      <Text as="p" typography={{ mobile: "heading6", desktop: "heading5" }}>
        <strong>{name}</strong> Voting Information for
      </Text>
      <Spacer height="16px" />
      <Text
        as="h1"
        color="primary"
        typography={{ mobile: "headingBold4", desktop: "headingBold0" }}
      >
        {addressFormatted}
      </Text>
      <Spacer height="32px" />
      <Text as="p" color="onBackgroundMuted" typography="caption0">
        ELECTION DAY
      </Text>
      <Spacer height="4px" />
      <Text as="p" typography="paragraphBold0">
        {formatDate(electionDay)}
      </Text>
    </S.ContainerLocation>
  );

  // Only the lists Google has locations for
  const locationTabs = [
    {
      id: "early-vote",
      label: "Early Voting",
      description: "Places where you can vote in person before Election Day.",
      locations: data.earlyVoteSites,
      columns: columnsEarlyVoteSites,
      rows: rowsEarlyVoteSites,
    },
    {
      id: "drop-off",
      label: "Ballot Drop Boxes",
      description:
        "Places where you can drop off your completed mail-in ballot instead of mailing it.",
      locations: data.dropOffLocations,
      columns: columnsDropOffLocations,
      rows: rowsDropOffLocations,
    },
    {
      id: "polling",
      label: "Polling Places",
      description: "Places where you can vote in person on Election Day.",
      locations: data.pollingLocations,
      columns: columnsPollingLocations,
      rows: rowsPollingLocations,
    },
  ]
    .filter(({ locations }) => locations != null && locations.length > 0)
    .map(({ id, label, description, locations, columns, rows }) => ({
      id,
      label,
      description,
      count: locations?.length ?? 0,
      content: <Table columns={columns} data={locations} rows={rows} />,
    }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      height="100%"
    >
      <Link to="/search">
        <S.BackLink>
          <img alt="arrow" src={arrow} />
          <Text as="p" typography="paragraph0">
            Back to Address Form
          </Text>
        </S.BackLink>
      </Link>
      {location}
      <LocationTabs tabs={locationTabs} />
      {data.state && (
        <Table
          columns={columnsStateInfo}
          data={data.state}
          rows={rowsStateInfo}
          title={`Official ${data.state[0].name} State Voting Information`}
        />
      )}
      <Spacer height={64} />
      <Box padding={{ mobile: 32, tablet: 32, desktop: 64 }}>
        <Text typography="paragraph0" color="onBackgroundSecondary">
          {`Want to know if/when more data is coming for ${data.state[0].name}?`}{" "}
          Check out{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/17sOYnw7VGg-1LVCKplvqc38HOpYdoKT0wPyWcMRoKSg/edit#gid=0"
          >
            this official Google Civic API spreadsheet
          </a>
          !
        </Text>
      </Box>
      <Footer />
    </Box>
  );
};

export default Result;
