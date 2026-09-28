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
import { Countdown } from "./Countdown";
import { TEST_ELECTION_ADDRESS, TEST_ELECTION_ID } from "./elections";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <S.ContainerOuter>
          <Switch>
            <Route path="/result/:address">
              <Result />
            </Route>
            {/* The results page filled with Google's sample data */}
            <Route path="/sample">
              <Result
                address={TEST_ELECTION_ADDRESS}
                electionId={TEST_ELECTION_ID}
              />
            </Route>
            <Route path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms-of-use">
              <TermsOfUse />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/">
              <Countdown />
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
