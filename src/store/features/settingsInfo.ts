import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { createSides, sortParticipants } from 'src/utils/Dyp.utils';
import pipe from 'src/utils/pipe';
import {
  ArrangedParticipants,
  Participant,
  PlayersType,
  PreParticipant,
  Side,
  TournamentType,
} from '../../types/main.types';

type tournamentSettings = {
  tables: number;
  goalsToWin: number;
  winningSets: number;
  tournamentType: TournamentType;
  playerType: PlayersType;
  participants: PreParticipant[];
  hasManualCombiner: boolean;
  sides: ArrangedParticipants;
};

const initialState: tournamentSettings = {
  tournamentType: TournamentType.none,
  playerType: PlayersType.none,
  hasManualCombiner: false,
  winningSets: 1,
  goalsToWin: 7,
  tables: 1,
  participants: [],
  // participants: [
  //   { name: 'alpha', players: [{ id: 0 }], side: Side.neutral },
  //   { name: 'betta', players: [{ id: 1 }, { id: 2 }], side: Side.neutral },
  //   { name: 'gamma', players: [{ id: 3 }], side: Side.neutral },
  //   { name: 'delta', players: [{ id: 4 }], side: Side.neutral },
  //   { name: 'epsilon', players: [{ id: 5 }], side: Side.neutral },
  //   { name: 'zeta', players: [{ id: 6 }], side: Side.neutral },
  //   { name: 'eta', players: [{ id: 7 }], side: Side.neutral },
  //   { name: 'theta', players: [{ id: 8 }], side: Side.neutral },
  //   { name: 'iota', players: [{ id: 9 }], side: Side.neutral },
  //   { name: 'kappa', players: [{ id: 10 }], side: Side.neutral },
  //   { name: 'lambda', players: [{ id: 11 }], side: Side.neutral },
  //   { name: 'mu', players: [{ id: 12 }], side: Side.neutral },
  //   { name: 'nu', players: [{ id: 13 }], side: Side.neutral },
  // ],
  sides: {
    left: [],
    right: [],
  },
};

const { reducer, actions } = createSlice({
  name: 'settingsInfo',
  initialState,
  reducers: {
    setTablesQuantity: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'tables'>>,
    ) => {
      state.tables = payload.tables;
    },

    setGoalsQuantity: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'goalsToWin'>>,
    ) => {
      state.goalsToWin = payload.goalsToWin;
    },

    setWinningSets: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'winningSets'>>,
    ) => {
      state.winningSets = payload.winningSets;
    },

    setTournamentType: (
      state,
      { payload }: PayloadAction<Pick<tournamentSettings, 'tournamentType'>>,
    ) => {
      state.tournamentType = payload.tournamentType;
    },

    setTournamentParticipants: (
      state,
      {
        payload: { players },
      }: PayloadAction<{ players: { name: string; id: number }[] }>,
    ) => {
      state.participants = players.map(({ name, id }) => ({
        name,
        players: [
          {
            id,
          },
        ],
        side: Side.neutral,
      }));
    },

    deletePlayerFromTournament: (
      state,
      { payload: { name } }: PayloadAction<{ name: string }>,
    ) => {
      state.participants = state.participants.filter(
        (Participant) => Participant.name !== name,
      );
    },

    addNewPlayerToTournament: (
      state,
      { payload }: PayloadAction<Participant>,
    ) => {
      state.participants = [
        ...state.participants,
        { ...payload, side: Side.neutral },
      ];
    },

    changePlayerType: (state, { payload }: PayloadAction<PlayersType>) => {
      state.playerType = payload;
    },

    changePlayersSideStatus: (
      state,
      { payload: { name, side } }: PayloadAction<{ name: string; side: Side }>,
    ) => {
      const s = state.participants.map((Participant) =>
        Participant.name === name ? { ...Participant, side } : Participant,
      );
      const foundPlayer = state.participants.find((part) => part.name === name);

      if (!foundPlayer) return;

      if (side === Side.left) {
        state.sides.left.push(foundPlayer);
      }

      if (side === Side.right) {
        state.sides.right.push(foundPlayer);
      }

      state.participants = s;
    },

    changeManualSetPlayersStatus: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.hasManualCombiner = payload;
    },

    arrangeParticipantsInTwoArrays: (state) => {
      // const sides: ArrangedParticipants = pipe(
      //   state.participants,
      //   sortParticipants,
      //   createSides,
      // );

      let isLeft = true;

      let leftCounter = 0;
      let rightCounter = 0;

      state.participants.forEach((p) => {
        if (p.side === Side.left) {
          leftCounter += 1;
        }

        if (p.side === Side.right) {
          rightCounter += 1;
        }
      });

      state.participants = state.participants.map((p) => {
        if (p.side !== Side.neutral) return p;

        isLeft = leftCounter > rightCounter ? false : true;

        if (isLeft) {
          p.side = Side.left;
          leftCounter += 1;
          return p;
        }

        p.side = Side.right;
        rightCounter += 1;

        return p;
      });

      let participantIndex = state.participants.length - 1;

      while (leftCounter !== rightCounter) {
        if (leftCounter > rightCounter) {
          if (state.participants[participantIndex].side === Side.left) {
            state.participants[participantIndex].side = Side.right;
            rightCounter += 1;
            leftCounter -= 1;
          }
        } else if (leftCounter < rightCounter) {
          if (state.participants[participantIndex].side === Side.right) {
            state.participants[participantIndex].side = Side.left;
            leftCounter += 1;
            rightCounter -= 1;
          }
        }

        participantIndex -= 1;
      }
    },

    swapParticipants: (
      state,
      {
        payload: { currentIndex, foundIndex, side },
      }: PayloadAction<{
        currentIndex: number;
        foundIndex: number;
        side: Side;
      }>,
    ) => {
      // const temp = state.participants[foundIndex].side;
      // state.participants[foundIndex].side = side;
      // state.participants[currentIndex].side = temp;

      const wantedSide = state.participants[foundIndex].side;

      state.participants[foundIndex].side = side;

      state.participants[currentIndex].side = wantedSide;

      // const temp = state.participants[currentIndex];
      // state.participants[currentIndex] = state.participants[foundIndex];
      // state.participants[currentIndex].side = side;
      // state.participants[foundIndex] = temp;
      // state.participants[foundIndex].side = temp.side;
      // console.log(participants);
    },

    reArrangeSides: (
      state,
      { payload: { name, side } }: PayloadAction<{ name: string; side: Side }>,
    ) => {
      state.participants = state.participants.map((part) =>
        part.name === name ? { ...part, side } : part,
      );

      // state.sides =

      // let targetedParticipant = state.sides.left.find(
      //   (part) => part.name === name,
      // );

      // if (!targetedParticipant) {
      //   targetedParticipant = state.sides.right.find(
      //     (part) => part.name === name,
      //   );

      //   let targetIndex = state.sides.right.findIndex((part) => part.name);

      //   state.sides.right[targetIndex] = currentParticipant;
      // }
    },
  },
});

export const {
  setTablesQuantity,
  setTournamentType,
  setTournamentParticipants,
  setGoalsQuantity,
  setWinningSets,
  deletePlayerFromTournament,
  addNewPlayerToTournament,
  changePlayerType,
  changePlayersSideStatus,
  changeManualSetPlayersStatus,
  arrangeParticipantsInTwoArrays,
  swapParticipants,
} = actions;
export default reducer;
