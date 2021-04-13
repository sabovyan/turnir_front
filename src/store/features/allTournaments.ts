import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import tournamentService from 'src/services/tournament.service';
import {
  AsyncResponseStatus,
  ITournamentAllTogether,
  OnlyId,
  ReduxState,
  ThunkError,
} from 'src/types/main.types';

export const getAllTournaments = createAsyncThunk<
  ITournamentAllTogether[] | undefined,
  OnlyId,
  { rejectValue: ThunkError }
>('tournaments/getAll', async (_, thunkApi) => {
  try {
    const tournaments = await tournamentService.getAll();
    return tournaments;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.error as ThunkError);
  }
});

const initialState: ReduxState<ITournamentAllTogether[]> = {
  data: [],
  error: null,
  status: AsyncResponseStatus.idle,
};

const { reducer, actions } = createSlice({
  name: 'allTournaments',
  initialState,
  reducers: {
    updateTournamentName: (
      state,
      { payload: { id, name } }: PayloadAction<{ id: number; name: string }>,
    ) => {
      console.log('here');

      state.data = state.data.map((tournament) =>
        tournament.id === id ? { ...tournament, name } : tournament,
      );
    },

    deleteTournamentById: (
      state,
      { payload: { id } }: PayloadAction<OnlyId>,
    ) => {
      state.data = state.data.filter((tournament) => tournament.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTournaments.pending, (state) => {
      state.status = AsyncResponseStatus.loading;
      state.error = null;
    });

    builder.addCase(getAllTournaments.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.message;
        state.status = AsyncResponseStatus.rejected;
      }
    });

    builder.addCase(getAllTournaments.fulfilled, (state, { payload }) => {
      if (payload) {
        state.data = payload;
        state.status = AsyncResponseStatus.fullfilled;
      }
    });
  },
});

export default reducer;

export const { updateTournamentName, deleteTournamentById } = actions;
