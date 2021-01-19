import { combineReducers } from '@reduxjs/toolkit';
import formResponseStatus from './formResponseStatus';
import RegisterFormData from './RegisterFormData';

// const reducer = { formResponseStatus };

const reducer = combineReducers({ formResponseStatus, RegisterFormData });

export type RootState = ReturnType<typeof reducer>;

export default reducer;
