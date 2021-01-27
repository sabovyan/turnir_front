import { combineReducers } from '@reduxjs/toolkit';
import formResponseStatus from './formResponseStatus';
import RegisterFormData from './RegisterFormData';
import requestPasswordEmail from './requestPasswordEmail';
import selectedMode from './selectedMode';
import settingsInfo from './settingsInfo';

const reducer = combineReducers({
  formResponseStatus,
  selectedMode,
  RegisterFormData,
  requestPasswordEmail,
  settingsInfo,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
