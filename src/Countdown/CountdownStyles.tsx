import { styled } from "../design-system";

export const ContainerOuter = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Units = styled.div(
  (p) => `
  display: grid;
  gap: 32px 48px;
  grid-template-columns: repeat(2, max-content);
  @media screen and (min-width: ${p.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, max-content);
  }
`
);

export const Value = styled.span(
  (p) => `
  ${p.theme.typography.headingBold0}
  color: ${p.theme.colors.primary};
  display: block;
  font-size: 80px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
  line-height: 1;
  @media screen and (min-width: ${p.theme.breakpoints.tablet}) {
    font-size: 104px;
  }
  @media screen and (min-width: ${p.theme.breakpoints.desktop}) {
    font-size: 144px;
  }
`
);
