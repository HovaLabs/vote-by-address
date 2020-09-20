import * as baseStyled from "styled-components";

export const {
  css,
  createGlobalStyle,
  keyframes,
  default: styled,
  ThemeProvider,
  ThemeContext,
} = baseStyled as baseStyled.ThemedStyledComponentsModule<Theme>;

const hues = {
  blue1100: "#2146ff",
  blue1000: "#2146fd",
  blue0900: "#2145fb",
  blue0800: "#2044f4",
  blue0700: "#2041e9",
  blue0600: "#1f3ed9",
  blue0500: "#1d39c5",
  blue0400: "#1b33aa",
  blue0300: "#192b87",
  blue0200: "#17235e",
  blue0100: "#101530",

  yellow1100: "#ffd736",
  yellow1000: "#fdd843",
  yellow0900: "#fbd951",
  yellow0800: "#f4d65f",
  yellow0700: "#e9ce64",
  yellow0600: "#d9c264",
  yellow0500: "#c5b05d",
  yellow0400: "#aa9853",
  yellow0300: "#877a43",
  yellow0200: "#5e552f",
  yellow0100: "#302b18",
  black: "#000000",
  white: "#ffffff",
};

const colors = {
  primary: hues.yellow0500,
  onPrimary: hues.blue0100,
  background: hues.blue0100,
  onBackground: hues.white,
  surface: hues.blue0300,
  onSurface: hues.white,
};

const typography = {
  heading0: css`
    font-family: roboto;
    font-size: 50px;
    font-weight: 400;
    line-height: 60px;
    letter-spacing: 2px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  heading1: css`
    font-family: roboto;
    font-size: 46px;
    font-weight: 400;
    line-height: 54px;
    letter-spacing: 1.84px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  heading2: css`
    font-family: roboto;
    font-size: 42px;
    font-weight: 400;
    line-height: 50px;
    letter-spacing: 1.68px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  heading3: css`
    font-family: roboto;
    font-size: 38px;
    font-weight: 400;
    line-height: 44px;
    letter-spacing: 1.52px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  heading4: css`
    font-family: roboto;
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 1.36px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  heading5: css`
    font-family: roboto;
    font-size: 30px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 1.2px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  heading6: css`
    font-family: roboto;
    font-size: 26px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 1.04px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  headingBold0: css`
    font-family: roboto;
    font-size: 50px;
    font-weight: 700;
    line-height: 60px;
    letter-spacing: 2px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  headingBold1: css`
    font-family: roboto;
    font-size: 46px;
    font-weight: 700;
    line-height: 54px;
    letter-spacing: 1.84px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  headingBold2: css`
    font-family: roboto;
    font-size: 42px;
    font-weight: 700;
    line-height: 50px;
    letter-spacing: 1.68px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  headingBold3: css`
    font-family: roboto;
    font-size: 38px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 1.52px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  headingBold4: css`
    font-family: roboto;
    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 1.36px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  headingBold5: css`
    font-family: roboto;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 1.2px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  headingBold6: css`
    font-family: roboto;
    font-size: 26px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 1.04px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  paragraph0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 2.2px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  paragraph1: css`
    font-family: roboto;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 1.98px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  paragraph2: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 1.76px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  paragraphBold0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: 2.2px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  paragraphBold1: css`
    font-family: roboto;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 1.98px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  paragraphBold2: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 1.76px;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  label0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0;
    color: ${(p) => p.theme.colors.onBackground};
  `,
  label1: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0;
    color: ${(p) => p.theme.colors.onBackground};
  `,
};

export type BreakpointObject = Record<
  "mobile" | "tablet" | "desktop",
  string | number
>;

export const breakpoints: BreakpointObject = {
  mobile: "0px",
  tablet: "768px",
  desktop: "1024px",
};

// using blank object for space to prevent using default styled-system space value
const space = {};

const zIndices = {
  body: 0,
  bodyLift: 1000,
  modal: 2000,
  modalLift: 3000,
};

export const theme = {
  breakpoints,
  colors,
  space,
  typography,
  zIndices,
};

// have to manually declare each key/val of theme type to prevent circular
// dependency in themed styled-components declaration
export type Theme = {
  breakpoints: typeof breakpoints;
  colors: typeof colors;
  space: typeof space;
  typography: typeof typography;
  zIndices: typeof zIndices;
};
