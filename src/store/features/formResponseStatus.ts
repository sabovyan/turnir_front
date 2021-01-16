import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ResponseStatus = {
  type: string | null;
  message: string | null;
};

const initialState: ResponseStatus = {
  type: null,
  message: null,
};

const { actions, reducer } = createSlice({
  name: 'formResponseStatus',
  initialState,
  reducers: {
    setResponseStatus: (
      state,
      { payload }: PayloadAction<ResponseStatus>,
    ): ResponseStatus => payload,
  },
});
