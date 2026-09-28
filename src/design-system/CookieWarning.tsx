import React from "react";
import { useLocalStorage } from "react-use";
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
      if (handleBannerAcknowledged) {
        handleBannerAcknowledged();
      };
      setHandlerCalled(true);
    }
  }, [bannerAcknowledged, handleBannerAcknowledged, handlerCalled]);

  if (bannerAcknowledged) {
    return null;
  }

  return (
    <Portal>
      <S.Banner role="region" aria-label="Cookie notice">
        <S.Content>{children}</S.Content>
        <S.CloseButton
          type="button"
          aria-label="Dismiss cookie notice"
          onClick={() => setBannerAcknowledged(true)}
        />
      </S.Banner>
    </Portal>
  );
};
