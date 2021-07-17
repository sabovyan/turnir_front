import { createSlice } from '@reduxjs/toolkit';
import { PlayerStatsConfig } from 'src/types/main.types';

type StatsState<T> = {
  data: T;
};

const initialState: StatsState<PlayerStatsConfig[]> = {
  data: [
    {
      name: 'Lives left',
      description:
        'Number of points divided by the number of played matches. All players that enter the tournament later or drop out early, will get a downrating. This will be indicated with a star.',
    },
    {
      name: 'Goal difference',
      description: 'Difference between goals scored and goals in',
    },
    {
      name: 'Match count',
      description: 'Number of matches played in tournament',
    },
  ],
};

const { reducer, actions } = createSlice({
  name: 'playerStats',
  initialState,
  reducers: {},
});

export default reducer;

export const {} = actions;
