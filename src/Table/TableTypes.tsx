// Columns
export type ColumnType = {
  width: string;
  name: string;
};
export type ColumnsType = ColumnType[];

// Rows
export type RowType = string[];
export type RowsType = RowType[];

// Table

export type TableType = { rows: RowsType; columns: ColumnsType; title: string };
