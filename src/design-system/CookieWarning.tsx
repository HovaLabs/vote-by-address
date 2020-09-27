import React from "react";
import { useLocalStorage } from "react-use";
import { Text } from "../design-system";
import { Box } from "./Box";
import { Portal } from "./Portal";
import * as S from "./CookieWarningStyles";

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
        padding="32px"
      >
        {children}
        <Box
          flex="0 0 20px"
          alignSelf="flex-start"
          onClick={() => setBannerAcknowledged(true)}
        >
          <Text
            cursor="pointer"
            typography="heading1"
            position="absolute"
            top="18px"
          >
            <S.x>+</S.x>
          </Text>
        </Box>
      </Box>
    </Portal>
  );
};
