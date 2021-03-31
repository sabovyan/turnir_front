import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { ITournamentAllTogether } from 'src/types/main.types';

const initialState: null | ITournamentAllTogether = null;

const { reducer, actions } = createSlice<
  ITournamentAllTogether | null,
  SliceCaseReducers<ITournamentAllTogether | null>
>({
  name: 'tournament',
  initialState,
  reducers: {
    createTournament: (
      state,
      { payload }: PayloadAction<ITournamentAllTogether>,
    ) => {
      return payload;
    },
  },
});

export default reducer;

export const { createTournament } = actions;
