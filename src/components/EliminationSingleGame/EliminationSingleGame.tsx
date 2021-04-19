import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { Game } from 'src/types/main.types';
import GameBackLine from './GameBackLine';
import GameFrontLine from './GameFrontLine';
import gameUiDetails from 'src/constants/gameUiDetails';
import GameContainer from './GameContainer';

import styles from './EliminationGameRectangle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  IScore,
  IScoreState,
  openScoreModal,
} from 'src/store/features/scoreBoard.feature';

import UpdateScoreModal from '../common/Modal/updateScoreModal';
import { RootState } from 'src/store/features';
import { countVictories } from 'src/utils/countVictories';
import { Score } from '@material-ui/icons';

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

  const { data: tournamentData } = useSelector(
    (state: RootState) => state.tournament,
  );

  const [score, setScore] = useState({
    firstScore: -1,
    secondScore: -1,
  });

  const isEven = gameIndex % 2 === 0 ? false : true;
  const isFirstRound = roundIndex === 0 ? true : false;

  const handleResultPageOpen = () => {
    if (!tournamentData) return;

    const { winningSets, goalsToWin } = tournamentData;
    const { firstParticipantScore, secondParticipantScore } = game;

    const s: IScore = {
      left: -1,
      right: -1,
    };
    const initialSets: IScore[] = Array(winningSets).fill(s);

    const scoreModalData: IScoreState = {
      data: game,
      open: true,
      sets: initialSets,
      winningPoints: goalsToWin,
      hasWinner: false,
      winningSets: winningSets,
      tournamentId: tournamentData.id,
    };

    if (
      firstParticipantScore.length &&
      secondParticipantScore.length &&
      firstParticipantScore.length === secondParticipantScore.length
    ) {
      const sets = Array(firstParticipantScore.length).fill(s);

      const existingSets: IScore[] = sets.map((el, idx) => {
        el.left = firstParticipantScore[idx];
        el.right = secondParticipantScore[idx];
        return el;
      });

      scoreModalData.sets = existingSets;
    }

    dispatch(openScoreModal(scoreModalData));
  };

  useEffect(() => {
    if (
      game.firstParticipantScore.length &&
      game.secondParticipantScore.length
    ) {
      if (game.firstParticipantScore.length === 1) {
        setScore({
          firstScore: game.firstParticipantScore[0],
          secondScore: game.secondParticipantScore[0],
        });
      } else {
        setScore(
          countVictories(
            game.firstParticipantScore,
            game.secondParticipantScore,
          ),
        );
      }
    }
  }, [game.firstParticipantScore, game.secondParticipantScore]);

  return (
    <>
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
            score1={score.firstScore}
            score2={score.secondScore}
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
