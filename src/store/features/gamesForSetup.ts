import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Participant, SetupState } from '../../types/main.types';
import { createSetupGamesAndPlayers } from '../../utils/gamesForSetup.util';

const initialState: SetupState = {
  games: [],
  firstRoundGames: [],
  participants: [],
  rounds: [],
  hasThirdPlaceGame: false,
};

const { reducer, actions } = createSlice({
  name: 'gamesForSetup',
  initialState,
  reducers: {
    setUpGamesAndPlayers: (
      state,
      {
        payload: { participants },
      }: PayloadAction<{
        participants: Participant[];
      }>,
    ) => {
      const newState = createSetupGamesAndPlayers(
        participants,
        state.hasThirdPlaceGame,
      );

      return { ...state, ...newState };
    },

    toggleThirdPlaceRound: (state, { payload }: PayloadAction<boolean>) => {
      const finalRoundGames = state.rounds[state.rounds.length - 1].games;
      if (payload) {
        const thirdPlaceGame: Game = {
          id: 444499999,
          firstParticipantScore: [],
          nextGameId: null,
          roundId: null,
          secondParticipantScore: [],
          thirdPlaceGameId: null,
          nextGamePosition: 1,
        };

        finalRoundGames.push(thirdPlaceGame);
      } else {
        finalRoundGames.pop();
      }
      state.hasThirdPlaceGame = payload;
    },
  },
});

export const { setUpGamesAndPlayers, toggleThirdPlaceRound } = actions;

export default reducer;
