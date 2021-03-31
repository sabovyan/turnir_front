import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalPlayer, PlayerResponse } from '../../types/main.types';

const initialState: LocalPlayer[] = [];

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
      state = payload.map((player) => ({
        ...player,
        isEdit: false,
        isChecked: false,
      }));
      return state;
    },

    addNewPlayer: (state, { payload }: PayloadAction<PlayerResponse>) => {
      return [...state, { ...payload, isEdit: false, isChecked: false }];
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

    setAllPlayersCheckStatus: (state, { payload }: PayloadAction<boolean>) => {
      return state.map((pl) => ({ ...pl, isChecked: payload }));
    },

    setSinglePlayerCheckStatus: (
      state,
      {
        payload: { id, checked },
      }: PayloadAction<{ checked: boolean; id: number }>,
    ) => {
      return state.map((pl) =>
        pl.id === id ? { ...pl, isChecked: checked } : pl,
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
  setAllPlayersCheckStatus,
  setSinglePlayerCheckStatus,
} = actions;
