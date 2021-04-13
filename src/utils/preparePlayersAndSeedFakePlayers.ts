import { Participant, Side } from '../types/main.types';
import deepCopyArray from './deepCopy';

enum Turn {
  first,
  second,
}

const seedFakePlayers = (
  participants: Participant[],
  gamesQuantity: number,
) => {
  let participantsCopy = deepCopyArray(participants);

  const fakePlayer = {
    name: '',
    players: [],
    side: Side.neutral,
  };

  let turn = Turn.first;

  while (participantsCopy.length / gamesQuantity < 2) {
    if (turn === Turn.first) {
      participantsCopy.push(fakePlayer);
      turn = Turn.second;
    } else {
      participantsCopy = [fakePlayer, ...participantsCopy];

      turn = Turn.first;
    }
  }

  return participantsCopy;
};

export default seedFakePlayers;
