import styled from "styled-components";
import {
  compose,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  position,
  PositionProps,
} from "styled-system";
import { Theme } from "./theme";

export type BoxProps = SpaceProps<Theme, number | string> &
  LayoutProps<Theme> &
  ColorProps<Theme> &
  FlexboxProps<Theme> &
  PositionProps<Theme>;

export const Box = styled("div")<BoxProps>`
  ${compose(space, layout, color, flexbox, position)}
`;
