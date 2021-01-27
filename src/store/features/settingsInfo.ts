import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TournamentType } from '../../types/main.types';

type tournamentSettings = {
  tables: number;
  goalsToWin: number;
  winningSets: number;
  tournamentType: TournamentType;
};

const initialState = {
  tables: 1,
  goalsToWin: 7,
  winningSets: 1,
  tournamentType: TournamentType.none,
};

const { reducer, actions } = createSlice({
  name: 'settingsInfo',
  initialState,
  reducers: {
    setTablesQuantity: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'tables'>>,
    ) => {
      state.tables = payload.tables;
    },
    setTournamentType: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'tournamentType'>>,
    ) => {
      state.tournamentType = payload.tournamentType;
    },
  },
});

export const { setTablesQuantity, setTournamentType } = actions;
export default reducer;
