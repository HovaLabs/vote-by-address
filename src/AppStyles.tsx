import styled from "styled-components";

export const ContainerOuter = styled.div(
  (p) => `
    ${p.theme.typography.paragraph0}
    background:${p.theme.colors.background}
    box-sizing: border-box;
    border: none;
    color: ${p.theme.colors.onSurface};
    height: 100%;
  `
);
