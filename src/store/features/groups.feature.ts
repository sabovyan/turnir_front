import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupResponse } from '../../types/main.types';

const initialState: (GroupResponse & { isEdit: boolean })[] = [];

type IdArgument = {
  id: number;
};

const { reducer, actions } = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    getAllGroups: (_state, { payload }: PayloadAction<GroupResponse[]>) => {
      return payload.map((group) => ({ ...group, isEdit: false }));
    },

    addNewGroup: (state, { payload }: PayloadAction<GroupResponse>) => {
      if (state.length) {
        return [...state, { ...payload, isEdit: false }];
      }

      return [{ ...payload, isEdit: false }];
    },

    changeGroupEditStatusById: (
      state,
      { payload: { id } }: PayloadAction<IdArgument>,
    ) => {
      return state.map((player) =>
        player.id === id
          ? { ...player, isEdit: true }
          : { ...player, isEdit: false },
      );
    },

    updateGroupNameById: (
      state,
      { payload: { id, name } }: PayloadAction<GroupResponse>,
    ) => {
      return state.map((player) =>
        player.id === id ? { ...player, name, isEdit: false } : player,
      );
    },

    updateGroupEditStatus: (
      state,
      { payload: { id } }: PayloadAction<IdArgument>,
    ) => {
      return state.map((player) => ({ ...player, isEdit: false }));
    },

    removeGroup: (state, { payload: { id } }: PayloadAction<GroupResponse>) => {
      return state.filter((player) => player.id !== id);
    },
  },
});

export default reducer;

export const {
  getAllGroups,
  addNewGroup,
  removeGroup,
  changeGroupEditStatusById,
  updateGroupNameById,
  updateGroupEditStatus,
} = actions;
