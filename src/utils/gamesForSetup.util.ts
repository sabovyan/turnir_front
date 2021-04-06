import { Game, Participant } from 'src/types/main.types';
import createSingleGame from './CreateSingleGame';
import deepCopyArray from './deepCopy';
import generateFirstRoundGames from './generateFirstRoundGames';
import { generateListFromTree } from './generateListFromTree';
import generateRounds from './generateRounds';

import seedFakePlayers from './preparePlayersAndSeedFakePlayers';

export interface Tree {
  game: Game;
  first?: Tree;
  second?: Tree;
}

const getFirstRoundGamesQuantity = (n: number) => {
  return 2 ** Math.ceil(Math.log(n) / Math.log(2) - 1);
};

export const createSetupGamesAndPlayers = (
  participants: Participant[],
  hasThirdPlaceGame: boolean,
) => {
  let participantsCopy = deepCopyArray<Participant>(participants);

  const { length } = participantsCopy;

  const firstRoundGamesQuantity = getFirstRoundGamesQuantity(length);

  if (length / firstRoundGamesQuantity !== 2) {
    participantsCopy = seedFakePlayers(
      participantsCopy,
      firstRoundGamesQuantity,
    );
  }

  const firstRoundGames = generateFirstRoundGames(
    firstRoundGamesQuantity,
    participantsCopy,
  );

  const firstRoundGamesCopy = deepCopyArray(firstRoundGames);

  const numberOfRounds = Math.log(firstRoundGamesQuantity) / Math.log(2) + 1;

  const createGames = (nextGameId: number | null, remainingRounds: number) => {
    let game;
    if (remainingRounds === 1) {
      const s = firstRoundGamesCopy.splice(0, 1)[0];

      game = createSingleGame({
        nextGameId,
        participants: {
          participant1: s.participant1,
          participant2: s.participant2,
        },
      });
      return { game };
    }

    game = createSingleGame({ nextGameId, participants: {} });

    const first = createGames(game.id, remainingRounds - 1);
    const second = createGames(game.id, remainingRounds - 1);
    const root: Tree = {
      game,
      first,
      second,
    };

    return root;
  };

  const gamesTree = createGames(null, numberOfRounds);

  const listOfGames = generateListFromTree(gamesTree);

  const quantityOfRounds = Math.log(participantsCopy.length) / Math.log(2);
  const rounds = generateRounds(
    listOfGames,
    firstRoundGamesQuantity,
    quantityOfRounds,
  );

  return {
    games: listOfGames,
    firstRoundGames,
    participants: participantsCopy,
    rounds: rounds.reverse(),
  };
};
