import { grid, GridProps as GridPropsSS } from "styled-system";
import { styled, Theme } from "./theme";
import { Box, BoxProps } from "./Box";

export type GridProps = BoxProps & GridPropsSS<Theme>;

// Don't declare 'display: grid;' if display is in props
export const Grid = styled(Box)<GridProps>`
  ${(p) => (p.display ? "" : "display: grid;")}
  ${grid}
`;
