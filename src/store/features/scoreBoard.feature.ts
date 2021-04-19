import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import WinningSets from 'src/components/WinningSets/WinningSets';
import { Game, OnlyId } from 'src/types/main.types';

export interface IScore {
  left: number;
  right: number;
}

type VictoryCounterType = {
  left: number;
  right: number;
};

const countWinners = (acc: VictoryCounterType, { left, right }: IScore) => {
  if (left === -1 || right === -1) return acc;

  if (left > right) {
    acc.left += 1;
    return acc;
  }

  if (left === right) {
    // acc.left += 1;
    // acc.right += 1;
    return acc;
  }

  acc.right += 1;
  return acc;
};

export interface IScoreState {
  data: Game | undefined;
  open: boolean;
  sets: IScore[];
  winningPoints: number;
  hasWinner: boolean;
  winningSets: number;
  tournamentId: number;
}

const initialState: IScoreState = {
  data: undefined,
  open: false,
  sets: [],
  winningPoints: 7,
  hasWinner: false,
  winningSets: 1,
  tournamentId: 0,
};

const { reducer, actions } = createSlice({
  name: 'scoreBoard',
  initialState,
  reducers: {
    openScoreModal: (state, { payload }: PayloadAction<IScoreState>) => payload,
    closeScoreModal: (state) => initialState,
    setScore: (
      state,
      {
        payload: { idx, left, right },
      }: PayloadAction<{ idx: number; left?: number; right?: number }>,
    ) => {
      const score = state.sets[idx];
      if (left !== undefined && left >= 0) {
        score.left = left;
        if (left < state.winningPoints && score.right === -1) {
          score.right = state.winningPoints;
        }
      }

      if (right !== undefined && right >= 0) {
        score.right = right;
        if (right < state.winningPoints && score.left === -1) {
          score.left = state.winningPoints;
        }
      }

      const victoryQuantity = state.sets.reduce<VictoryCounterType>(
        countWinners,
        { left: 0, right: 0 },
      );

      console.log(victoryQuantity);

      const candidateScore =
        victoryQuantity.left > victoryQuantity.right
          ? victoryQuantity.left
          : victoryQuantity.left < victoryQuantity.right
          ? victoryQuantity.right
          : null;

      if (candidateScore && candidateScore >= state.winningSets) {
        state.hasWinner = true;
      } else {
        state.hasWinner = false;
      }

      console.log(candidateScore);

      if (
        victoryQuantity.left === victoryQuantity.right ||
        (candidateScore && candidateScore < state.winningSets)
      ) {
        const unregistered = state.sets.some(
          (set) => set.left === -1 || set.right === -1,
        );
        if (unregistered) return;

        const newSet: IScore = {
          left: -1,
          right: -1,
        };
        state.sets.push(newSet);
      } else {
        if (
          (victoryQuantity.left >= state.winningSets ||
            victoryQuantity.right >= state.winningSets) &&
          state.winningSets < state.sets.length
        ) {
          // state.hasWinner = true;
          const unregistered = state.sets.some(
            (set) => set.left === -1 || set.right === -1,
          );
          if (unregistered) {
            state.sets.pop();
          }
        }
      }
    },

    removeSet: (state, { payload: { id } }: PayloadAction<OnlyId>) => {
      state.sets = state.sets.filter((set, idx) => idx !== id);
    },
  },
});

export default reducer;

export const { openScoreModal, closeScoreModal, setScore, removeSet } = actions;
