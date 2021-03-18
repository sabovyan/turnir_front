import { Player, PlayerWithNameAndId } from '../types/main.types';
import { makeFakeId } from './makeId';

const setPlayersForGamesAndSeedFakePlayers = (
  players: Pick<Player, 'name' | 'id'>[],
  gamesQuantity: number,
) => {
  const generateFakeId = makeFakeId();

  let copiedArray: PlayerWithNameAndId[] = players.map((player) => ({
    ...player,
  }));

  const fakePlayer = {
    name: '',
  };

  while (copiedArray.length / gamesQuantity < 2) {
    copiedArray.push({ ...fakePlayer, id: generateFakeId() });
  }

  return copiedArray;
};

export default setPlayersForGamesAndSeedFakePlayers;
