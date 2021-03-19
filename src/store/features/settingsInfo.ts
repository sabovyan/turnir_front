import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Participant, Player, TournamentType } from '../../types/main.types';

type tournamentSettings = {
  tables: number;
  goalsToWin: number;
  winningSets: number;
  tournamentType: TournamentType;

  participants: Participant[];
};

const initialState: tournamentSettings = {
  tables: 1,
  goalsToWin: 7,
  winningSets: 1,
  tournamentType: TournamentType.none,
  participants: [
    {
      name: 'alpha',
      players: [{ id: 0 }],
    },
    { name: 'betta', players: [{ id: 1 }, { id: 2 }] },
    { name: 'gamma', players: [{ id: 3 }] },
    { name: 'delta', players: [{ id: 4 }] },
    { name: 'epsilon', players: [{ id: 5 }] },
    { name: 'zeta', players: [{ id: 6 }] },
    { name: 'eta', players: [{ id: 7 }] },
    { name: 'theta', players: [{ id: 8 }] },
    { name: 'iota', players: [{ id: 9 }] },
    { name: 'kappa', players: [{ id: 10 }] },
    { name: 'lambda', players: [{ id: 11 }] },
    { name: 'mu', players: [{ id: 12 }] },
    { name: 'nu', players: [{ id: 13 }] },
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

    setTournamentParticipants: (
      state,
      {
        payload: { players },
      }: PayloadAction<{ players: { name: string; id: number }[] }>,
    ) => {
      state.participants = players.map(({ name, id }) => ({
        name,
        players: [
          {
            id,
          },
        ],
      }));
    },

    deletePlayerFromTournament: (
      state,
      { payload: { name } }: PayloadAction<{ name: string }>,
    ) => {
      state.participants = state.participants.filter(
        (Participant) => Participant.name !== name,
      );
    },

    addNewPlayerToTournament: (
      state,
      { payload }: PayloadAction<Participant>,
    ) => {
      state.participants = [...state.participants, payload];
    },
  },
});

export const {
  setTablesQuantity,
  setTournamentType,
  setTournamentParticipants,
  setGoalsQuantity,
  setWinningSets,
  deletePlayerFromTournament,
  addNewPlayerToTournament,
} = actions;
export default reducer;
