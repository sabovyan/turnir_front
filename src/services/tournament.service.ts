import { tournamentRequest } from 'src/api';
import {
  Game,
  ITournament,
  ITournamentAllTogether,
  OnlyId,
  OnlyName,
  TournamentType,
  updateDataById,
} from 'src/types/main.types';
import authStorage from './storage';

interface createTournamentArgs {
  tournamentTypeId: TournamentType;
  winningSets: number;
  goalsToWin: number;
  tables: number;
  games: Game[];
  userId: number;
  name: string;
  hasThirdPlaceGame: boolean;
}

export interface IUpdateGameScore {
  firstParticipantScore: number[];
  secondParticipantScore: number[];
  gameId: number;
  tournamentId: number;
}

export interface IUpdateGameResponse {
  updatedGame: Game;
  nextGame?: undefined;
}

const create = async (data: createTournamentArgs) => {
  const token = authStorage.getAccessToken();
  if (!token) return;

  const response = await tournamentRequest.doPost({
    url: '',
    token,
    data,
  });
  const tournament = (await response.data) as ITournamentAllTogether;
  return tournament;
};

type getByIdArgs = {
  id: number;
};

const getAll = async () => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const response = await tournamentRequest.doGet({
    url: '',
    token,
  });

  const allTournaments = (await response.data) as ITournamentAllTogether[];
  return allTournaments;
};

const getById = async ({ id }: getByIdArgs) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const response = await tournamentRequest.doGet({
    url: `${id}`,
    token,
  });

  const tournament = (await response.data) as ITournamentAllTogether;

  return tournament;
};

const changeNameById = async ({ id, data }: updateDataById<OnlyName>) => {
  const token = authStorage.getAccessToken();
  if (!token) return;

  const response = await tournamentRequest.doUpdate({
    url: `/${id}`,
    token,
    data,
  });
  const tournament = response.data as ITournament;

  return tournament;
};

const deleteById = async ({ id }: OnlyId) => {
  const token = authStorage.getAccessToken();
  if (!token) return;

  const response = await tournamentRequest.doDelete({
    url: `/${id}`,
    token,
  });
  const tournament = response.data as ITournament;

  return tournament;
};

const updateTournamentScore = async ({
  gameId,
  firstParticipantScore,
  secondParticipantScore,
  tournamentId,
}: IUpdateGameScore) => {
  const token = authStorage.getAccessToken();
  if (!token) return;

  const response = await tournamentRequest.doUpdate({
    url: `game/${gameId}`,
    token,
    data: { firstParticipantScore, secondParticipantScore, tournamentId },
  });

  const updatedGames = response.data as IUpdateGameResponse;
  return updatedGames;
};

const tournamentService = {
  create,
  getAll,
  getById,
  changeNameById,
  deleteById,
  updateTournamentScore,
};

export default tournamentService;
