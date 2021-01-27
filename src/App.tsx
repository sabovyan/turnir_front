import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import EmailVerification from './pages/EmailVerification/EmailVerification';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import CreateNewTournament from './pages/CreateNewTournament/CreateNewTournament';
import TournamentSettings from './pages/TournamentSettings/TournamentSettings';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import useAuth from './services/authentication';
import Participants from './pages/Participants/Participants';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ width: '100%' }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute isAuth={user} path="/new">
              <CreateNewTournament />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/tournament-settings">
              <TournamentSettings />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/participants">
              <Participants />
            </PrivateRoute>

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
  );
}

export default App;
