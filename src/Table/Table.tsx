import React from "react";
import * as S from "./TableStyles";
import { Text, Grid } from "../packages/design-system";
import TableRow from "./TableRow";
import { TableType } from "./TableTypes";

const Table: React.FC<TableType> = ({ rows, columns, title }) => {
  const columnsPrintout = columns.map((column) => {
    const { name, width } = column;
    return (
      <Text as="h5" padding="20px" typography="paragraphBold1">
        {name}
      </Text>
    );
  });

  const rowsPrintout = rows.map((row) => {
    return <TableRow row={row} columns={columns} />;
  });

  return (
    <S.ContainerTable>
      <Text as="h5" padding="20px" typography="heading5">
        {title}
      </Text>
      <Grid
        display={{ mobile: "none", desktop: "grid" }}
        gridTemplateColumns={columns.map((column) => column.width).join(" ")}
        gridRowGap={{ mobile: 0, desktop: 20 }}
      >
        {columnsPrintout}
      </Grid>
      <Grid
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
