import React from "react";
import * as S from "./TableStyles";
import { Text, Grid } from "../design-system";
import TableRow from "./TableRow";
import { TableType } from "./TableTypes";

const Table: React.FC<TableType> = ({ data, rows, columns, title }) => {
  const columnsPrintout = columns.map((column, index) => {
    const { name } = column;
    return (
      <Text
        key={`${name}-${index}`}
        as="h5"
        padding="20px 20px 20px 0"
        typography="paragraphBold1"
      >
        {name}
      </Text>
    );
  });

  const rowsPrintout = rows.map((row, index) => {
    return (
      <TableRow
        key={`${row[index]}-${columns[index]}`}
        data={data}
        row={row}
        columns={columns}
      />
    );
  });

  return (
    <S.ContainerTable>
      <Text as="h5" padding={"20px 20px 20px 0"} typography="heading5">
        {title}
      </Text>
      <Grid
        key={`${columns[0].name}-columns`}
        display={{ mobile: "none", desktop: "grid" }}
        gridTemplateColumns={columns.map((column) => column.width).join(" ")}
        gridRowGap={{ mobile: 0, desktop: 20 }}
      >
        {columnsPrintout}
      </Grid>
      <Grid
        key={`${columns[0].name}-rows`}
        gridTemplateColumns={{
          mobile: "1fr",
          desktop: columns.map((column) => column.width).join(" "),
        }}
        gridRowGap={{ mobile: 0, desktop: "20px" }}
      >
        {rowsPrintout}
      </Grid>
    </S.ContainerTable>
  );
};

export default Table;
