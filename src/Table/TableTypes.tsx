// Columns
export type ColumnType = {
  width: string;
  name: string;
};
export type ColumnsType = ColumnType[];
// A column that has data, and its position in each row
export type VisibleColumn = {
  column: ColumnType;
  index: number;
};

// Rows
export type RowType = string[];
export type RowsType = RowType[];

// Table

export type TableType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  rows: RowsType;
  columns: ColumnsType;
  // Left out when something else labels the table, like a tab
  title?: string;
};
