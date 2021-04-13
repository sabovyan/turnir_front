import React from 'react';
import TournamentTopBar from 'src/components/TopBar/TournamentTopBar/TournamentTopBar';
import { TournamentType } from 'src/types/main.types';
import LSMRounds from './LSMRounds';

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
        }}
      />

      <LSMRounds />
    </div>
  );
};

export default Lsm;
