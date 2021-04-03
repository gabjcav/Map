import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import HomeContainer from "./containers/HomeContainer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" component={HomeContainer} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
