import { Game, Participant, Side } from 'src/types/main.types';
import createSingleGame from './CreateSingleGame';

enum TURN {
  first = 'FIRST_PLAYER',
  second = 'SECOND_PLAYER',
}

// const generateFirstRoundGames = (
//   quantityOfFirstRoundGames: number,
//   participants: Participant[],
//   generateGamesId: () => number,
// ) => {
//   let count = 0;
//   let turn = TURN.first;

//   const games = participants.reduce<Game[]>((collected, participant) => {
//     if (count === quantityOfFirstRoundGames) {
//       count = 0;
//       turn = TURN.second;
//     }
//     if (turn === TURN.first) {
//       const newGame: Game = {
//         participant1: participant,
//         id: generateGamesId(),
//         firstParticipantScore: [],
//         nextGameId: null,
//         roundId: null,
//         secondParticipantScore: [],
//         thirdPlaceGameId: null,
//         nextGamePosition: 1,
//       };
//       collected.push(newGame);
//     }

//     if (turn === TURN.second) {
//       collected[count].participant2 = participant;
//     }

//     count += 1;

//     return collected;
//   }, []);

//   return games;
// };

const participants = [
  { name: 'alpha', players: [{ id: 0 }], side: Side.neutral },
  { name: 'betta', players: [{ id: 1 }, { id: 2 }], side: Side.neutral },
  { name: 'gamma', players: [{ id: 3 }], side: Side.neutral },
  { name: 'delta', players: [{ id: 4 }], side: Side.neutral },
  { name: 'epsilon', players: [{ id: 5 }], side: Side.neutral },
  { name: 'zeta', players: [{ id: 6 }], side: Side.neutral },
  { name: 'eta', players: [{ id: 7 }], side: Side.neutral },
  { name: 'theta', players: [{ id: 8 }], side: Side.neutral },
  // { name: 'iota', players: [{ id: 9 }], side: Side.neutral },
  // { name: 'kappa', players: [{ id: 10 }], side: Side.neutral },
  // { name: 'lambda', players: [{ id: 11 }], side: Side.neutral },
  // { name: 'mu', players: [{ id: 12 }], side: Side.neutral },
  // { name: 'nu', players: [{ id: 13 }], side: Side.neutral },
];

const generateFirstRoundGames = (
  firstRoundGamesQuantity: number,
  participants: Participant[],
) => {
  let count = 0;
  let turn = TURN.first;

  console.log(participants);

  const games = participants.reduce<Game[]>((collected, participant) => {
    if (count === firstRoundGamesQuantity) {
      count = 0;
      turn = TURN.second;
    }
    if (turn === TURN.first) {
      const newGame = createSingleGame({
        nextGameId: null,
        participants: {
          participant1: participant,
        },
      });

      collected.push(newGame);
    }

    if (turn === TURN.second) {
      collected[count].participant2 = participant;
    }

    count += 1;

    return collected;
  }, []);

  return games;
};

export default generateFirstRoundGames;
