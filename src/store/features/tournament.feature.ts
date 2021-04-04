import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TournamentState {
  scale: number;
  isFullScreen: boolean;
}

const initialState: TournamentState = {
  scale: 100,
  isFullScreen: false,
};

const { reducer, actions } = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setScale: (state, { payload }: PayloadAction<number>) => {
      state.scale = payload;
    },
    setFullScreen: (state, { payload }: PayloadAction<boolean>) => {
      state.isFullScreen = payload;
    },
  },
});

export default reducer;

export const { setScale, setFullScreen } = actions;
