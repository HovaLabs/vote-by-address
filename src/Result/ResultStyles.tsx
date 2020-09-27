import styled from "styled-components";

export const BackLink = styled.button`
  display: flex;
  align-items: center;
  padding: 38px;
  text-decoration: none;
  justify-content: flex-start;
  background: none;
  border: none;
  transition: 0.5s;
  cursor: pointer;
  color: ${(p) => p.theme.colors.onBackground};
  &:hover {
    color: ${(p) => p.theme.colors.primary};
  }
  img {
    transform: rotate(180deg);
    padding-left: 12px;
  }
`;

export const ContainerLocation = styled.div`
  padding: 38px;
`;
