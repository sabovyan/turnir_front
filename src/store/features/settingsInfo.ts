import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, TournamentType } from '../../types/main.types';

export type SettingsInfoPlayers = Pick<Player, 'name' | 'id'>;

type tournamentSettings = {
  tables: number;
  goalsToWin: number;
  winningSets: number;
  tournamentType: TournamentType;
  tournamentPlayers: SettingsInfoPlayers[];
};

const initialState: tournamentSettings = {
  tables: 1,
  goalsToWin: 7,
  winningSets: 1,
  tournamentType: TournamentType.none,
  // tournamentPlayers: [],
  tournamentPlayers: [
    { name: 'alpha', id: 0 },
    { name: 'betta', id: 1 },
    { name: 'gamma', id: 3 },
    { name: 'delta', id: 4 },
    { name: 'epsilon', id: 5 },
    { name: 'zeta', id: 6 },
    { name: 'eta', id: 7 },
    { name: 'theta', id: 8 },
    { name: 'iota', id: 9 },
    { name: 'kappa', id: 10 },
    { name: 'lambda', id: 11 },
    { name: 'mu', id: 12 },
    { name: 'nu', id: 13 },
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

    setTournamentPlayers: (
      state,
      {
        payload: { players },
      }: PayloadAction<{ players: { name: string; id: number }[] }>,
    ) => {
      const settingsInfoPlayers: SettingsInfoPlayers[] = players.map(
        ({ name, id }) => ({
          name,
          id,
        }),
      );
      state.tournamentPlayers = settingsInfoPlayers;
    },

    deletePlayerByName: (
      state,
      { payload: { name } }: PayloadAction<{ name: string }>,
    ) => {
      const players = state.tournamentPlayers.filter(
        (player) => player.name !== name,
      );
      state.tournamentPlayers = players;
      return state;
    },

    addNewPlayerToTournament: (
      state,
      { payload }: PayloadAction<{ name: string; id: number }>,
    ) => {
      const players = [...state.tournamentPlayers, payload];
      state.tournamentPlayers = players;
    },

    editPlayerName: (
      state,
      {
        payload: { prevName, newName },
      }: PayloadAction<{ prevName: string; newName: string }>,
    ) => {
      state.tournamentPlayers = state.tournamentPlayers.map((player) =>
        player.name === prevName ? { ...player, name: newName } : player,
      );

      return state;
    },
  },
});

export const {
  setTablesQuantity,
  setTournamentType,
  setTournamentPlayers,
  setGoalsQuantity,
  setWinningSets,
  deletePlayerByName,
  addNewPlayerToTournament,
  editPlayerName,
} = actions;
export default reducer;
