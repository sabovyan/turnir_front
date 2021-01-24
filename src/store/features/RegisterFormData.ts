import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TRegisterFormData = {
  displayName: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

const initialState: TRegisterFormData = {
  displayName: '',
  email: '',
  password: '',
};

const { actions, reducer } = createSlice({
  name: 'formResponseStatus',
  initialState,
  reducers: {
    setRegisterFormData: (
      state,
      { payload }: PayloadAction<TRegisterFormData>,
    ): TRegisterFormData => payload,
  },
});

export default reducer;

export const { setRegisterFormData } = actions;
