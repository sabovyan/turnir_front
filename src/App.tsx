import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import EmailVerification from './pages/EmailVerification/EmailVerification';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import NewTournament from './pages/New/New';
import TournamentSettings from './pages/TournamentSettings/TournamentSettings';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import useAuth from './services/authentication';
import Participants from './pages/Participants/Participants';
import Setup from './pages/Setup/Setup';
import Tournament from './pages/Tournament/Tournament';
import TestScreen from './pages/TestScreen/TestScreen';
import CreateTournamentModal from './components/common/Modal/CreateTournamentModal';
import Lms from './pages/LMS/LMS';
import Result from './pages/Result/Result';
import Players from './pages/Players/Players';
// import CreateTournamentModal from './components/common/Modal/CreateTournamentModal';
// import UndoFullScreen from './components/UndoFullScreen/UndoFullScreen';
// import UpdateScoreModal from './components/common/Modal/updateScoreModal';

function App() {
  const { user } = useAuth();

  return (
    <div>
      <CreateTournamentModal />
      {/* <UpdateScoreModal /> */}

      {/* <UndoFullScreen /> */}
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ width: '100%' }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute isAuth={user} path="/new">
              <NewTournament />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/tournament-settings">
              <TournamentSettings />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/participants">
              <Participants />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/setup">
              <Setup />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/tournament/:id">
              <Tournament />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/test">
              <TestScreen />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/lms">
              <Lms />
            </PrivateRoute>
            <PrivateRoute isAuth={user} path="/result">
              <Result />
            </PrivateRoute>

            <PrivateRoute isAuth={user} path="/players">
              <Players />
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
