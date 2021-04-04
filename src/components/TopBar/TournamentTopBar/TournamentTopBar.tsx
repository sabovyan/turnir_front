import React, { ChangeEvent, MouseEvent } from 'react';
import BasicToolBar from '../BasicToolBar/BasicToolBar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { ITournamentAllTogether, TournamentType } from 'src/types/main.types';
import { setFullScreen, setScale } from 'src/store/features/tournament.feature';
import { useDispatch, useSelector } from 'react-redux';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { RootState } from 'src/store/features';

interface Props {
  tournament: ITournamentAllTogether | undefined | null;
}

const TournamentTopBar = ({ tournament }: Props) => {
  const { scale } = useSelector((state: RootState) => state.tournament);

  const dispatch = useDispatch();
  const handleSliderChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === 'number') {
      setTimeout(() => {
        dispatch(setScale(value));
      }, 50);
    }
  };

  const handleFullScreenIconClick = (event: MouseEvent<SVGSVGElement>) => {
    dispatch(setFullScreen(true));
  };

  return (
    <BasicTopBar>
      <BasicToolBar>
        <Typography variant="h5" noWrap color="textSecondary">
          {tournament &&
          tournament.tournamentTypeId === TournamentType.elimination
            ? 'Elimination'
            : tournament &&
              tournament.tournamentTypeId === TournamentType.lastManStanding
            ? 'Last Man Standing'
            : tournament &&
              tournament.tournamentTypeId === TournamentType.roundRobin
            ? 'Round Robin'
            : '...'}
        </Typography>
        <div
          style={{
            margin: '1rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Slider
            aria-labelledby="change the scale of the tournament"
            value={scale}
            onChange={handleSliderChange}
            min={50}
            max={100}
            style={{
              width: '100px',
            }}
          />
          <FullscreenIcon
            style={{ fontSize: '1.8rem', cursor: 'pointer' }}
            onClick={handleFullScreenIconClick}
          />
        </div>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default TournamentTopBar;
