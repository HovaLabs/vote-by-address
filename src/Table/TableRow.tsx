import React from "react";
import * as S from "./TableStyles";
import { Box, Text } from "../design-system";
import { Link } from "react-router-dom";

import { ColumnsType, RowType } from "./TableTypes";
import { isValidURL } from "./TableUtils";

const TableRow: React.FC<{ row: RowType; columns: ColumnsType }> = ({
  row,
  columns,
}) => {
  const items = row.map((item, index) => {
    const title = (
      <Text
        as="p"
        display={{ mobile: "block", desktop: "none" }}
        typography="paragraph0"
        padding="20px"
      >
        {columns[index].name}
      </Text>
    );

    // If there is no data available for an item
    if (item === undefined || item === "") {
      return (
        <Box backgroundColor="surface">
          {title}
          <S.EmptyValue>
            <S.Line />
          </S.EmptyValue>
        </Box>
      );
    } else {
      return isValidURL(item) ? (
        <Box backgroundColor="surface" padding="20px">
          {title}
          <Link to={item}>
            <Text as="p" typography="paragraph0" wordBreak="break-word">
              {item}
            </Text>
          </Link>
        </Box>
      ) : (
        <Box backgroundColor="surface" padding="20px">
          {title}
          <Text as="p" typography="paragraph0" wordBreak="break-word">
            {item}
          </Text>
        </Box>
      );
    }
  });
  return <>{items}</>;
};

export default TableRow;
