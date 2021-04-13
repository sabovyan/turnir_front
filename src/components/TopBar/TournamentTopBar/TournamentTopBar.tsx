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
import UndoFullScreen from 'src/components/UndoFullScreen/UndoFullScreen';

interface Props {
  tournament: ITournamentAllTogether | undefined | null;
}

const TournamentTopBar = ({ tournament }: Props) => {
  const { scale, isFullScreen } = useSelector(
    (state: RootState) => state.tournament,
  );

  const dispatch = useDispatch();
  const handleSliderChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === 'number') {
      setTimeout(() => {
        dispatch(setScale(value));
      }, 0);
    }
  };

  const handleFullScreenIconClick = (event: MouseEvent<SVGSVGElement>) => {
    dispatch(setFullScreen(true));
  };

  if (!tournament) {
    return (
      <>
        <BasicTopBar>
          <BasicToolBar>
            <Typography variant="h5" noWrap color="textSecondary">
              ...
            </Typography>
          </BasicToolBar>
        </BasicTopBar>
      </>
    );
  }

  return (
    <>
      <BasicTopBar
        style={
          isFullScreen
            ? {
                transform: 'translateY(-89px)',
                transition: 'transform 200ms linear',
              }
            : {}
        }
      >
        <UndoFullScreen />
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
            {tournament.tournamentTypeId === TournamentType.elimination ? (
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
            ) : null}
            <FullscreenIcon
              style={{
                fontSize: '1.8rem',
                cursor: 'pointer',
              }}
              onClick={handleFullScreenIconClick}
            />
          </div>
        </BasicToolBar>
      </BasicTopBar>
    </>
  );
};

export default TournamentTopBar;
