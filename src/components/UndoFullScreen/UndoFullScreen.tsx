import React, { MouseEvent } from 'react';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { useDispatch, useSelector } from 'react-redux';
import { setFullScreen } from 'src/store/features/tournament.feature';
import { RootState } from 'src/store/features';

interface Props {}

const UndoFullScreen = (props: Props) => {
  const { isFullScreen } = useSelector((state: RootState) => state.tournament);

  const dispatch = useDispatch();

  const handleFullScreenIconClick = (event: MouseEvent<SVGSVGElement>) => {
    dispatch(setFullScreen(false));
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '10px 1rem',
        margin: '1rem',
        boxShadow: '0 0 3px 1px #333131',
        transform: isFullScreen ? 'translateY(0)' : 'translateY(-100px)',

        transition: 'transform 200ms linear',
      }}
    >
      <FullscreenExitIcon
        style={{ fontSize: '1.8rem', cursor: 'pointer' }}
        onClick={handleFullScreenIconClick}
      />
    </div>
  );
};

export default UndoFullScreen;
