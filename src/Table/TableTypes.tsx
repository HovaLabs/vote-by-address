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
  data: any;
  rows: RowsType;
  columns: ColumnsType;
  title: string;
};
