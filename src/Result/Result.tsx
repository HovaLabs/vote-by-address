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

const Result: React.FC = () => {
  const { address } = useParams<{ address?: string }>();
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
  } = useGetData(address || "");

  if (loading || data == null) {
    return <p>...Loading</p>;
  }

  // ELECTION DATA
  const { line1, city, state, zip } = data.normalizedInput;
  const { electionDay, name } = data.election;
  const line1Formatted = line1 !== "" ? `${line1}, ` : "";

  const location = (
    <S.ContainerLocation>
      <Text as="h1" typography="heading5">
        <strong>{name}</strong> Voting Information for
      </Text>
      <Spacer height="32px"></Spacer>
      <Text
        as="h1"
        backgroundColor="primary"
        color="onPrimary"
        display="inline"
        typography="headingBold0"
      >
        {`${line1Formatted} ${city} ${state} ${zip}`}
      </Text>
      <Spacer height="32px"></Spacer>
      <Text as="p" typography="paragraph0">
        <strong>Election Day:</strong> {formatDate(electionDay)}
      </Text>
    </S.ContainerLocation>
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      height="100%"
    >
      <Link to="/">
        <S.BackLink>
          <img alt="arrow" src={arrow} />
          <Text as="p" typography="paragraph0">
            Back to Address Form
          </Text>
        </S.BackLink>
      </Link>
      {location}
      {data.state && (
        <Table
          columns={columnsStateInfo}
          data={data.state}
          rows={rowsStateInfo}
          title={`Official ${data.state[0].name} State Voting Information`}
        />
      )}
      {data.earlyVoteSites && (
        <Table
          columns={columnsEarlyVoteSites}
          data={data.earlyVoteSites}
          rows={rowsEarlyVoteSites}
          title="Your Early Vote Locations"
        />
      )}
      {data.dropOffLocations && (
        <Table
          columns={columnsDropOffLocations}
          data={data.dropOffLocations}
          rows={rowsDropOffLocations}
          title="Your Ballot Drop Box Locations"
        />
      )}
      {data.pollingLocations && (
        <Table
          columns={columnsPollingLocations}
          data={data.pollingLocations}
          rows={rowsPollingLocations}
          title="Your Polling Locations"
        />
      )}
      <Spacer height={64} />
      <Box padding={{ mobile: 32, tablet: 32, desktop: 64 }}>
        <Text typography="paragraph0">
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
