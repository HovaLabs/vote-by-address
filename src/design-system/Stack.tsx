import React from "react";
import { ResponsiveValue } from "styled-system";
import { Theme } from "./theme";
import { Spacer } from "./Spacer";
import { styled } from "./theme";
import { Box, BoxProps } from "./Box";

const Container = styled(Box)<{ direction: "vertical" | "horizontal" }>`
  display: flex;
  flex-direction: ${(p) => (p.direction === "vertical" ? "column" : "row")};
`;

export const Stack: React.FC<
  {
    direction: "vertical" | "horizontal";
    space: ResponsiveValue<string | number, Theme>;
  } & BoxProps
> = ({ children, direction, space }) => (
  <Container direction={direction}>
    {React.Children.map(children, (child, index) => (
      <>
        {index === 0 ? null : (
          <Spacer
            {...(direction === "vertical"
              ? { height: space }
              : { width: space })}
          />
        )}
        {child}
      </>
    ))}
  </Container>
);
