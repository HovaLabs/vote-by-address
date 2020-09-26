import React from "react";
import { useLocalStorage } from "react-use";

import { Box } from "./Box";
import { Portal } from "./Portal";

export const CookieWarning: React.FC<{
  cookieKey: string;
  handleBannerAcknowledged?: () => void;
}> = ({ children, cookieKey, handleBannerAcknowledged }) => {
  const [bannerAcknowledged, setBannerAcknowledged] = useLocalStorage<boolean>(
    cookieKey,
    false
  );
  const [handlerCalled, setHandlerCalled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (bannerAcknowledged && !handlerCalled) {
      handleBannerAcknowledged?.();
      setHandlerCalled(true);
    }
  }, [bannerAcknowledged, handleBannerAcknowledged, handlerCalled]);

  if (bannerAcknowledged) {
    return null;
  }

  return (
    <Portal>
      <Box
        position="fixed"
        display="flex"
        top="0"
        left="0"
        right="0"
        bg="surface"
        padding="16px"
      >
        {children}
        <Box
          flex="0 0 20px"
          alignSelf="flex-start"
          onClick={() => setBannerAcknowledged(true)}
        >
          X
        </Box>
      </Box>
    </Portal>
  );
};
