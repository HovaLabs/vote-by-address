import React from "react";
import * as S from "./FooterStyles";
import { Text } from "../design-system";
import logo from "./media/logo.svg";

export const Footer: React.FC = () => {
  return (
    <S.Footer>
      <S.Logo href="https://www.hovalabs.com/" target="_blank">
        <img alt="logo" src={logo} />
        <Text as="p" margin={0} typography="paragraph1">
          Powered by Hova Labs
        </Text>
      </S.Logo>
      <S.Links>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-use">Terms of use</a>
      </S.Links>
    </S.Footer>
  );
};
