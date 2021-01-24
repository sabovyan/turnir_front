import { combineReducers } from '@reduxjs/toolkit';
import formResponseStatus from './formResponseStatus';
import RegisterFormData from './RegisterFormData';
import requestPasswordEmail from './requestPasswordEmail';

// const reducer = { formResponseStatus };

const reducer = combineReducers({
  formResponseStatus,
  RegisterFormData,
  requestPasswordEmail,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
