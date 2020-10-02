import { Box, BoxProps, styled } from "../design-system";

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
  border-radius: 0;
  color: ${p.theme.colors.onSurface};
  width: 80%;
  max-width: 580px;
  padding: 14px;
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

export const Google = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: left;
  a {
    color: #fff;
    text-decoration: none;
  }
  img {
    padding-top: 12px;
  }
`;

export const Form = styled(Box).attrs({ as: "form" })<BoxProps>``;
