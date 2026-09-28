import { styled } from "../design-system";

export const ContainerTabs = styled.div`
  width: 100%;
  padding: 0 32px 24px 32px;
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    padding: 0 64px 32px 64px;
  }
`;

// Full width with equal segments on mobile, sized to fit its labels on wider screens
export const TabList = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  border: 1px solid ${(p) => p.theme.colors.divider};
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.tablet}) {
    display: inline-grid;
    grid-auto-columns: auto;
  }
`;

export const Tab = styled.button<{ $selected: boolean }>`
  ${(p) => p.theme.typography.bodyBold0}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 8px;
  padding: 12px 8px;
  border: none;
  border-left: 1px solid ${(p) => p.theme.colors.divider};
  background: ${(p) => (p.$selected ? p.theme.colors.primary : "none")};
  color: ${(p) =>
    p.$selected ? p.theme.colors.onPrimary : p.theme.colors.onBackground};
  text-align: center;
  cursor: pointer;
  transition: background 0.2s;
  &:first-child {
    border-left: none;
  }
  &:hover {
    background: ${(p) =>
      p.$selected ? p.theme.colors.primary : p.theme.colors.surfaceSubtle};
  }
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.colors.primary};
    outline-offset: 2px;
  }
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.tablet}) {
    padding: 12px 24px;
  }
`;

export const TabCount = styled.span<{ $selected: boolean }>`
  ${(p) => p.theme.typography.caption0}
  color: ${(p) =>
    p.$selected ? p.theme.colors.onPrimary : p.theme.colors.onBackgroundMuted};
`;

export const TabPanel = styled.div`
  width: 100%;
`;

export const TabDescription = styled.p`
  ${(p) => p.theme.typography.body0}
  max-width: 640px;
  padding: 0 32px 20px 32px;
  color: ${(p) => p.theme.colors.onBackgroundSecondary};
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    max-width: 768px;
    padding: 0 64px 24px 64px;
  }
`;
