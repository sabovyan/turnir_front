import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { PlayerResponse } from '../../types/main.types';

type PlayersToTransfer = PlayerResponse | PlayerResponse[] | null;

const initialState = null;

const { reducer, actions } = createSlice<
  PlayersToTransfer,
  SliceCaseReducers<PlayersToTransfer>
>({
  name: 'playersToTransfer',
  initialState,
  reducers: {
    setSinglePlayer: (state, { payload }: PayloadAction<PlayerResponse>) => {
      state = payload;
      return state;
    },

    setMultiplePlayers: (
      _state,
      { payload }: PayloadAction<PlayerResponse[]>,
    ) => {
      const newState = payload;
      return newState;
    },
    // removePlayer
  },
});

export default reducer;

export const { setSinglePlayer, setMultiplePlayers } = actions;
