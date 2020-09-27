import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Search from "./Search/Search";
import Result from "./Result/Result";
import * as S from "./AppStyles";
import { DesignSystemProvider } from "./design-system";
import { AnalyticsProvider } from "./Analytics";
import { AnalyticsConsent } from "./AnalyticsConsent";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { TermsOfUse } from "./TermsOfUse";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <S.ContainerOuter>
          <Switch>
            <Route path="/result/:address">
              <Result />
            </Route>
            <Route path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms-of-use">
              <TermsOfUse />
            </Route>
            <Route path="/">
              <Search />
            </Route>
          </Switch>
        </S.ContainerOuter>
      </Router>
      <AnalyticsConsent />
    </>
  );
};

const AppWithContexts: React.FC = () => (
  <DesignSystemProvider>
    <AnalyticsProvider>
      <App />
    </AnalyticsProvider>
  </DesignSystemProvider>
);

export default AppWithContexts;
