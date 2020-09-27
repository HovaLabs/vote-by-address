import { createGlobalStyle } from "./theme";

export const GlobalStyles = createGlobalStyle`
html, body {
    padding: 0;
    margin: 0;
    background: ${(p) => p.theme.colors.background};
}

html, body, #root {
    height: 100%;
}
h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
a { 
  cursor: pointer;
    color: ${(p) => p.theme.colors.primary};
}
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
} 

ul{
  margin-inline-start: 20px;
}
`;
