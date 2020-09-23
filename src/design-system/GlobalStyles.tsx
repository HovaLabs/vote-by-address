import { createGlobalStyle } from "./theme";

export const GlobalStyles = createGlobalStyle`
html, body {
    padding: 0;
    margin: 0;
    background: ${(p) => p.theme.colors.background};
}
h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
}
body {
    color: ${(p) => p.theme.colors.onBackground};
}

* {
    box-sizing: border-box;
  }
`;
