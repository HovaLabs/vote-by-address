import styled from "styled-components";

export const x = styled.p`
  cursor: pointer;
  margin: 0;
  transform: rotate(45deg);
  transition: 0.5s;
  &:hover {
    color: ${(p) => p.theme.colors.primary};
  }
`;
