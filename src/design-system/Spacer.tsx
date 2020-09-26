import { width, height, flex, ResponsiveValue } from "styled-system";
import { Theme } from "./theme";
import { styled } from "./theme";

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

interface SpacerProps {
  width: ResponsiveValue<string | number, Theme>;
  height: ResponsiveValue<string | number, Theme>;
  flex: ResponsiveValue<string | number, Theme>;
}

export const Spacer = styled("div")<RequireAtLeastOne<SpacerProps>>`
  min-width: 0;
  min-height: 0;
  ${width}
  ${height}
  ${flex}
`;
