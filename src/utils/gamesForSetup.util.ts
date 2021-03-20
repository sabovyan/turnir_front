import { Participant } from 'src/types/main.types';
import deepCopyArray from './deepCopy';
import generateGames from './generateGames';
import generateRounds from './generateRounds';

import seedFakePlayers from './preparePlayersAndSeedFakePlayers';

const getQuantityOfGamesForTheFirstRound = (n: number) => {
  return 2 ** Math.ceil(Math.log(n) / Math.log(2) - 1);
};

export const createSetupGamesAndPlayers = (
  participants: Participant[],
  hasThirdPlaceGame: boolean,
) => {
  let participantsCopy = deepCopyArray<Participant>(participants);

  const { length } = participantsCopy;
  const quantityOfGamesForTheFirstRound = getQuantityOfGamesForTheFirstRound(
    length,
  );

  if (length / quantityOfGamesForTheFirstRound !== 2) {
    participantsCopy = seedFakePlayers(
      participantsCopy,
      quantityOfGamesForTheFirstRound,
    );
  }

  const { firstRoundGames, totalGames } = generateGames(
    participantsCopy,
    quantityOfGamesForTheFirstRound,
    hasThirdPlaceGame,
  );

  const quantityOfRounds = Math.log(participantsCopy.length) / Math.log(2);

  // const rounds = generateRounds(
  //   totalGames,
  //   quantityOfGamesForTheFirstRound,
  //   quantityOfRounds,
  // );

  return {
    participants: participantsCopy,
    games: totalGames,
    firstRoundGames,
    // rounds,
  };
};
