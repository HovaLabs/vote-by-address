import React from "react";
import * as S from "./FooterStyles";
import google from "./media/google.svg";
import { Box, Text, Spacer, Stack } from "../design-system";
import logo from "./media/logo.svg";

export const Footer: React.FC = () => {
  return (
    <Box
      display="flex"
      width="100%"
      marginTop="auto"
      padding="64px"
      justifyContent="space-between"
      alignItems="flex-end"
      flexWrap="wrap"
    >
      <Stack direction="vertical" space="32px">
        <S.Logo href="https://www.hovalabs.com/" target="_blank">
          <img alt="logo" src={logo} />
          <Text as="p" typography="paragraph1">
            Powered by Hova Labs
          </Text>
        </S.Logo>
        <S.Google>
          <a href="https://developers.google.com/civic-information">
            <img alt="google-logo" src={google} />
          </a>
        </S.Google>
      </Stack>
      <Stack direction="vertical" space="16px" marginLeft="auto">
        <Spacer height="16px" />
        <Box>
          <a
            href="https://forms.gle/nDFm7oMuTZhJGPe66"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </Box>
      </Stack>
    </Box>
  );
};
