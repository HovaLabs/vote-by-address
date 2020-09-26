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
        {`${line1Formatted} ${city}, ${state} ${zip}`}
      </Text>
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
          rows={rowsStateInfo}
          title={`Official ${data.state[0].name} State Voting Information`}
        />
      )}
      {data.pollingLocations && (
        <Table
          columns={columnsPollingLocations}
          rows={rowsPollingLocations}
          title="Your Polling Locations"
        />
      )}
      <Footer />
    </Box>
  );
};

export default Result;
