import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, TournamentType } from '../../types/main.types';

type SettingsInfoPlayers = Omit<Player, 'id'>;

type tournamentSettings = {
  tables: number;
  goalsToWin: number;
  winningSets: number;
  tournamentType: TournamentType;
  players: SettingsInfoPlayers[];
};

const initialState: tournamentSettings = {
  tables: 1,
  goalsToWin: 7,
  winningSets: 1,
  tournamentType: TournamentType.none,
  players: [],
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

    getPlayers: (
      state,
      { payload: { players } }: PayloadAction<{ players: Player[] }>,
    ) => {
      const SettingsInfoPlayers: SettingsInfoPlayers[] = players.map((pl) => ({
        name: pl.name,
      }));
      state.players = SettingsInfoPlayers;
    },
  },
});

export const { setTablesQuantity, setTournamentType, getPlayers } = actions;
export default reducer;
