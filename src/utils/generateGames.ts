import { Participant } from '../types/main.types';
import addMissingGames from './addMissingGames';
import generateFirstRoundGames from './generateFirstRoundGames';
import makeId from './makeId';

const generateGames = (
  participants: Participant[],
  quantityOfFirstRoundGames: number,
  hasThirdPlaceGame: boolean,
) => {
  const generateGamesId = makeId();

  const firstRoundGames = generateFirstRoundGames(
    quantityOfFirstRoundGames,
    participants,
    generateGamesId,
  );

  const gamesTotalQuantity = participants.length - 1;
  const missingGamesQuantity = gamesTotalQuantity - quantityOfFirstRoundGames;

  const totalGames = addMissingGames(
    missingGamesQuantity,
    generateGamesId,
    firstRoundGames,
  );

  if (hasThirdPlaceGame) {
    totalGames.push({
      id: generateGamesId(),
      firstParticipantScore: [],
      secondParticipantScore: [],
      nextGameId: null,
      roundId: null,
      thirdPlaceGameId: null,
      nextGamePosition: 1,
    });
  }

  return { totalGames: totalGames, firstRoundGames };
};

export default generateGames;
