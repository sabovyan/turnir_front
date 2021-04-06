import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './EliminationGameRectangle.module.css';
import { CButton } from '../common/Buttons';

interface Props {
  player1: string | undefined;
  player2: string | undefined;
  isGameStarted: boolean;
  handleResultPageOpen: () => void;
}

const GameContainer = ({
  player1,
  player2,
  isGameStarted,
  handleResultPageOpen,
}: Props) => {
  return (
    <div className={styles.eliminationGameContainer}>
      {player1 && player2 ? (
        <>
          <Typography className={styles.gameText} style={{ fontWeight: 500 }}>
            {player1}
          </Typography>

          <Typography
            className={styles.gameText}
            style={{
              alignSelf: 'flex-end',

              fontWeight: 500,
            }}
          >
            {isGameStarted && 'vs'}
          </Typography>

          <Typography className={styles.gameText} style={{ fontWeight: 500 }}>
            {player2}
          </Typography>
        </>
      ) : (
        <Typography className={styles.gameWithOnePlayer}>
          {player1 ? player1 : player2 ? player2 : ''}
        </Typography>
      )}

      <div
        className={styles.enterResult}
        style={{ display: isGameStarted ? 'flex' : 'none' }}
      >
        <CButton
          text="Enter Result"
          cssStyles={{ padding: '5px 10px' }}
          className={styles.enterResultButton}
          onClick={handleResultPageOpen}
        />
      </div>
    </div>
  );
};

export default GameContainer;
