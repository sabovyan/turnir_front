import React from 'react';
import PlayerStatsHeader from './PlayerStatsHeader';
import PlayerStatsTable from './PlayerStatsTable';

interface Props {}

const PlayerStats = (props: Props) => {
  return (
    <div
      style={{
        minWidth: 400,
        position: 'relative',
      }}
    >
      <PlayerStatsHeader />
      <PlayerStatsTable />
    </div>
  );
};

export default PlayerStats;
