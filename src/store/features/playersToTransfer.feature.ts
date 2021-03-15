import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  Action,
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

    nullifyTransfer: (state, { payload }: PayloadAction<null>) => {
      state = payload;
      return state;
    },
  },
});

export default reducer;

export const { setSinglePlayer, setMultiplePlayers, nullifyTransfer } = actions;
