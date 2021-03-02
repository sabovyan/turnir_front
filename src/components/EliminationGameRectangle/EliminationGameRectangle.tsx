import React from 'react';
import CButton from '../Buttons/CustomButton/CustomButton';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';

import styles from './EliminationGameRectangle.module.css';
import DigitBoard from '../DigitBoard/DigitBoard';
import { Button, ButtonGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface Props {
  player1: string;
  player2: string;
  isGameStarted: boolean;
  isEven: boolean;
  isFirstRound: boolean;
  isFinal: boolean;
  roundIndex: number;
}

const EliminationGameRectangle = ({
  player1,
  player2,
  isGameStarted,
  isEven,
  isFirstRound,
  isFinal,
  roundIndex,
}: Props) => {
  return (
    <div className={styles.eliminationGameWrapper}>
      <div className="backLine" style={{ display: 'flex' }}>
        <div
          style={{
            width: '1px',
            height: '100px',
            background: !isFirstRound ? 'green' : 'none',
          }}
        ></div>
        <div
          style={{
            width: '49px',
            height: '1px',
            background: !isFirstRound ? 'green' : 'none',
            transform: 'translate(0px,50px)',
          }}
        ></div>
      </div>

      <div className={styles.eliminationGameContainer}>
        <div>
          <Typography
            style={{ maxHeight: '20px', minHeight: '20px', fontSize: '10px' }}
            variant="body2"
          >
            {player1}
          </Typography>

          <Typography
            style={{
              alignSelf: 'flex-end',
              minHeight: '20px',
              fontSize: '10px',
            }}
          >
            {isGameStarted && 'vs'}
          </Typography>

          <Typography style={{ minHeight: '20px', fontSize: '10px' }}>
            {player2}
          </Typography>
        </div>
        <div className={styles.enterResult}>
          <CButton
            text="Enter Result"
            cssStyles={{ padding: '5px 10px', fontSize: '12px' }}
            className={styles.enterResultButton}
          />
        </div>
      </div>
      <div className="frontLines" style={{ display: 'flex' }}>
        <div
          style={{
            width: '50px',
            height: '1px',
            background: !isFinal ? 'none' : 'red',
            transform: isEven
              ? `translate(0, ${((roundIndex + 1) * 50) / 2}px)`
              : `translate(0, ${((roundIndex + 1) * 50) / 2}px)`,
          }}
        ></div>
        <div
          style={{
            width: '1px',
            height: `${(roundIndex + 1) * 50}px`,
            background: !isFinal ? 'none' : 'green',
            transform: isEven
              ? `translate(0, -${((roundIndex + 1) * 50) / 2}px)`
              : `translate(0, ${((roundIndex + 1) * 50) / 2}px)`,
          }}
        ></div>
      </div>

      <CustomBackdrop open={false} zIndex={2}>
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
