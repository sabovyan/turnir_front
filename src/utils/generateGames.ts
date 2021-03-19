import { SetupGame, PlayerWithNameAndId } from '../types/main.types';
import makeId from './makeId';

enum TURN {
  firstPlayer = 'FIRST_PLAYER',
  secondPlayer = 'SECOND_PLAYER',
}

const generateGames = (
  players: PlayerWithNameAndId[][],
  quantityOfGamesForTheFirstRound: number,
  hasThirdPlaceGame: boolean,
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
        participant1: {
          name: player[0].name,
          players: player,
        },
        id: generateGamesId(),
      };
      collected.push(newGame);
    }

    if (turn === TURN.secondPlayer) {
      collected[count].participant2 = { players: player, name: '' };
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

  if (hasThirdPlaceGame) {
    totalGames.push({ id: generateGamesId() });
  }

  return { totalGames: totalGames, firstRoundGames: games };
};

export default generateGames;
