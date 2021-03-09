import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, TournamentType } from '../../types/main.types';

export type SettingsInfoPlayers = Pick<Player, 'name'>;

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
  // players: [],
  players: [
    { name: 'alpha' },
    { name: 'betta' },
    { name: 'gamma' },
    { name: 'delta' },
    { name: 'epsilon' },
    { name: 'zeta' },
    { name: 'eta' },
    { name: 'theta' },
    { name: 'iota' },
    { name: 'kappa' },
    { name: 'lambda' },
    { name: 'mu' },
    { name: 'nu' },
  ],
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

    setGoalsQuantity: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'goalsToWin'>>,
    ) => {
      state.goalsToWin = payload.goalsToWin;
    },

    setWinningSets: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'winningSets'>>,
    ) => {
      state.winningSets = payload.winningSets;
    },

    setTournamentType: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'tournamentType'>>,
    ) => {
      state.tournamentType = payload.tournamentType;
    },

    getPlayers: (
      state,
      { payload: { players } }: PayloadAction<{ players: { name: string }[] }>,
    ) => {
      const settingsInfoPlayers: SettingsInfoPlayers[] = players.map(
        ({ name }) => ({
          name,
        }),
      );
      state.players = settingsInfoPlayers;
    },

    deletePlayerByName: (
      state,
      { payload: { name } }: PayloadAction<{ name: string }>,
    ) => {
      const players = state.players.filter((player) => player.name !== name);
      state.players = players;
      return state;
    },

    addNewPlayer: (state, { payload }: PayloadAction<{ name: string }>) => {
      const players = [...state.players, payload];
      state.players = players;
    },

    editPlayerName: (
      state,
      {
        payload: { prevName, newName },
      }: PayloadAction<{ prevName: string; newName: string }>,
    ) => {
      state.players = state.players.map((player) =>
        player.name === prevName ? { ...player, name: newName } : player,
      );

      return state;
    },
  },
});

export const {
  setTablesQuantity,
  setTournamentType,
  getPlayers,
  setGoalsQuantity,
  setWinningSets,
  deletePlayerByName,
  addNewPlayer,
  editPlayerName,
} = actions;
export default reducer;
