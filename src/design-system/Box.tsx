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

type CursorOption = "pointer" | "crosshair";
type CursorProps = {
  cursor?: CursorOption;
};

export type BoxProps = SpaceProps<Theme, number | string> &
  LayoutProps<Theme> &
  ColorProps<Theme> &
  FlexboxProps<Theme> &
  PositionProps<Theme> &
  CursorProps;

export const Box = styled("div")<BoxProps>`
  ${compose(space, layout, color, flexbox, position)}
`;
