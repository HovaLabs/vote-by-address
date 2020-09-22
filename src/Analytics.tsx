import React from "react";
import ReactGA from "react-ga";

type TAnalyticsContext = {
  analytics: typeof ReactGA | null;
  initialize: () => void;
} | null;
export const AnalyticsContext = React.createContext<TAnalyticsContext>(null);

const TRACKING_CODE = "UA-000000-01";
export const AnalyticsProvider: React.FC = ({ children }) => {
  const [analytics, setAnalytics] = React.useState<typeof ReactGA | null>(null);

  const initialize = React.useCallback(() => {
    ReactGA.initialize(TRACKING_CODE);
    setAnalytics(ReactGA);
  }, []);

  return (
    <AnalyticsContext.Provider value={{ analytics, initialize }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): TAnalyticsContext =>
  React.useContext(AnalyticsContext);
