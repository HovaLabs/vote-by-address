import React from "react";
import { GlobalStyles } from "./GlobalStyles";
import { theme, ThemeProvider } from "./theme";

export const DesignSystemProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
);
