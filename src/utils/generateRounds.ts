import { DraftRound, Game } from '../types/main.types';

const generateRounds = (
  games: Game[],
  quantityOfGamesForTheFirstRound: number,
  quantityOfRounds: number,
) => {
  const copy: Game[] = JSON.parse(JSON.stringify(games));

  let gamesQuantityPerRound = 1;

  const rounds = Array.from({ length: quantityOfRounds })
    .fill({})
    .reduce<DraftRound[]>((acc) => {
      const round = {
        name:
          gamesQuantityPerRound > 1
            ? `1/${gamesQuantityPerRound} Finals`
            : 'Final',
        games: copy.splice(0, gamesQuantityPerRound),
      };

      gamesQuantityPerRound *= 2;
      acc.push(round);

      return acc;
    }, []);

  return rounds;
};

export default generateRounds;
