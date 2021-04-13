import React, { MouseEvent } from 'react';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { useDispatch, useSelector } from 'react-redux';
import { setFullScreen } from 'src/store/features/tournament.feature';
import { RootState } from 'src/store/features';

import styles from './UndoFullScreen.module.css';

interface Props {}

const UndoFullScreen = (props: Props) => {
  const { isFullScreen } = useSelector((state: RootState) => state.tournament);

  const dispatch = useDispatch();

  const handleFullScreenIconClick = (event: MouseEvent<SVGSVGElement>) => {
    dispatch(setFullScreen(false));
  };

  return (
    <div
      className={styles.undoFullScreen}
      style={{
        transform: isFullScreen ? 'translateY(89px)' : 'translateY(-200px)',
        transition: !isFullScreen ? 'none' : `transform 200ms linear 200ms`,
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
