import { styled } from "../design-system";

export const ContainerTable = styled.section`
  padding: 0 32px 48px 32px;
  width: 100%;
  word-break: break-word;
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    padding: 0 64px 64px 64px;
  }
`;

// Column names, shown once above the rows on desktop. Sticks to the top of the
// screen while its table scrolls by.
export const HeaderRow = styled.div<{ $columns: string }>`
  display: none;
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    position: sticky;
    top: 0;
    z-index: 1;
    display: grid;
    grid-template-columns: ${(p) => p.$columns};
    column-gap: 24px;
    /* The negative margin keeps the spacing above the table the same, while the
    padding gives the labels room at the top of the screen once stuck */
    margin-top: -16px;
    padding: 16px 16px 12px 16px;
    background: ${(p) => p.theme.colors.background};
    border-bottom: 1px solid ${(p) => p.theme.colors.divider};
  }
`;

export const ColumnLabel = styled.div`
  ${(p) => p.theme.typography.caption0}
  color: ${(p) => p.theme.colors.onBackgroundMuted};
`;

// A card on mobile, and a row between dividers on desktop
export const Row = styled.div<{ $columns: string }>`
  display: grid;
  row-gap: 16px;
  margin-bottom: 12px;
  padding: 20px;
  background: ${(p) => p.theme.colors.surfaceSubtle};
  border: 1px solid ${(p) => p.theme.colors.divider};
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    grid-template-columns: ${(p) => p.$columns};
    column-gap: 24px;
    margin-bottom: 0;
    padding: 20px 16px;
    background: none;
    border: none;
    border-bottom: 1px solid ${(p) => p.theme.colors.divider};
    &:hover {
      background: ${(p) => p.theme.colors.surfaceSubtle};
    }
  }
`;

export const Cell = styled.div`
  ${(p) => p.theme.typography.body0}
  min-width: 0;
  color: ${(p) => p.theme.colors.onBackground};
`;

// Mobile has no header row, so each value gets its column name
export const CellLabel = styled.div`
  ${(p) => p.theme.typography.caption0}
  margin-bottom: 4px;
  color: ${(p) => p.theme.colors.onBackgroundMuted};
  @media only screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const Empty = styled.span`
  color: ${(p) => p.theme.colors.onBackgroundMuted};
`;

export const Link = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const LocationName = styled.span`
  ${(p) => p.theme.typography.bodyBold0}
  display: block;
  color: ${(p) => p.theme.colors.primary};
`;

export const AddressLine = styled.span`
  display: block;
  color: ${(p) => p.theme.colors.onBackgroundSecondary};
`;

export const AddressLink = styled.a`
  display: block;
  &:hover ${LocationName} {
    text-decoration: underline;
  }
`;

export const HoursList = styled.div`
  display: grid;
  row-gap: 4px;
`;

export const HoursPast = styled.div`
  color: ${(p) => p.theme.colors.onBackgroundMuted};
`;

export const HoursToday = styled.div`
  justify-self: start;
  padding: 0 6px;
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.onPrimary};
`;
