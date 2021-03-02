import { playersRequest } from '../api';
import { PlayerResponse } from '../types/main.types';
import authStorage from './storage';

type AllPlayerRequestType = {
  userId: number;
};

type createNewPlayerRequest = {
  name: string;
  userId: number;
};

type DeletePlayerRequest = {
  slug: number;
};

type UpdatePlayerRequest = {
  name: string;
  userId: number;
  id: number;
};

const fetchAllPlayers = async ({ userId }: AllPlayerRequestType) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const response = await playersRequest.doGet({
    url: '',
    token,
    data: {
      userId,
    },
  });

  const players = (await response.data) as PlayerResponse[];
  return players;
};

const createNewPlayer = async ({ name, userId }: createNewPlayerRequest) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const res = await playersRequest.doPost({
    url: '/',
    token,
    data: {
      name,
      userId,
    },
  });

  const player = (await res.data) as PlayerResponse;
  return player;
};

const deletePlayer = async ({ slug }: DeletePlayerRequest) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const res = await playersRequest.doDelete({
    url: `/${slug}`,
    token,
  });

  const deletedPlayer = (await res.data) as PlayerResponse;
  return deletedPlayer;
};

const updatePlayerName = async ({ name, id, userId }: UpdatePlayerRequest) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const res = await playersRequest.doUpdate({
    url: '',
    token,
    data: { name, id, userId },
  });

  const updatedPlayer = (await res.data) as PlayerResponse;
  return updatedPlayer;
};

const playerService = {
  fetchAllPlayers,
  createNewPlayer,
  deletePlayer,
  updatePlayerName,
};

export default playerService;
