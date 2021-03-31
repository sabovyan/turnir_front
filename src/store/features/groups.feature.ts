import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupResponse, PlayerResponse } from '../../types/main.types';

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
      return state.map((group) =>
        group.id === id ? { ...group, isEdit: true } : group,
      );
    },

    updateGroupNameById: (
      state,
      { payload: { id, name } }: PayloadAction<GroupResponse>,
    ) => {
      return state.map((group) =>
        group.id === id ? { ...group, name, isEdit: false } : group,
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

    updateGroupPlayersWidthOnePlayer: (
      state,
      {
        payload: { player, groupId },
      }: PayloadAction<{ player: PlayerResponse; groupId: number }>,
    ) => {
      const activeGroup = state.find((group) => group.id === groupId);

      if (!activeGroup) return;

      if (activeGroup.players.length) {
        const isPlayerExists = activeGroup.players.some(
          (existingPlayers) => existingPlayers.id === player.id,
        );
        if (isPlayerExists) return;
      }

      return state.map((group) =>
        groupId === group.id
          ? { ...group, players: [...group.players, player] }
          : group,
      );
    },

    updatePlayersInGroup: (
      state,
      { payload: { id, players } }: PayloadAction<GroupResponse>,
    ) => {
      return state.map((group) =>
        group.id === id ? { ...group, players } : group,
      );
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
  updatePlayersInGroup,
} = actions;
