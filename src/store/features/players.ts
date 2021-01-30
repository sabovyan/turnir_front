import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../types/main.types';
import { generateId } from '../../components/ParticipantsInputList/ParticipantsInput.util';

const getPlayerId = generateId();

const initialState: Player[] = [
  {
    name: '',
    id: getPlayerId(),
  },
];

const { reducer, actions } = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (
      state,
      { payload: { id, value } }: PayloadAction<{ id: number; value: string }>,
    ) => {
      const newState = state.map((el) =>
        el.id === id ? { ...el, name: value } : el,
      );
      return newState;
    },

    addNewEmptyRow: (state) => {
      state.push({
        name: '',
        id: getPlayerId(),
      });
    },

    removeLastRow: (state) => {
      const newState = state.slice(0, -1);
      return newState;
    },

    removePlayersWithEmptyNames: (state) =>
      state.filter(
        (el, idx) =>
          (state.length >= 1 && idx === state.length - 1) || el.name !== '',
      ),
  },
});

export default reducer;

export const {
  setPlayers,
  addNewEmptyRow,
  removeLastRow,
  removePlayersWithEmptyNames,
} = actions;
