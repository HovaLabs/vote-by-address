import React from "react";
import {
  Button,
  Text,
  Stack,
  DesignSystemProvider,
} from "./packages/design-system";

const App: React.FC = () => {
  return (
    <DesignSystemProvider>
      <Stack
        space="32px"
        direction="vertical"
        bg="background"
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
    </DesignSystemProvider>
  );
};

export default App;
