import React from 'react';
import TournamentTopBar from 'src/components/TopBar/TournamentTopBar/TournamentTopBar';
import { TournamentType } from 'src/types/main.types';
import LSMRounds from './LMSRounds';
import PlayerStats from './PlayerStats/PlayerStats';

interface Props {}

const Lsm = (props: Props) => {
  return (
    <div>
      <TournamentTopBar
        tournament={{
          createdAt: 'qw',
          goalsToWin: 7,
          id: 0,
          name: 'new',
          rounds: [],
          tournamentTypeId: TournamentType.lastManStanding,
          userId: 1,
          winningSets: 7,
          completionStatus: false,
        }}
      />

      <div style={{ display: 'flex', margin: 16, gap: '1rem' }}>
        <LSMRounds />
        <PlayerStats />
      </div>
    </div>
  );
};

export default Lsm;
