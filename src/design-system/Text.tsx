import { ResponsiveValue, system, TypographyProps } from "styled-system";
import { BoxProps, Box } from "./Box";
import { BreakpointObject, css, styled, Theme } from "./theme";

const customTypographyStyles = system({
  wordBreak: true,
});

type WordBreakOptions =
  | "normal"
  | "break-all"
  | "break-word"
  | "keep-all"
  | "inherit"
  | "initial"
  | "unset";

type WordBreakProps = {
  wordBreak?: ResponsiveValue<WordBreakOptions>;
};

export const Text = styled(Box)<
  {
    typography: ResponsiveValue<keyof Theme["typography"]>;
  } & TypographyProps &
    WordBreakProps &
    BoxProps
>((p) => {
  if (typeof p.typography === "string") {
    return css`
      ${p.theme.typography[p.typography]}
      ${customTypographyStyles}
    `;
  }
  return Object.keys(p.theme.breakpoints).map((breakpointKey) => {
    // eslint-disable-next-line
    // @ts-ignore
    if (p.typography[breakpointKey] == null) {
      return "";
    }
    // eslint-disable-next-line
    // @ts-ignore
    const typography = p.theme.typography[p.typography[breakpointKey]];
    return css`
      @media screen and (min-width: ${p.theme.breakpoints[
          breakpointKey as keyof BreakpointObject
        ]}) {
        ${typography}
        ${customTypographyStyles}
      }
    `;
  });
});
