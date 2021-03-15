import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SetupGame,
  SetupPlayer,
  SetupRound,
  SetupState,
} from '../../types/main.types';
import { createSetupGamesAndPlayers } from '../../utils/gamesForSetup.util';

const initialState: SetupState = {
  games: [],
  players: [],
  rounds: [],
  gameForThirdPlace: false,
};

const { reducer, actions } = createSlice({
  name: 'gamesForSetup',
  initialState,
  reducers: {
    createGamesAndPlayersForSetup: (
      _state,
      {
        payload: { players },
      }: PayloadAction<{ players: { name: string }[] | SetupPlayer[] }>,
    ) => {
      const newState = createSetupGamesAndPlayers(players);
      return { ...newState, gameForThirdPlace: false };
    },

    UpdatePlayersOrder: (
      state,
      { payload: { players } }: PayloadAction<{ players: SetupPlayer[] }>,
    ) => ({
      ...state,
      players,
    }),

    toggleThirdPlaceRound: (state, { payload }: PayloadAction<boolean>) => {
      const finalRoundGames = state.rounds[state.rounds.length - 1].games;
      if (payload) {
        const thirdPlaceGame: SetupGame = {
          id: 444499999,
        };

        finalRoundGames.push(thirdPlaceGame);
      } else {
        finalRoundGames.pop();
      }
    },
  },
});

export const {
  createGamesAndPlayersForSetup,
  UpdatePlayersOrder,
  toggleThirdPlaceRound,
} = actions;

export default reducer;
