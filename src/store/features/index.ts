import { combineReducers } from '@reduxjs/toolkit';
import formResponseStatus from './formResponseStatus';
import RegisterFormData from './RegisterFormData';
import requestPasswordEmail from './requestPasswordEmail';
import selectedMode from './selectedMode';
import settingsInfo from './settingsInfo';
import gamesForSetup from './gamesForSetup';
import players from './players';
import groups from './groups.feature';
import playersToTransfer from './playersToTransfer.feature';
import tournament from './tournament.feature';
import newTournamentModal from './newTournamentModal';
import allTournaments from './allTournaments';
import scoreBoard from './scoreBoard.feature';

const reducer = combineReducers({
  formResponseStatus,
  selectedMode,
  RegisterFormData,
  requestPasswordEmail,
  settingsInfo,
  gamesForSetup,
  players,
  groups,
  playersToTransfer,
  tournament,
  newTournamentModal,
  allTournaments,
  scoreBoard,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
