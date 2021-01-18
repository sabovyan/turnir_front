import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopBar from './components/TopBar/TopBar';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import EmailVerification from './pages/EmailVerification/EmailVerification';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ width: '100%' }}>
          <TopBar />
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/email-verification/:token">
                <EmailVerification />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
