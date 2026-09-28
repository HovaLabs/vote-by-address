import React from "react";
import * as S from "./TableStyles";
import { RowType, VisibleColumn } from "./TableTypes";
import { getDateInfo, getIsLink, urlify } from "./TableUtils";

const SOURCE_URLS: Record<string, string> = {
  "Voting Information Project": "https://www.votinginfoproject.org/",
  DemocracyWorks: "https://www.democracy.works/",
};

const CellValue: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  name: string;
  value: string | undefined;
}> = ({ data, name, value }) => {
  // If there is no data available for an item
  if (value === undefined || value === "") {
    return <S.Empty>N/A</S.Empty>;
  }
  if (getIsLink(value)) {
    // The site's domain reads better than the full URL
    return (
      <S.Link href={value} target="_blank" rel="noopener noreferrer">
        {new URL(value).hostname.replace(/^www\./, "")} ↗
      </S.Link>
    );
  }
  if (name === "SOURCES") {
    const url = SOURCE_URLS[value];
    return url ? (
      <S.Link href={url} target="_blank" rel="noopener noreferrer">
        {value}
      </S.Link>
    ) : (
      <>{value}</>
    );
  }
  if (name === "NOTES") {
    return <div dangerouslySetInnerHTML={{ __html: urlify(value) }} />;
  }
  if (name === "ADDRESS") {
    const { latitude, longitude } = data;
    const { city, line1, line2, locationName, state, zip } = data.address;
    const cityLine = [city, [state, zip].filter(Boolean).join(" ")]
      .filter(Boolean)
      .join(", ");
    return (
      <S.AddressLink
        rel="noopener noreferrer"
        target="_blank"
        href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
      >
        <S.LocationName>{locationName || line1}</S.LocationName>
        {locationName && line1 && <S.AddressLine>{line1}</S.AddressLine>}
        {line2 && <S.AddressLine>{line2}</S.AddressLine>}
        <S.AddressLine>{cityLine}</S.AddressLine>
      </S.AddressLink>
    );
  }
  if (name === "POLLING HOURS") {
    return (
      <S.HoursList>
        {value.split(/\r?[\n;]/).map((day, index) => {
          const { isToday, isInPast } = getDateInfo(day);
          if (isToday) {
            return <S.HoursToday key={index}>{day}</S.HoursToday>;
          }
          if (isInPast) {
            return <S.HoursPast key={index}>{day}</S.HoursPast>;
          }
          return <div key={index}>{day}</div>;
        })}
      </S.HoursList>
    );
  }
  return <>{value}</>;
};

const TableRow: React.FC<{
  // Google's record for this row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  row: RowType;
  columns: VisibleColumn[];
  gridColumns: string;
}> = ({ data, row, columns, gridColumns }) => (
  <S.Row $columns={gridColumns}>
    {columns.map(({ column, index }) => (
      <S.Cell key={column.name}>
        <S.CellLabel>{column.name}</S.CellLabel>
        <CellValue data={data} name={column.name} value={row[index]} />
      </S.Cell>
    ))}
  </S.Row>
);

export default TableRow;
