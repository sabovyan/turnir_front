import React, { useState } from 'react';
import CButton from '../common/Buttons/CustomButton/CustomButton';
import Backdrop from 'src/components/common/Backdrop/Backdrop';

import styles from './EliminationGameRectangle.module.css';
import DigitBoard from '../DigitBoard/DigitBoard';
import { Button, ButtonGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import colors from '../../styles/colors';

interface Props {
  player1: string;
  player2: string;
  isGameStarted: boolean;
  isEven: boolean;
  isFirstRound: boolean;
  isFinal: boolean;
  maxHeight: number;
  numberOfGamesInOneRound: number;
  label?: string;
}

const EliminationGameRectangle = ({
  player1,
  player2,
  isGameStarted,
  isEven,
  isFirstRound,
  isFinal,
  maxHeight,
  numberOfGamesInOneRound,
  label,
}: Props) => {
  const [isResultOpen, setIsResultOpen] = useState(false);

  const handleResultPageClose = (event: any) => {
    if (event.target.dataset.closeable === 'true') {
      setIsResultOpen((state) => !state);
    }
  };
  const handleResultPageOpen = () => {
    setIsResultOpen((state) => !state);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography align="center" color="textSecondary">
        {label}
      </Typography>
      <div className={styles.eliminationGameWrapper}>
        <div className="backLine" style={{ display: 'flex' }}>
          <div
            style={{
              width: '49px',
              height: '2px',
              background: !isFirstRound ? colors.backdropColor : 'none',
              transform: 'translate(0px, 0)',
            }}
          ></div>
        </div>

        <div className={styles.eliminationGameContainer}>
          {player1 && player2 ? (
            <>
              <Typography className={styles.gameText}>{player1}</Typography>

              <Typography
                className={styles.gameText}
                style={{
                  alignSelf: 'flex-end',
                }}
              >
                {isGameStarted && 'vs'}
              </Typography>

              <Typography className={styles.gameText}>{player2}</Typography>
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
              cssStyles={{ padding: '5px 10px', fontSize: '12px' }}
              className={styles.enterResultButton}
              onClick={handleResultPageOpen}
            />
          </div>
        </div>
        <div
          className="frontLine"
          style={{
            display: 'flex',
            transform: `translate(0, ${
              maxHeight / numberOfGamesInOneRound / 4
            }px)`,
          }}
        >
          <div
            style={{
              width: '50px',
              height: '2px',
              background: !isFinal ? 'none' : colors.backdropColor,
            }}
          />
          <div
            style={{
              width: '2px',
              height: `${maxHeight / numberOfGamesInOneRound / 2 + 2}px`,
              background: !isFinal ? 'none' : colors.backdropColor,
              transform: isEven
                ? `translate(0, -${maxHeight / numberOfGamesInOneRound / 2}px)`
                : `translate(0, ${0}px)`,
            }}
          />
        </div>

        <Backdrop
          open={isResultOpen}
          zIndex={2}
          onClick={handleResultPageClose}
          data-closeable="true"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
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
              {/* <div className={styles.scoreBoard}>
                <span>-</span>
                <span>:</span>
                <span>-</span>
              </div> */}
              {/* <DigitBoard name={player2} /> */}
            </div>
            <ButtonGroup style={{ color: 'white', alignSelf: 'flex-end' }}>
              <Button style={{ color: '#aaa' }}>Cancel</Button>
              <Button style={{ color: '#ddd' }}>Submit</Button>
            </ButtonGroup>
          </div>
        </Backdrop>
      </div>
    </div>
  );
};

export default EliminationGameRectangle;
