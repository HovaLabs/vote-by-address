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

export type TableType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  rows: RowsType;
  columns: ColumnsType;
  title: string;
};
