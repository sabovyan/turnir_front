import { Participant, Player, PlayerWithNameAndId } from '../types/main.types';
import { makeFakeId } from './makeId';

// const setPlayersForGamesAndSeedFakePlayers = (
//   players: Pick<Player, 'name' | 'id'>[],
//   gamesQuantity: number,
// ) => {
//   const generateFakeId = makeFakeId();

//   // player1: [player]

//   let copiedArray: Participant[] = players.map((player) => ({
//     name: player.name,
//   }));

//   const fakePlayer = {
//     name: '',
//   };

//   while (copiedArray.length / gamesQuantity < 2) {
//     copiedArray.push({ ...fakePlayer, players: [] });
//   }

//   return copiedArray;
// };

// export default setPlayersForGamesAndSeedFakePlayers;
