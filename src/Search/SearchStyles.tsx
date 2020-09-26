import styled from "styled-components";

export const ContainerInput = styled.div`
  align-items: center;
  display: flex;
  padding-top: 32px;
`;

export const Input = styled.input(
  (p) => `
  ${p.theme.typography.paragraph0}
  background: ${p.theme.colors.surface};
  box-sizing: border-box;
  border: none;
  color: ${p.theme.colors.onSurface};
  width: 80%;
  max-width: 500px;
  padding: 18px;
  &:focus {
    outline: none;
  }
`
);

export const ContainerOuter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
`;

export const Form = styled("form")`
  position: absolute;
  margin: 0 64px 64px 64px;
  left: 0;
  bottom: 50%;
`;
