import { Game, SetupRound } from '../types/main.types';

const generateRounds = (
  games: Game[],
  quantityOfGamesForTheFirstRound: number,
  quantityOfRounds: number,
) => {
  const copiedGames: Game[] = JSON.parse(JSON.stringify(games));

  let gamesQuantity = quantityOfGamesForTheFirstRound;

  const rounds = Array(quantityOfRounds)
    .fill([])
    .reduce<SetupRound[]>((acc) => {
      if (gamesQuantity <= 1) {
        const round = {
          games: copiedGames,
          name: gamesQuantity > 1 ? `1/${gamesQuantity} Finals` : 'Final',
        };

        acc.push(round);
        return acc;
      }

      const round = {
        games: copiedGames.filter((_, idx) => idx < gamesQuantity),
        name: gamesQuantity > 1 ? `1/${gamesQuantity} Finals` : 'Final',
      };

      copiedGames.splice(0, gamesQuantity);
      acc.push(round);
      gamesQuantity = gamesQuantity / 2;
      return acc;
    }, []);

  return rounds;
};

export default generateRounds;
