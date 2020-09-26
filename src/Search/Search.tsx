import React, { useState } from "react";
import google from "./media/google.svg";
import arrow from "./media/arrow.svg";
import { Button, Spacer, Text } from "../design-system";
import * as S from "./SearchStyles";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Footer } from "../Footer";

const useQuery = () => new URLSearchParams(useLocation().search);

const Search: React.FC = () => {
  const query = useQuery();
  const [address, setAddress] = useState(query.get("address") || "");
  const history = useHistory();
  const error = query.get("error");

  return (
    <S.ContainerOuter>
      <S.Form
        flex="1"
        width="100%"
        height="100%"
        position={{ mobile: "relative", tablet: "absolute" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="stretch"
        padding={{ mobile: "32px", tablet: "64px" }}
        onSubmit={(e) => {
          // Add onSubmit handler so users can hit enter to submit form
          e.preventDefault();
          history.push(`/result/${address}`);
        }}
      >
        <Text as="h1" typography={{ mobile: "heading4", tablet: "heading0" }}>
          <strong>Enter your address</strong> to get local election info:
        </Text>

        <S.ContainerInput>
          <S.Input
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            value={address}
            placeholder="1600 Pennsylvania Ave., Washington, D.C., 20500"
          />
          <Link to={`/result/${address}`}>
            <Button size="mediumSquare" variant="primarySquare">
              <img alt="arror" src={arrow} />
            </Button>
          </Link>
        </S.ContainerInput>
        {error ? (
          <>
            <Spacer height={32} />
            <Text typography="paragraph0" color="error">
              {error}
            </Text>
          </>
        ) : null}
        <Spacer height={32} />
        <S.Google>
          Data courtesy of:
          <Spacer width={12} />
          <a href="https://developers.google.com/civic-information">
            <img alt="google-logo" src={google} />
          </a>
        </S.Google>
      </S.Form>
      <Footer />
    </S.ContainerOuter>
  );
};

export default Search;
