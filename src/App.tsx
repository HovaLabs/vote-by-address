import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./Search/Search";
import Result from "./Result/Result";
import * as S from "./AppStyles";
import { DesignSystemProvider } from "./design-system";

const App: React.FC = () => {
  return (
    <DesignSystemProvider>
      <Router>
        <S.ContainerOuter>
          <Switch>
            <Route path="/result/:address">
              <Result />
            </Route>
            <Route path="/">
              <Search />
            </Route>
          </Switch>
        </S.ContainerOuter>
      </Router>
    </DesignSystemProvider>
  );
};

export default App;
