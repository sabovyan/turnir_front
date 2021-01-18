import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ResponseStatus = {
  type: 'error' | 'success' | undefined;
  message: string | undefined;
  open: boolean;
};

const initialState: ResponseStatus = {
  type: undefined,
  message: undefined,
  open: false,
};

const { actions, reducer } = createSlice({
  name: 'formResponseStatus',
  initialState,
  reducers: {
    setResponseStatus: (
      state,
      { payload }: PayloadAction<ResponseStatus>,
    ): ResponseStatus => payload,

    closeAlert: (state) => {
      state.open = false;
    },
  },
});

export default reducer;

export const { setResponseStatus, closeAlert } = actions;
