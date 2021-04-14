import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Game } from 'src/types/main.types';

export interface IScore {
  left: number;
  right: number;
}

type VictoryCounterType = {
  left: number;
  right: number;
};

const countWinners = (acc: VictoryCounterType, { left, right }: IScore) => {
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
}

const initialState: IScoreState = {
  data: undefined,
  open: false,
  sets: [],
  winningPoints: 7,
  hasWinner: false,
  winningSets: 1,
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
      if (left) {
        score.left = left;
        if (left < state.winningPoints && score.right === -1) {
          score.right = state.winningPoints;
        }
      }

      if (right) {
        score.right = right;
        if (right < state.winningPoints && score.left === -1) {
          score.left = state.winningPoints;
        }
      }

      // const registeredSets = state.sets.filter(
      //   (set) => set.left > -1 && set.right > -1,
      // );

      // if (
      //   registeredSets.length !== state.sets.length ||
      //   !(registeredSets.length >= state.winningSets)
      // ) {
      //   return;
      // }

      const victoryQuantity = state.sets.reduce<VictoryCounterType>(
        countWinners,
        { left: 0, right: 0 },
      );

      console.log(victoryQuantity);

      if (victoryQuantity.left === victoryQuantity.right) {
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

      // if (registeredSets.length >= state.winningSets) {
      //   const victoryQuantity = registeredSets.reduce<VictoryCounterType>(
      //     countWinners,
      //     { left: 0, right: 0 },
      //   );

      //   console.log(victoryQuantity);

      //   if (victoryQuantity.left !== victoryQuantity.right) {
      //     if (
      //       victoryQuantity.left >= state.winningSets &&
      //       state.winningSets < state.sets.length
      //     ) {
      //       // state.hasWinner = true;
      //       state.sets.pop();
      //     }

      //     if (
      //       victoryQuantity.right >= state.winningSets &&
      //       state.winningSets < state.sets.length
      //     ) {
      //       // state.hasWinner = true;
      //       state.sets.pop();
      //     }
      //   }

      //   if (
      //     (victoryQuantity.left >= state.winningSets ||
      //       victoryQuantity.right >= state.winningSets) &&
      //     victoryQuantity.left !== victoryQuantity.right
      //   ) {
      //     state.hasWinner = true;
      //   } else {
      //     const newSet: IScore = {
      //       left: -1,
      //       right: -1,
      //     };
      //     state.sets.push(newSet);
      //   }
      // }
    },
  },
});

export default reducer;

export const { openScoreModal, closeScoreModal, setScore } = actions;
