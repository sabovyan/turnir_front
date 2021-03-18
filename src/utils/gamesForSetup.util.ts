import { SetupGame } from 'src/types/main.types';
import deepCopyArray from './deepCopy';
import generateGames from './generateGames';
import generateRounds from './generateRounds';

import setPlayersForGamesAndSeedFakePlayers from './preparePlayersAndSeedFakePlayers';

const getQuantityOfGamesForTheFirstRound = (n: number) => {
  return 2 ** Math.ceil(Math.log(n) / Math.log(2) - 1);
};

export const createSetupGamesAndPlayers = (
  players: { name: string }[],
  hasThirdPlaceGame: boolean,
) => {
  let playersCopy = deepCopyArray(players);

  const { length } = playersCopy;
  const quantityOfGamesForTheFirstRound = getQuantityOfGamesForTheFirstRound(
    length,
  );

  if (length / quantityOfGamesForTheFirstRound !== 2) {
    playersCopy = setPlayersForGamesAndSeedFakePlayers(
      playersCopy,
      quantityOfGamesForTheFirstRound,
    );
  }

  const games = generateGames(
    playersCopy,
    quantityOfGamesForTheFirstRound,
    hasThirdPlaceGame,
  );

  const quantityOfRounds = Math.log(playersCopy.length) / Math.log(2);

  const rounds = generateRounds(
    games,
    quantityOfGamesForTheFirstRound,
    quantityOfRounds,
  );

  return { games, players: playersCopy, rounds };
};
