import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import HomeContainer from './containers/HomeContainer';
// import StopListContainer from './containers/StopListContainer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" component={HomeContainer} />
        </Switch>
        {/* <StopListContainer /> */}
      </Router>
    </>
  )
};

export default App;