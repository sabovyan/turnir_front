import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetupPlayer, SetupState } from '../../types/main.types';
import { createSetupGamesAndPlayers } from '../../utils/gamesForSetup.util';

const initialState: SetupState = {
  games: [],
  players: [],
  rounds: [],
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
      return newState;
    },

    UpdatePlayersOrder: (
      state,
      { payload: { players } }: PayloadAction<{ players: SetupPlayer[] }>,
    ) => ({
      ...state,
      players,
    }),
  },
});

export const { createGamesAndPlayersForSetup, UpdatePlayersOrder } = actions;

export default reducer;
