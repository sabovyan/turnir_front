import { PlayerStatsConfig } from 'src/types/main.types';

const playerStatsConfig: PlayerStatsConfig[] = [
  {
    name: 'Lives left',
    description:
      'Number of points divided by the number of played matches. All players that enter the tournament later or drop out early, will get a downrating. This will be indicated with a star.',
  },
  {
    name: 'Average points',
    description: 'Number of points divided by the number of played matches.',
  },
  {
    name: 'Points',
    description:
      'Current number of points in tournament. Point for a won or draw game can be changed in settings.',
  },
  { name: 'Matches draw', description: 'Number of draw matches' },
  { name: 'Matches lost', description: 'Number of lost matches' },
  { name: 'Matches won', description: 'Number of won matches' },
  {
    name: 'Goal difference',
    description: 'Difference between goals scored and goals in',
  },
  { name: 'Goals in', description: 'Number of goals in' },
  { name: 'Goals', description: 'Number of goals scored' },
  {
    name: 'Match count',
    description: 'Number of matches played in tournament',
  },
];

export default playerStatsConfig;
