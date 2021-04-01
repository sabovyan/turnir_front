import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countLeftAndRightSides } from 'src/utils/Dyp.utils';
import {
  ArrangedParticipants,
  Participant,
  PlayersType,
  Side,
  TournamentType,
} from '../../types/main.types';

type tournamentSettings = {
  tables: number;
  goalsToWin: number;
  winningSets: number;
  tournamentType: TournamentType;
  playerType: PlayersType;
  draftParticipants: Participant[];
  participants: Participant[];
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
  draftParticipants: [],
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
      state.draftParticipants = players.map(({ name, id }) => ({
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
      state.draftParticipants = state.draftParticipants.filter(
        (Participant) => Participant.name !== name,
      );
    },

    addNewPlayerToTournament: (
      state,
      { payload }: PayloadAction<Participant>,
    ) => {
      state.draftParticipants = [
        ...state.draftParticipants,
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
      const s = state.draftParticipants.map((participant) =>
        participant.name === name ? { ...participant, side } : participant,
      );
      const foundPlayer = state.draftParticipants.find(
        (part) => part.name === name,
      );

      if (!foundPlayer) return;

      if (side === Side.left) {
        state.sides.left.push(foundPlayer);
      }

      if (side === Side.right) {
        state.sides.right.push(foundPlayer);
      }

      state.draftParticipants = s;
    },

    changeManualSetPlayersStatus: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.hasManualCombiner = payload;
    },

    arrangeParticipantsInTwoArrays: (state) => {
      let isLeft = true;

      let { leftCounter, rightCounter } = countLeftAndRightSides(
        state.draftParticipants,
      );

      state.draftParticipants = state.draftParticipants.map((p) => {
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

      let participantIndex = state.draftParticipants.length - 1;

      while (leftCounter !== rightCounter) {
        if (leftCounter > rightCounter) {
          if (state.draftParticipants[participantIndex].side === Side.left) {
            state.draftParticipants[participantIndex].side = Side.right;

            rightCounter += 1;
            leftCounter -= 1;
          }
        } else if (leftCounter < rightCounter) {
          if (state.draftParticipants[participantIndex].side === Side.right) {
            state.draftParticipants[participantIndex].side = Side.left;

            leftCounter += 1;
            rightCounter -= 1;
          }
        }

        participantIndex -= 1;
      }

      // state.participants = arrangeParticipants(state.participants);

      state.sides = state.draftParticipants.reduce<ArrangedParticipants>(
        (acc, p) => {
          if (p.side === Side.left) {
            acc.left.push(p);
          } else {
            acc.right.push(p);
          }
          return acc;
        },
        { left: [], right: [] },
      );

      state.participants = state.sides.left.reduce<Participant[]>(
        (acc, participant, idx) => {
          const a = state.sides.right[idx];

          const pairedParticipant: Participant = {
            name: `${participant.name} / ${a.name}`,
            players: participant.players.concat(a.players),
            side: Side.neutral,
          };

          acc.push(pairedParticipant);

          return acc;
        },
        [],
      );
    },

    swapParticipants: (
      state,
      {
        payload: { currentParticipant, foundParticipant },
      }: PayloadAction<{
        currentParticipant: Participant;
        foundParticipant: Participant;
      }>,
    ) => {
      const currentParticipantSide = currentParticipant.side;
      const foundParticipantSide = foundParticipant.side;

      state.draftParticipants = state.draftParticipants.map((p) =>
        p.name === currentParticipant.name
          ? { ...p, side: foundParticipantSide }
          : p.name === foundParticipant.name
          ? { ...p, side: currentParticipantSide }
          : p,
      );

      state.sides = {
        left: state.sides.left.map((p) =>
          p.name === currentParticipant.name
            ? { ...foundParticipant, side: Side.left }
            : p.name === foundParticipant.name
            ? { ...currentParticipant, side: Side.left }
            : p,
        ),
        right: state.sides.right.map((p) =>
          p.name === currentParticipant.name
            ? { ...foundParticipant, side: Side.right }
            : p.name === foundParticipant.name
            ? { ...currentParticipant, side: Side.right }
            : p,
        ),
      };
    },

    pairParticipants: (state) => {
      state.participants = state.sides.left.reduce<Participant[]>(
        (acc, participant, idx) => {
          const a = state.sides.right[idx];

          const pairedParticipant: Participant = {
            name: `${participant.name} / ${a.name}`,
            players: participant.players.concat(a.players),
            side: Side.neutral,
          };

          acc.push(pairedParticipant);

          return acc;
        },
        [],
      );
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
  pairParticipants,
} = actions;
export default reducer;
