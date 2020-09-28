import styled from "styled-components";

export const ContainerTable = styled.div`
  padding: 0px 32px 32px 32px;
  width: 100%;
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    padding: 0 64px 64px 64px;
  }
`;

export const ContainerOuter = styled.div`
  padding: 64px;
`;

export const ContainerTitles = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const EmptyValue = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const DatePast = styled.span`
  text-decoration: line-through;
`;

export const DateToday = styled.span`
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.background};
`;

export const Line = styled.div`
  display: flex;
  background: #fff;
  height: 6px;
  width: 100%;
  margin-top: 32px;
`;

export const Value = styled.p``;
