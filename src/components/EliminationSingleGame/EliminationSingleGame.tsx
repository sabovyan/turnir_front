import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { Game } from 'src/types/main.types';
import GameBackLine from './GameBackLine';
import GameFrontLine from './GameFrontLine';
import gameUiDetails from 'src/constants/gameUiDetails';
import GameContainer from './GameContainer';

import styles from './EliminationGameRectangle.module.css';
import { useDispatch } from 'react-redux';
import { openScoreModal } from 'src/store/features/scoreBoard.feature';

import UpdateScoreModal from '../common/Modal/updateScoreModal';

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
  const dispatch = useDispatch();

  const isEven = gameIndex % 2 === 0 ? false : true;
  const isFirstRound = roundIndex === 0 ? true : false;

  const [open, setOpen] = useState(false);

  const handleResultPageOpen = () => {
    dispatch(openScoreModal({ data: game, open: true }));
    setOpen(true);
  };

  const handleResultPageClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <UpdateScoreModal
        open={open}
        game={game}
        closeModal={handleResultPageClose}
      /> */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.eliminationGameWrapper}>
          {isFinal && gameIndex === 1 ? (
            <Typography
              className={styles.thirdPlaceGame}
              variant="h6"
              color="textSecondary"
              style={{
                position: 'absolute',
                top: `${roundHeight / 8 - 80}px`,
                left: '140px',
              }}
            >
              Third Place
            </Typography>
          ) : null}
          <GameBackLine isFirstRound={isFirstRound} />
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
            isColored={!isFinal}
          />
        </div>
      </div>
    </>
  );
};

export default EliminationSingleGame;
