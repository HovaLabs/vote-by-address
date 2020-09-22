import React from "react";
import {
  Box,
  Button,
  CookieWarning,
  Grid,
  Text,
  Stack,
  DesignSystemProvider,
} from "./design-system";
import { AnalyticsProvider, useAnalytics } from "./Analytics";

const Contexts: React.FC = ({ children }) => (
  <DesignSystemProvider>
    <AnalyticsProvider>{children}</AnalyticsProvider>
  </DesignSystemProvider>
);

const App: React.FC = () => {
  const { initialize } = useAnalytics();

  return (
    <Contexts>
      <Stack
        space="32px"
        direction="vertical"
        bg="surface"
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
      >
        <Text as="h1" typography="headingBold0">
          Oh
        </Text>
        <Text typography={{ mobile: "heading0", tablet: "heading1" }}>
          Hello World
        </Text>
        <Button
          size="medium"
          variant="primary"
          width={{ mobile: 120, tablet: 160, desktop: 200 }}
          onClick={() => alert("dang")}
        >
          Click me!
        </Button>
      </Stack>
      <Grid
        gridTemplateColumns={{
          mobile: "1fr",
          tablet: "1fr 1fr",
          desktop: "1fr 1fr 1fr",
        }}
      >
        <Box>Oh</Box>
        <Box>Oh</Box>
        <Box>Oh</Box>
        <Box>Oh</Box>
        <Box>Oh</Box>
        <Box>Oh</Box>
      </Grid>
      <CookieWarning
        cookieKey="hova-labs-analytics-consent"
        handleBannerAcknowledged={initialize}
      >
        <Box>We're watching you!</Box>
      </CookieWarning>
    </Contexts>
  );
};

export default App;
