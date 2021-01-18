import { combineReducers } from '@reduxjs/toolkit';
import formResponseStatus from './formResponseStatus';

// const reducer = { formResponseStatus };

const reducer = combineReducers({ formResponseStatus });

export type RootState = ReturnType<typeof reducer>;

export default reducer;
