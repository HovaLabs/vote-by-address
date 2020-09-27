import React from "react";
import { CookieWarning, Text } from "./design-system";

export const AnalyticsConsent: React.FC = () => {
  return (
    <CookieWarning cookieKey="hova-labs-analytics-consent">
      <Text typography="paragraph2">
        This website uses cookies for analytics and to improve user experience.
        By continuing to navigate this website you hereby acknowledge and agree
        to Hova Labs' use of cookies.
      </Text>
    </CookieWarning>
  );
};
