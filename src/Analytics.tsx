import React from "react";
import ReactGA from "react-ga";

type TAnalyticsContext = {
  analytics: typeof ReactGA | null;
  initialize: () => void;
};

export const AnalyticsContext = React.createContext<TAnalyticsContext>({
  analytics: null,
  initialize: () => null,
});

const TRACKING_ID = "UA-178617624-1";

export const AnalyticsProvider: React.FC = ({ children }) => {
  const [analytics, setAnalytics] = React.useState<typeof ReactGA | null>(null);

  const initialize = React.useCallback(() => {
    ReactGA.initialize(TRACKING_ID);
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
