import { ResponsiveValue } from "styled-system";
import { BreakpointObject, css, styled, Theme } from "./theme";

export const Text = styled("div")<{
  typography: ResponsiveValue<keyof Theme["typography"]>;
}>((p) => {
  if (typeof p.typography === "string") {
    return p.theme.typography[p.typography];
  }
  return Object.keys(p.theme.breakpoints).map((breakpointKey) => {
    // eslint-disable-next-line
    // @ts-ignore
    if (p.typography[breakpointKey] == null) {
      return;
    }
    // eslint-disable-next-line
    // @ts-ignore
    const typography = p.theme.typography[p.typography[breakpointKey]];
    return css`
      @media screen and (min-width: ${p.theme.breakpoints[
          breakpointKey as keyof BreakpointObject
        ]}) {
        ${typography}
      }
    `;
  });
});
