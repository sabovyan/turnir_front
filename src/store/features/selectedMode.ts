import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum selectedMode {
  roundRobin = 'Round Robin',
  lastManStanding = 'Last Man standing',
  elimination = 'Elimination',
  none = 'none',
}

const initialState = selectedMode.none;

const { reducer, actions } = createSlice({
  name: 'selectedTournament',
  initialState,
  reducers: {
    setSelectedMode: (state, { payload }: PayloadAction<selectedMode>) =>
      payload,
  },
});

export const { setSelectedMode } = actions;
export default reducer;
