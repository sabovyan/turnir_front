import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SetupGame,
  PlayerWithNameAndId,
  SetupState,
} from '../../types/main.types';
import { createSetupGamesAndPlayers } from '../../utils/gamesForSetup.util';

const initialState: SetupState = {
  games: [],
  players: [],
  rounds: [],
  hasThirdPlaceGame: false,
};

const { reducer, actions } = createSlice({
  name: 'gamesForSetup',
  initialState,
  reducers: {
    createGamesAndPlayersForSetup: (
      state,
      {
        payload: { players },
      }: PayloadAction<{
        players: { name: string }[] | PlayerWithNameAndId[];
      }>,
    ) => {
      const newState = createSetupGamesAndPlayers(
        players,
        state.hasThirdPlaceGame,
      );
      return { ...state, ...newState };
    },

    UpdatePlayersOrder: (
      state,
      {
        payload: { players },
      }: PayloadAction<{ players: PlayerWithNameAndId[] }>,
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
      state.hasThirdPlaceGame = payload;
    },
  },
});

export const {
  createGamesAndPlayersForSetup,
  UpdatePlayersOrder,
  toggleThirdPlaceRound,
} = actions;

export default reducer;
