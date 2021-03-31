import { Game, Participant } from 'src/types/main.types';

enum TURN {
  first = 'FIRST_PLAYER',
  second = 'SECOND_PLAYER',
}

const generateFirstRoundGames = (
  quantityOfFirstRoundGames: number,
  participants: Participant[],
  generateGamesId: () => number,
) => {
  let count = 0;
  let turn = TURN.first;

  const games = participants.reduce<Game[]>((collected, participant) => {
    if (count === quantityOfFirstRoundGames) {
      count = 0;
      turn = TURN.second;
    }
    if (turn === TURN.first) {
      const newGame: Game = {
        participant1: participant,
        id: generateGamesId(),
        firstParticipantScore: [],
        nextGameId: null,
        roundId: null,
        secondParticipantScore: [],
        thirdPlaceGameId: null,
        nextGamePosition: 1,
      };
      collected.push(newGame);
    }

    if (turn === TURN.second) {
      collected[count].participant2 = participant;
    }

    count += 1;

    return collected;
  }, []);

  return games;
};

export default generateFirstRoundGames;
