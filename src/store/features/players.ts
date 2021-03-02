import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerResponse } from '../../types/main.types';

const initialState: (PlayerResponse & { isEdit: boolean })[] = [];

const { reducer, actions } = createSlice({
  name: 'players',
  initialState,
  reducers: {
    deletePlayer: (
      state,
      { payload: { id } }: PayloadAction<{ id: number }>,
    ) => {
      const newState = state.filter((player) => player.id !== id);
      return newState;
    },

    setPlayers: (state, { payload }: PayloadAction<PlayerResponse[]>) => {
      state = payload.map((player) => ({ ...player, isEdit: false }));
      return state;
    },

    addNewPlayer: (state, { payload }: PayloadAction<PlayerResponse>) => {
      return [...state, { ...payload, isEdit: false }];
    },

    removePlayer: (
      state,
      { payload: { id } }: PayloadAction<PlayerResponse>,
    ) => {
      return state.filter((player) => player.id !== id);
    },

    updatePlayerEditStatus: (
      state,
      { payload: { id } }: PayloadAction<{ id: number }>,
    ) => {
      return state.map((player) =>
        player.id === id
          ? { ...player, isEdit: !player.isEdit }
          : { ...player, isEdit: false },
      );
    },

    changePlayerName: (
      state,
      { payload: { id, name } }: PayloadAction<PlayerResponse>,
    ) => {
      return state.map((player) =>
        player.id === id ? { ...player, name, isEdit: false } : player,
      );
    },
  },
});

export default reducer;

export const {
  deletePlayer,
  setPlayers,
  addNewPlayer,
  removePlayer,
  updatePlayerEditStatus,
  changePlayerName,
} = actions;
