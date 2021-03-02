import { combineReducers } from '@reduxjs/toolkit';
import formResponseStatus from './formResponseStatus';
import RegisterFormData from './RegisterFormData';
import requestPasswordEmail from './requestPasswordEmail';
import selectedMode from './selectedMode';
import settingsInfo from './settingsInfo';
import gamesForSetup from './gamesForSetup';
import players from './players';
import groups from './groups.feature';

const reducer = combineReducers({
  formResponseStatus,
  selectedMode,
  RegisterFormData,
  requestPasswordEmail,
  settingsInfo,
  gamesForSetup,
  players,
  groups,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
