import { Game, Participant } from 'src/types/main.types';
import createSingleGame from './CreateSingleGame';

enum TURN {
  first = 'FIRST_PLAYER',
  second = 'SECOND_PLAYER',
}

const generateFirstRoundGames = (
  firstRoundGamesQuantity: number,
  participants: Participant[],
) => {
  let count = 0;
  let turn = TURN.first;

  const games = participants.reduce<Game[]>((collected, participant) => {
    if (count === firstRoundGamesQuantity) {
      count = 0;
      turn = TURN.second;
    }
    if (turn === TURN.first) {
      const newGame = createSingleGame({
        nextGameId: null,
        participants: {
          participant1: participant,
        },
      });

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
