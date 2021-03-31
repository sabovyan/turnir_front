import { userRequest } from '../api';
import { GroupResponse, PlayerResponse } from '../types/main.types';
import authStorage from './storage';

type groupsAndPlayersResponse = {
  groups: GroupResponse[];
  players: PlayerResponse[];
} | null;

const getGroupsAndPlayersByUserId = async (id: number) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const response = await userRequest.doGet({ url: `${id}`, token });

  const groupsAndPlayers = (await response.data) as groupsAndPlayersResponse;
  return groupsAndPlayers;
};

const userService = {
  getGroupsAndPlayersByUserId,
};

export default userService;
