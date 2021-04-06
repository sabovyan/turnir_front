import React, { useState } from 'react';
import CButton from '../common/Buttons/CustomButton/CustomButton';
import Backdrop from 'src/components/common/Backdrop/Backdrop';

import styles from './EliminationGameRectangle.module.css';
import DigitBoard from '../DigitBoard/DigitBoard';
import { Button, ButtonGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Colors from '../../styles/colors';
import { Game } from 'src/types/main.types';
import GameBackLine from './GameBackLine';
import GameFrontLine from './GameFrontLine';
import gameUiDetails from 'src/constants/gameUiDetails';
import GameContainer from './GameContainer';

interface Props {
  // isEven: boolean;
  // isFirstRound: boolean;
  // maxHeight: number;
  // numberOfGamesInOneRound: number;
  isGameStarted: boolean;
  game: Game;
  gameIndex: number;
  roundIndex: number;
  isFinal: boolean;
  roundHeight: number;
  totalGames: number;
}

const EliminationSingleGame = ({
  game,
  gameIndex,
  roundIndex,
  isFinal,
  roundHeight,
  totalGames,
  isGameStarted,
}: Props) => {
  const [isResultOpen, setIsResultOpen] = useState(false);

  const isEven = gameIndex % 2 === 0 ? false : true;
  const isFirstRound = roundIndex === 0 ? true : false;

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
      <div className={styles.eliminationGameWrapper}>
        <GameBackLine isFirstRound={isFirstRound} />
        {/* <div className={styles.eliminationGameContainer} /> */}
        <GameContainer
          isGameStarted={isGameStarted}
          player1={game.participant1?.name}
          player2={game.participant2?.name}
          handleResultPageOpen={handleResultPageOpen}
        />
        <GameFrontLine
          toDown={isEven}
          width={gameUiDetails.widthOfLines}
          height={roundHeight / totalGames + 20 * (roundIndex + 1)}
          isColored={isFinal}
        />
      </div>
      <Backdrop
        open={isResultOpen}
        zIndex={2}
        onClick={handleResultPageClose}
        data-closeable="true"
        cssStyles={{ position: 'fixed', top: 0, left: 0, width: '100vw' }}
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
            <DigitBoard
              name={game.participant1 ? game.participant1.name : undefined}
            />
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
      {/* 
      <Typography align="center" color="textSecondary">
        {label}
      </Typography>
      <div className={styles.eliminationGameWrapper}>
        <div className="backLine" style={{ display: 'flex' }}>
          <div
            style={{
              width: '30px',
              height: '2px',
              background: !isFirstRound ? colors.backdropColor : 'none',
              transform: 'translate(0px, 0)',
            }}
          ></div>
        </div>

        <div className={styles.eliminationGameContainer}>
          {player1 && player2 ? (
            <>
              <Typography
                className={styles.gameText}
                style={{ fontSize: '14px', fontWeight: 500 }}
              >
                {player1}
              </Typography>

              <Typography
                className={styles.gameText}
                style={{
                  alignSelf: 'flex-end',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {isGameStarted && 'vs'}
              </Typography>

              <Typography
                className={styles.gameText}
                style={{ fontSize: '14px', fontWeight: 500 }}
              >
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
      {/* <DigitBoard name={player2} /> 
          </div>
          <ButtonGroup style={{ color: 'white', alignSelf: 'flex-end' }}>
            <Button style={{ color: '#aaa' }}>Cancel</Button>
            <Button style={{ color: '#ddd' }}>Submit</Button>
          </ButtonGroup>
        </div>
      </Backdrop> */}
    </div>
  );
};

export default EliminationSingleGame;
