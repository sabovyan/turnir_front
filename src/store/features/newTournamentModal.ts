import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const { reducer, actions } = createSlice({
  name: 'newTournamentModal',

  initialState,
  reducers: {
    setNewTournamentModal: (state, { payload }: PayloadAction<boolean>) => {
      state.open = payload;
    },
  },
});

export default reducer;

export const { setNewTournamentModal } = actions;
