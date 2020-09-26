import styled from "styled-components";

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 64px;
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
