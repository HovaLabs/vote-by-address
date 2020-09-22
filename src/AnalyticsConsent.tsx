import React from "react";
import { CookieWarning } from "./design-system";
import { useAnalytics } from "./Analytics";

export const AnalyticsConsent: React.FC = () => {
  const { initialize } = useAnalytics();
  return (
    <CookieWarning
      cookieKey="hova-labs-analytics-consent"
      handleBannerAcknowledged={initialize}
    >
      This website uses cookies for analytics and to improve user experience. By
      continuing to navigate our website without changing your cookie settings,
      you hereby acknowledge and agree to Hova Labs' use of cookies.
    </CookieWarning>
  );
};
