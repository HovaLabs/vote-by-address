import React from "react";
import * as S from "./TableStyles";
import { Spacer, Text } from "../design-system";
import TableRow from "./TableRow";
import { TableType, VisibleColumn } from "./TableTypes";

const Table: React.FC<TableType> = ({ data, rows, columns, title }) => {
  // Hide columns Google has no data for in any row, rather than a column of N/As
  const visibleColumns: VisibleColumn[] = columns
    .map((column, index) => ({ column, index }))
    .filter(({ index }) =>
      rows.some((row) => row[index] !== undefined && row[index] !== "")
    );
  if (visibleColumns.length === 0) {
    return null;
  }
  const gridColumns = visibleColumns
    .map(({ column }) => `minmax(0, ${column.width})`)
    .join(" ");

  return (
    <S.ContainerTable>
      {title && (
        <>
          <Text
            as="h2"
            typography={{ mobile: "heading6", desktop: "heading5" }}
          >
            {title}
          </Text>
          <Spacer height="24px" />
        </>
      )}
      <S.HeaderRow $columns={gridColumns}>
        {visibleColumns.map(({ column }) => (
          <S.ColumnLabel key={column.name}>{column.name}</S.ColumnLabel>
        ))}
      </S.HeaderRow>
      {rows.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          data={data[rowIndex]}
          row={row}
          columns={visibleColumns}
          gridColumns={gridColumns}
        />
      ))}
    </S.ContainerTable>
  );
};

export default Table;
