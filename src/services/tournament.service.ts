import { tournamentRequest } from 'src/api';
import {
  Game,
  ITournamentAllTogether,
  TournamentType,
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

const getById = async (data: getByIdArgs) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const response = await tournamentRequest.doGet({
    url: `${data.id}`,
    token,
  });

  const tournament = (await response.data) as ITournamentAllTogether;

  return tournament;
};

const tournamentService = {
  create,
  getAll,
  getById,
};

export default tournamentService;
