import React from "react";
import * as S from "./TableStyles";
import { Box, Spacer, Text } from "../design-system";

import { ColumnsType, RowType } from "./TableTypes";
import { getDateInfo, getIsLink } from "./TableUtils";
import { url } from "inspector";

const TableRow: React.FC<{ data: any; row: RowType; columns: ColumnsType }> = ({
  data,
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
      if (["SOURCES"].includes(columns[index].name)) {
        let url = null;
        switch (item) {
          case "Voting Information Project":
            url = "https://www.votinginfoproject.org/";
            break;
          default:
            break;
        }
        return url ? (
          <Box backgroundColor="surface" padding="20px">
            <a href={url} rel="noopener noreferrer">
              {item}
            </a>
          </Box>
        ) : (
          item
        );
      }
      if (["ADDRESS"].includes(columns[index].name)) {
        const { latitude, longitude } = data[index];
        const { line1, line2, locationName, state, zip } = data[index].address;
        return (
          <Box backgroundColor="surface" padding="20px">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            >
              {locationName && (
                <div>
                  <strong>{locationName}</strong>
                </div>
              )}
              {line1 && <div>{line1}</div>}
              {line2 && <div>{line2}</div>}
              {[state, zip].join(" ")}
            </a>
          </Box>
        );
      }
      if (["POLLING HOURS"].includes(columns[index].name)) {
        const stringArray = item.split(/\r?\n/);
        const printOut = stringArray.map((day) => {
          const { isInFuture, isToday, isInPast } = getDateInfo(day);
          const dayPrintout = () => {
            if (isInPast) {
              return (
                <S.DatePast>
                  {day}
                  <Spacer height={12} />
                </S.DatePast>
              );
            }
            if (isToday) {
              return (
                <S.DateToday>
                  {day}
                  <Spacer height={12} />
                </S.DateToday>
              );
            }
            if (isInFuture) {
              return (
                <>
                  {day}
                  <Spacer height={12} />
                </>
              );
            }
          };
          return dayPrintout();
        });
        return (
          <Box backgroundColor="surface" padding="20px">
            {title}
            {printOut}
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
