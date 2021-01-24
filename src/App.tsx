import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopBar from './components/TopBar/TopBar';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import EmailVerification from './pages/EmailVerification/EmailVerification';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import CreateNewTournament from './pages/CreateNewTournament/CreateNewTournament';

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
              <Route path="/new">
                <CreateNewTournament />
              </Route>
              <Route path="/email-confirmation/:token">
                <EmailVerification />
              </Route>

              <Route path="/password-reset/:token">
                <PasswordReset />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
