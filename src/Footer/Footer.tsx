import React from "react";
import * as S from "./FooterStyles";
import google from "./media/google.svg";
import { Text } from "../design-system";
import logo from "./media/logo.svg";

const Footer: React.FC = () => {
  return (
    <S.OuterContainer>
      <S.Logo href="https://www.hovalabs.com/" target="_blank">
        <img alt="logo" src={logo} />
        {/* @ts-ignore */}
        <Text as="p" typography="paragraph1">
          Powered by Hova Labs
        </Text>
      </S.Logo>
      <S.Google>
        <a href="https://developers.google.com/civic-information">
          <img alt="google-logo" src={google} />
        </a>
      </S.Google>
    </S.OuterContainer>
  );
};

export default Footer;
