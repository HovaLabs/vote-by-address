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
      alignItems={{ mobile: "flex-start", tablet: "flex-end" }}
      justifyContent={{ mobile: "flex-end", tablet: "space-between" }}
      marginTop="auto"
      flexDirection={{ mobile: "column", tablet: "row" }}
      flexWrap="wrap"
      position="relative"
      zIndex={1}
    >
      <Stack flexDirection="column" space="32px">
        <S.Logo href="https://www.hovalabs.com/" target="_blank">
          <img alt="logo" src={logo} />
          <Text as="p" typography="paragraph1">
            Powered by Hova Labs
          </Text>
          <Spacer width="32px" />
        </S.Logo>
      </Stack>
      <Box display="flex" flexDirection={{ mobile: "column", tablet: "row" }}>
        <Spacer height={{ mobile: "32px", tablet: "64px" }} />
        <Box display="flex" alignItems="flex-end">
          <a href="/privacy-policy">
            <Text typography="paragraph1">Privacy Policy</Text>
          </a>
          <Box display={{ mobile: "none", tablet: "flex" }}>
            <Spacer width="32px" />
            <Text typography="paragraph0" color="primary">
              |
            </Text>
            <Spacer width="32px" />
          </Box>
        </Box>
        <Box display="flex" alignItems="flex-end">
          <a href="/terms-of-use">
            <Text typography="paragraph1">Terms of use</Text>
          </a>
          <Spacer height={{ mobile: "38px", tablet: 0 }} />
          <Box display={{ mobile: "none", tablet: "flex" }}>
            <Spacer width="32px" />
            <Text typography="paragraph0" color="primary">
              |
            </Text>
            <Spacer width="32px" />
          </Box>
        </Box>
        <Box display="flex" alignItems="flex-end">
          <Spacer height={{ mobile: "38px", tablet: 0 }} />

          <a
            href="https://forms.gle/nDFm7oMuTZhJGPe66"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text typography="paragraph1">Contact Us</Text>
          </a>
        </Box>
      </Box>
    </Box>
  );
};
