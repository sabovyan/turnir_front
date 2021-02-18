import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../types/main.types';
import { generateId } from '../../components/ParticipantsInputList/ParticipantsInput.util';

const getPlayerId = generateId();

const initialState: Player[] = [];

const { reducer, actions } = createSlice({
  name: 'players',
  initialState,
  reducers: {
    // setPlayers: (
    //   state,
    //   { payload: { id, value } }: PayloadAction<{ id: number; value: string }>,
    // ) => {
    //   if(state)
    //   const newState = state.map((el) =>
    //     el.id === id ? { ...el, name: value } : el,
    //   );
    //   return newState;
    // },
    //   addNewPlayer: (
    //     state,
    //     { payload: { value } }: PayloadAction<{ value: string }>,
    //   ) => {
    //     if (state) {
    //     }
    //     const isNameExists = state.some((player) => player.name === value);
    //     if (!isNameExists) {
    //       state.push({
    //         name: value,
    //         id: getPlayerId(),
    //       });
    //     }
    //   },
    //   editPlayerName: (
    //     state,
    //     { payload: { value, id } }: PayloadAction<{ value: string; id: number }>,
    //   ) => {
    //     const isNameExists = state.some(
    //       (player) => player.name === value && player.id !== id,
    //     );
    //     console.log({ isNameExists });
    //     if (!isNameExists) {
    //       return state.map((pl) => (pl.id === id ? { ...pl, name: value } : pl));
    //     }
    //   },
    // },
    //   addNewEmptyRow: (state) => {
    //     state.push({
    //       name: '',
    //       id: getPlayerId(),
    //     });
    //   },
    //   removeLastRow: (state) => {
    //     const newState = state.slice(0, -1);
    //     return newState;
    //   },
    //   removePlayersWithEmptyNames: (state) =>
    //     state.filter(
    //       (el, idx) =>
    //         (state.length >= 1 && idx === state.length - 1) || el.name !== '',
    //     ),
  },
});

export default reducer;

export const {
  // setPlayers,
  // addNewEmptyRow,
  // removeLastRow,
  // removePlayersWithEmptyNames,
  // addNewPlayer,
  // editPlayerName,
} = actions;
