import { Participant } from 'src/types/main.types';
import makeId from './makeId';

interface CreateGameArgs {
  nextGameId: number | null;
  participants: {
    participant1?: Participant;
    participant2?: Participant;
  };
}

const makeAGame = () => {
  const generateGamesId = makeId();

  const createGame = ({
    nextGameId,
    participants: { participant1, participant2 },
  }: CreateGameArgs) => {
    return {
      id: generateGamesId(),
      nextGameId,
      participant1,
      participant2,
      thirdPlaceGameId: null,
      firstParticipantScore: [],
      roundId: null,
      secondParticipantScore: [],
    };
  };

  return createGame;
};

const createSingleGame = makeAGame();

export default createSingleGame;
