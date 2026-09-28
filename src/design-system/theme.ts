import * as baseStyled from "styled-components";

export const {
  css,
  createGlobalStyle,
  keyframes,
  default: styled,
  ThemeProvider,
  ThemeContext,
} = (baseStyled as unknown) as baseStyled.ThemedStyledComponentsModule<Theme>;

const hues = {
  shade1100: "#ffffff",
  shade1000: "#f2f2f2",
  shade0900: "#e6e6e6",
  shade0800: "#cccccc",
  shade0700: "#b3b3b3",
  shade0600: "#999999",
  shade0500: "#808080",
  shade0400: "#666666",
  shade0300: "#4d4d4d",
  shade0200: "#333333",
  shade0100: "#1a1a1a",
  shade0000: "#000000",

  blue1100: "#d1d8ff",
  blue1000: "#c3caef",
  blue0900: "#b6bcde",
  blue0800: "#979cb8",
  blue0700: "#787c92",
  blue0600: "#5b5e6f",
  blue0500: "#434552",
  blue0400: "#30323b",
  blue0300: "#23242b",
  blue0200: "#1c1c22",
  blue0100: "#191a1f",

  yellow1100: "#fff1b9",
  yellow1000: "#fceeb7",
  yellow0900: "#f8ebb5",
  yellow0800: "#e9dca9",
  yellow0700: "#cfc496",
  yellow0600: "#aca37d",
  yellow0500: "#857e61",
  yellow0400: "#615c47",
  yellow0300: "#474334",
  yellow0200: "#373428",
  yellow0100: "#302e23",
};

const colors = {
  primary: hues.yellow0700,
  onPrimary: hues.shade0000,
  background: hues.blue0200,
  onBackground: hues.shade1100,
  // Supporting text, like address lines
  onBackgroundSecondary: hues.blue1000,
  // Labels and missing values
  onBackgroundMuted: hues.blue0800,
  surface: hues.blue0400,
  // Rows and cards that sit just above the background
  surfaceSubtle: hues.blue0300,
  onSurface: hues.shade1100,
  divider: hues.blue0400,
  error: hues.yellow1000,
};

const typography = {
  heading0: css`
    font-family: roboto;
    font-size: 50px;
    font-weight: 400;
    line-height: 70px;
    letter-spacing: 2px;
  `,
  heading1: css`
    font-family: roboto;
    font-size: 46px;
    font-weight: 400;
    line-height: 54px;
    letter-spacing: 1.84px;
  `,
  heading2: css`
    font-family: roboto;
    font-size: 42px;
    font-weight: 400;
    line-height: 50px;
    letter-spacing: 1.68px;
  `,
  heading3: css`
    font-family: roboto;
    font-size: 38px;
    font-weight: 400;
    line-height: 44px;
    letter-spacing: 1.52px;
    margin-bottom: 20px;
  `,
  heading4: css`
    font-family: roboto;
    font-size: 34px;
    font-weight: 400;
    line-height: 50px;
    letter-spacing: 1.36px;
  `,
  heading5: css`
    font-family: roboto;
    font-size: 30px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 1.2px;
  `,
  heading6: css`
    font-family: roboto;
    font-size: 26px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 1.04px;
  `,
  headingBold0: css`
    font-family: roboto;
    font-size: 50px;
    font-weight: 700;
    line-height: 70px;
    letter-spacing: 2px;
  `,
  headingBold1: css`
    font-family: roboto;
    font-size: 46px;
    font-weight: 700;
    line-height: 54px;
    letter-spacing: 1.84px;
  `,
  headingBold2: css`
    font-family: roboto;
    font-size: 42px;
    font-weight: 700;
    line-height: 50px;
    letter-spacing: 1.68px;
  `,
  headingBold3: css`
    font-family: roboto;
    font-size: 38px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 1.52px;
  `,
  headingBold4: css`
    font-family: roboto;
    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 1.36px;
  `,
  headingBold5: css`
    font-family: roboto;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 1.2px;
  `,
  headingBold6: css`
    font-family: roboto;
    font-size: 26px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 1.04px;
  `,
  paragraph0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 34px;
    letter-spacing: 2.2px;
  `,
  paragraph1: css`
    font-family: roboto;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 1.98px;
  `,
  paragraph2: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 1.76px;
  `,
  paragraphBold0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 2.2px;
  `,
  paragraphBold1: css`
    font-family: roboto;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 1.98px;
  `,
  paragraphBold2: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 1.76px;
  `,
  // Tighter tracking for dense text like tables
  body0: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.4px;
  `,
  bodyBold0: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.4px;
  `,
  // Small all-caps labels, like table column names
  caption0: css`
    font-family: roboto;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 1.6px;
  `,
  label0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0;
  `,
  label1: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0;
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
