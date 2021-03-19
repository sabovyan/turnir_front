import { PlayerWithNameAndId } from 'src/types/main.types';
// import deepCopyArray from './deepCopy';
// import generateGames from './generateGames';
// import generateRounds from './generateRounds';

// import setPlayersForGamesAndSeedFakePlayers from './preparePlayersAndSeedFakePlayers';

// const getQuantityOfGamesForTheFirstRound = (n: number) => {
//   return 2 ** Math.ceil(Math.log(n) / Math.log(2) - 1);
// };

// export const createSetupGamesAndPlayers = (
//   players: { name: string }[],
//   hasThirdPlaceGame: boolean,
// ) => {
//   let playersCopy = deepCopyArray(players);
//   let preparedPlayers: PlayerWithNameAndId[][] = [[]];

//   const { length } = playersCopy;
//   const quantityOfGamesForTheFirstRound = getQuantityOfGamesForTheFirstRound(
//     length,
//   );

//   if (length / quantityOfGamesForTheFirstRound !== 2) {
//     // preparedPlayers = setPlayersForGamesAndSeedFakePlayers(
//     //   playersCopy,
//     //   quantityOfGamesForTheFirstRound,
//     // );
//   }

//   const { firstRoundGames, totalGames } = generateGames(
//     preparedPlayers,
//     quantityOfGamesForTheFirstRound,
//     hasThirdPlaceGame,
//   );

//   const quantityOfRounds = Math.log(preparedPlayers.length) / Math.log(2);

//   const rounds = generateRounds(
//     totalGames,
//     quantityOfGamesForTheFirstRound,
//     quantityOfRounds,
//   );

//   return {
//     games: totalGames,
//     players: playersCopy,
//     rounds,
//     firstRoundGames,
//   };
// };

// eslint-disable-next-line import/no-anonymous-default-export

export default {};
