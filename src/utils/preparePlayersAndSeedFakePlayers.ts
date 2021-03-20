import { Participant } from '../types/main.types';
import deepCopyArray from './deepCopy';

const seedFakePlayers = (
  participants: Participant[],
  gamesQuantity: number,
) => {
  const participantsCopy = deepCopyArray<Participant>(participants);

  const fakePlayer = {
    name: '',
  };

  while (participantsCopy.length / gamesQuantity < 2) {
    participantsCopy.push({ ...fakePlayer, players: [] });
  }

  return participantsCopy;
};

export default seedFakePlayers;
