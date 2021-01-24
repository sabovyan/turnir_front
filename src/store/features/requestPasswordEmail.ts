import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'requestPasswordEmail',
  initialState: '',
  reducers: {
    setEmail: (state, { payload }: PayloadAction<string>) => payload,
  },
});

export const { setEmail } = actions;

export default reducer;
