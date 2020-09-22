import { grid, GridProps as GridPropsSS } from "styled-system";
import { styled, Theme } from "./theme";
import { Box, BoxProps } from "./Box";

export type GridProps = BoxProps & GridPropsSS<Theme>;

export const Grid = styled(Box)<GridProps>`
  display: grid;
  ${grid}
`;
