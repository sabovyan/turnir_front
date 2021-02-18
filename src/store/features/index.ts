import { combineReducers } from '@reduxjs/toolkit';
import formResponseStatus from './formResponseStatus';
import RegisterFormData from './RegisterFormData';
import requestPasswordEmail from './requestPasswordEmail';
import selectedMode from './selectedMode';
import settingsInfo from './settingsInfo';
// import players from './players';

const reducer = combineReducers({
  formResponseStatus,
  selectedMode,
  RegisterFormData,
  requestPasswordEmail,
  settingsInfo,
  // players,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
