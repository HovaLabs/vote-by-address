import styled from "styled-components";

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 32px;
  @media only screen and (max-width: ${(p) => p.theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

export const Links = styled.div`
  align-self: flex-end;
  & > a {
    ${(p) => p.theme.typography.paragraph2}
    padding-left: 32px;
  }
  @media only screen and (max-width: ${(p) => p.theme.breakpoints.desktop}) {
    align-self: flex-start;
    & > a {
      padding-left: 0px;
      padding-right: 32px;
    }
  }
`;

export const Logo = styled.a`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    padding-right: 12px;
  }
`;
