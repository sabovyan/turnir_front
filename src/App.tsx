import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopBar from './components/TopBar/TopBar';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import EmailVerification from './pages/EmailVerification/EmailVerification';

function App() {
  return (
    <Router>
      <div className="App">
        <div style={{ display: 'flex' }}>
          <SideBar />
          <div style={{ width: '100%' }}>
            <TopBar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/email-confirmation/:token">
                <EmailVerification />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
