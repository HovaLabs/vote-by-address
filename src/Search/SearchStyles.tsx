import { Box, BoxProps, styled } from "../design-system";

export const ContainerInput = styled.div`
  align-items: center;
  display: flex;
  padding-top: 32px;
`;

export const ContainerAutocomplete = styled.div`
  position: relative;
  width: 80%;
  max-width: 580px;
`;

export const Input = styled.input(
  (p) => `
  ${p.theme.typography.paragraph0}
  background: ${p.theme.colors.surface};
  box-sizing: border-box;
  border: none;
  border-radius: 0;
  color: ${p.theme.colors.onSurface};
  display: block;
  width: 100%;
  padding: 14px;
  &:focus {
    outline: none;
  }
`
);

export const Suggestions = styled.div(
  (p) => `
  background: ${p.theme.colors.surface};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
  left: 0;
  position: absolute;
  right: 0;
  top: 100%;
  z-index: ${p.theme.zIndices.bodyLift};
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`
);

export const Suggestion = styled.li(
  (p) => `
  ${p.theme.typography.paragraph2}
  color: ${p.theme.colors.onSurface};
  cursor: pointer;
  line-height: 22px;
  padding: 12px 14px;
  &[aria-selected="true"] {
    background: ${p.theme.colors.background};
    color: ${p.theme.colors.primary};
  }
`
);

// Google requires attributing Places suggestions shown without a map
export const Attribution = styled.div`
  color: #999;
  font-family: roboto;
  font-size: 12px;
  padding: 4px 14px 8px;
  text-align: right;
`;

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
