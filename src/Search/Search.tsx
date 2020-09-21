import React, { useState } from "react";
import arrow from "./media/arrow.svg";
import { Button, Text } from "../packages/design-system";
import * as S from "./SearchStyles";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Search: React.FC = () => {
  const [address, setAddress] = useState("");
  const history = useHistory();
  return (
    <S.ContainerOuter>
      <form
        onSubmit={(e) => {
          // Add onSubmit handler so users can hit enter to submit form
          e.preventDefault();
          history.push(`/result/${address}`);
        }}
      >
        <Text as="h1" typography="heading0">
          <strong>Enter your address</strong> to get local election info:
        </Text>

        <S.ContainerInput>
          <S.Input
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            placeholder="1600 Pennsylvania Ave., Washington, D.C., 20500"
          />
          <Link to={`/result/${address}`}>
            <Button size="mediumSquare" variant="primarySquare">
              <img src={arrow} />
            </Button>
          </Link>
        </S.ContainerInput>
      </form>
      <Footer />
    </S.ContainerOuter>
  );
};

export default Search;
