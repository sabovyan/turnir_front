import React from 'react';
import BasicToolBar from '../BasicToolBar/BasicToolBar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/features';
import { TournamentType } from 'src/types/main.types';

interface Props {}

const TournamentTopBar = (props: Props) => {
  const { tournament } = useSelector((state: RootState) => state);
  console.log(tournament);

  return (
    tournament && (
      <BasicTopBar>
        <BasicToolBar>
          <Typography variant="h5" noWrap color="textSecondary">
            {tournament.tournamentTypeId === TournamentType.elimination
              ? 'Elimination'
              : tournament.tournamentTypeId === TournamentType.lastManStanding
              ? 'Last Man Standing'
              : 'Round Robin'}
          </Typography>
        </BasicToolBar>
      </BasicTopBar>
    )
  );
};

export default TournamentTopBar;
