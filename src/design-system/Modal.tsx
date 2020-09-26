import React from "react";
import { useKey } from "react-use";

import { Box } from "./Box";
import { ClickOutside } from "./ClickOutside";
import { Portal } from "./Portal";

export const Modal: React.FC<{
  children: React.ReactElement;
  onClose?: () => void;
}> = ({ children, onClose }) => {
  useKey("Escape", onClose);

  return (
    <Portal>
      <Box
        position="fixed"
        top="0"
        bottom="0"
        left="0"
        right="0"
        bg="background"
      >
        {onClose ? (
          <ClickOutside onClickOutside={onClose}>
            <Box>{children}</Box>
          </ClickOutside>
        ) : (
          children
        )}
      </Box>
    </Portal>
  );
};
