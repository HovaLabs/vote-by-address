import React from "react";
import { ResponsiveValue } from "styled-system";
import { Theme } from "./theme";
import { Spacer } from "./Spacer";
import { styled } from "./theme";
import { Box, BoxProps } from "./Box";

const Container = styled(Box)`
  display: flex;
`;

export const Stack: React.FC<
  {
    space: ResponsiveValue<string | number, Theme>;
  } & BoxProps
> = ({ children, flexDirection, space, color, ...rest }) => (
  <Container flexDirection={flexDirection} {...rest}>
    {React.Children.map(children, (child, index) => (
      <>
        {index === 0 ? null : (
          <Spacer
            {...(flexDirection === "vertical"
              ? { height: space }
              : { width: space })}
          />
        )}
        {child}
      </>
    ))}
  </Container>
);
