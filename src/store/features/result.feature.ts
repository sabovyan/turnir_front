import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Participant, TournamentType } from 'src/types/main.types';

type ResultState = {
  participants: Participant[];
  tournamentType: TournamentType;
  name: string;
};

const initialState: ResultState = {
  participants: [],
  tournamentType: TournamentType.none,
  name: '',
};

const { reducer, actions } = createSlice({
  name: 'Result',
  initialState,
  reducers: {
    setResult: (state, { payload }: PayloadAction<ResultState>) => payload,
  },
});

export default reducer;

export const { setResult } = actions;
