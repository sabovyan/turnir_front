import { SetupPlayer } from '../types/main.types';
import makeId from './makeId';

const preparePlayersForGamesAndSeedFakePlayers = (
  players: { name: string }[],
  gamesQuantity: number,
) => {
  const generateId = makeId();

  let copiedArray: SetupPlayer[] = players.map((player) => ({
    ...player,
    id: generateId(),
  }));

  const fakePlayer = {
    name: '',
  };

  while (copiedArray.length / gamesQuantity < 2) {
    copiedArray.push({ ...fakePlayer, id: generateId() });
  }

  return copiedArray;
};

export default preparePlayersForGamesAndSeedFakePlayers;
