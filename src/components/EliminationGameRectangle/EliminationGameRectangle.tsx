import React from 'react';
import CButton from '../Buttons/CustomButton/CustomButton';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';

import styles from './EliminationGameRectangle.module.css';
import DigitBoard from '../DigitBoard/DigitBoard';
import { Button, ButtonGroup } from '@material-ui/core';

interface Props {
  player1: string;
  player2: string;
  isGameStarted: boolean;
}

const EliminationGameRectangle = ({
  player1,
  player2,
  isGameStarted,
}: Props) => {
  return (
    <div className={styles.eliminationGameWrapper}>
      <div className={styles.eliminationGameContainer}>
        <div>{player1}</div>

        {isGameStarted && <div style={{ alignSelf: 'flex-end' }}>vs</div>}
        <div>{player2}</div>
      </div>
      <div className={styles.enterResult}>
        <CButton
          text="Enter Result"
          cssStyles={{ padding: '5px 10px', fontSize: '12px' }}
          className={styles.enterResultButton}
        />
      </div>

      <CustomBackdrop open={true} zIndex={2}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#363636',
            color: 'white',
            padding: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <DigitBoard name={player1} />
            <div className={styles.scoreBoard}>
              <span>-</span>
              <span>:</span>
              <span>-</span>
            </div>
            <DigitBoard name={player2} />
          </div>
          <ButtonGroup style={{ color: 'white', alignSelf: 'flex-end' }}>
            <Button style={{ color: '#aaa' }}>Cancel</Button>
            <Button style={{ color: '#ddd' }}>Submit</Button>
          </ButtonGroup>
        </div>
      </CustomBackdrop>
    </div>
  );
};

export default EliminationGameRectangle;
