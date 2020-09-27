import React from "react";
import * as S from "./FooterStyles";
import { Box, Text, Spacer, Stack } from "../design-system";
import logo from "./media/logo.svg";

export const Footer: React.FC = () => {
  return (
    <Box
      display="flex"
      width="100%"
      flex="none"
      padding={{ mobile: "32px", tablet: "64px" }}
      justifyContent="space-between"
      alignItems="flex-end"
      flexWrap="wrap"
      marginTop="auto"
    >
      <Stack direction="vertical" space="32px">
        <S.Logo href="https://www.hovalabs.com/" target="_blank">
          <img alt="logo" src={logo} />
          <Text as="p" typography="paragraph1">
            Powered by Hova Labs
          </Text>
          <Spacer width="32px" />
        </S.Logo>
      </Stack>
      <Stack direction="vertical" space="16px">
        <Spacer height="16px" />
        <Box>
          <a href="/privacy-policy">Privacy Policy</a>
        </Box>
        <Box>
          <a href="/terms-of-use">Terms of use</a>
        </Box>
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
