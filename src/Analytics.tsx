import React from "react";
import ReactGA from "react-ga";

type TAnalyticsContext = typeof ReactGA;

const TRACKING_ID = "UA-178617624-1";
ReactGA.initialize(TRACKING_ID);

export const AnalyticsContext = React.createContext<TAnalyticsContext>(ReactGA);

export const AnalyticsProvider: React.FC = ({ children }) => {
  const [analytics] = React.useState<typeof ReactGA>(ReactGA);

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): TAnalyticsContext =>
  React.useContext(AnalyticsContext);
