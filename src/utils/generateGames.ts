import { SetupGame, SetupPlayer } from '../types/main.types';
import makeId from './makeId';

enum TURN {
  firstPlayer = 'FIRST_PLAYER',
  secondPlayer = 'SECOND_PLAYER',
}

const generateGames = (
  players: SetupPlayer[],
  quantityOfGamesForTheFirstRound: number,
) => {
  const generateGamesId = makeId();

  let count = 0;
  let turn = TURN.firstPlayer;

  const games = players.reduce<SetupGame[]>((collected, player) => {
    if (count === quantityOfGamesForTheFirstRound) {
      count = 0;
      turn = TURN.secondPlayer;
    }
    if (turn === TURN.firstPlayer) {
      const newGame: SetupGame = {
        player1: player,
        id: generateGamesId(),
      };
      collected.push(newGame);
    }

    if (turn === TURN.secondPlayer) {
      collected[count].player2 = player;
    }
    count++;

    return collected;
  }, []);

  const gamesTotalQuantity = players.length - 1;

  const totalGames = Array(gamesTotalQuantity - quantityOfGamesForTheFirstRound)
    .fill({})
    .reduce<SetupGame[]>((acc) => {
      acc.push({ id: generateGamesId() });

      return acc;
    }, games);

  return totalGames;
};

export default generateGames;
