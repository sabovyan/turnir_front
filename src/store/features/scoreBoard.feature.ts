import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from 'src/types/main.types';

interface IState {
  data: Game | undefined;
  open: boolean;
}

const initialState: IState = {
  data: undefined,
  open: false,
};

const { reducer, actions } = createSlice({
  name: 'scoreBoard',
  initialState,
  reducers: {
    openScoreModal: (state, { payload }: PayloadAction<IState>) => payload,
    closeScoreModal: (state) => initialState,
  },
});

export default reducer;

export const { openScoreModal, closeScoreModal } = actions;
