import { Game } from 'src/types/main.types';

const addMissingGames = (
  missingGamesQuantity: number,
  generateGamesId: () => number,
  games: Game[],
) => {
  const localGames = JSON.parse(JSON.stringify(games));

  const totalGames = Array(missingGamesQuantity)
    .fill({})
    .reduce<Game[]>((acc) => {
      acc.push({
        id: generateGamesId(),
        firstParticipantScore: [],
        nextGameId: null,
        roundId: null,
        secondParticipantScore: [],
        thirdPlaceGameId: null,
        nextGamePosition: 1,
      });

      return acc;
    }, localGames);
  return totalGames;
};

export default addMissingGames;