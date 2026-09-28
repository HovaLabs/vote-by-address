import { styled } from "./theme";

// left/right match the page gutters so the banner spans the content container
export const Banner = styled.div`
  position: fixed;
  left: 32px;
  right: 32px;
  bottom: calc(32px + env(safe-area-inset-bottom, 0px));
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 24px;
  border-radius: 16px;
  background: ${(p) => p.theme.colors.onBackground};
  color: ${(p) => p.theme.colors.background};
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);

  @media screen and (min-width: ${(p) => p.theme.breakpoints.tablet}) {
    padding: 16px 16px 16px 32px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    left: 64px;
    right: 64px;
  }
`;

export const Content = styled.div`
  flex: 1;
  margin-right: 16px;
`;

export const CloseButton = styled.button`
  position: relative;
  flex: 0 0 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.background};
  cursor: pointer;
  transition: background 0.3s;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 2px;
    background: ${(p) => p.theme.colors.onBackground};
    transition: background 0.3s;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &:hover {
    background: ${(p) => p.theme.colors.primary};
  }
  &:hover::before,
  &:hover::after {
    background: ${(p) => p.theme.colors.onPrimary};
  }
`;
