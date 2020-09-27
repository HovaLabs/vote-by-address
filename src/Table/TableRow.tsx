import React from "react";
import * as S from "./TableStyles";
import { Box, Spacer, Text } from "../design-system";

import { ColumnsType, RowType } from "./TableTypes";
import { getIsLink } from "./TableUtils";

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
      >
        {columns[index].name}
      </Text>
    );

    // If there is no data available for an item
    if (item === undefined || item === "") {
      return (
        <Box backgroundColor="surface" padding="20px">
          {title}
          <S.EmptyValue>
            <S.Line />
            <Spacer width={20} />
          </S.EmptyValue>
        </Box>
      );
    } else {
      const isLink = getIsLink(item);
      if (isLink) {
        return (
          <Box backgroundColor="surface" padding="20px">
            {title}
            <a href={item} target="_blank" rel="noopener noreferrer">
              <Text as="p" typography="paragraph0" wordBreak="break-word">
                {item}
              </Text>
            </a>
          </Box>
        );
      }

      return (
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
