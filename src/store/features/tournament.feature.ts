import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import tournamentService from 'src/services/tournament.service';
import {
  AsyncResponseStatus,
  ITournamentAllTogether,
  OnlyId,
  ReduxState,
  ThunkError,
} from 'src/types/main.types';

interface TournamentState extends ReduxState<ITournamentAllTogether | null> {
  scale: number;
  isFullScreen: boolean;
}

export const getTournamentById = createAsyncThunk<
  ITournamentAllTogether | undefined,
  OnlyId,
  { rejectValue: ThunkError }
>('tournaments/getById', async (data, thunkApi) => {
  try {
    const tournament = await tournamentService.getById(data);
    if (tournament) {
      const { rounds, ...t } = tournament;

      const final = rounds.find((round) => round.name === 'Final');
      const restRounds = rounds.filter((el) => el.name !== 'Final');

      const sortedRounds = restRounds.sort((a, b) =>
        b.name.localeCompare(a.name),
      );
      if (final) {
        sortedRounds.push(final);
      }

      return { ...t, rounds: sortedRounds };
    }
    return tournament;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.error as ThunkError);
  }
});

const initialState: TournamentState = {
  scale: 100,
  isFullScreen: false,
  data: null,
  error: null,
  status: AsyncResponseStatus.idle,
};

const { reducer, actions } = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setScale: (state, { payload }: PayloadAction<number>) => {
      state.scale = payload;
    },
    setFullScreen: (state, { payload }: PayloadAction<boolean>) => {
      state.isFullScreen = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTournamentById.pending, (state) => {
      state.status = AsyncResponseStatus.loading;
      state.error = null;
    });

    builder.addCase(getTournamentById.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.message;
        state.status = AsyncResponseStatus.rejected;
      }
    });

    builder.addCase(getTournamentById.fulfilled, (state, { payload }) => {
      if (payload) {
        state.data = payload;
        state.status = AsyncResponseStatus.fullfilled;
      }
    });
  },
});
export default reducer;

export const { setScale, setFullScreen } = actions;
