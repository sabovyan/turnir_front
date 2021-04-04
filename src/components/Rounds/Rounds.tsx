import React from 'react';
import { DraftRound } from 'src/types/main.types';
import EliminationGameRectangle from '../EliminationGameRectangle/EliminationGameRectangle';
import Round from '../Round/Round';

import styles from './Rounds.module.css';

interface Props {
  rounds: DraftRound[];
  isGameStarted: boolean;
  scale: number | false;
}

const Rounds = ({ rounds, isGameStarted, scale }: Props) => {
  return (
    <div
      className={styles.roundWrapper}
      style={
        scale
          ? {
              transform: `scale(${scale / 100})`,
              transformOrigin: 'left top',
              transition: 'transform 100ms linear',
            }
          : {}
      }
    >
      {rounds &&
        rounds.map((round, roundIndex) => (
          <Round
            key={round.name}
            roundHeight={rounds[0].games.length * 100}
            name={round.name}
          >
            {round.games.map(({ id, participant1, participant2 }, idx) =>
              roundIndex === rounds.length - 1 && round.games.length === 2 ? (
                <div
                  key={id}
                  className={styles.finalRoundWithTwoGames}
                  style={{
                    bottom: idx === 0 ? '50%' : '20%',
                    transform:
                      idx === 0
                        ? `translate(0,${50}%)`
                        : `translate(0, ${90}%)`,
                  }}
                >
                  <EliminationGameRectangle
                    key={id}
                    player1={participant1 ? participant1.name : ''}
                    player2={!participant2 ? ' ' : participant2.name}
                    isGameStarted={isGameStarted}
                    isEven={idx % 2 === 0 ? false : true}
                    isFirstRound={roundIndex === 0 ? true : false}
                    isFinal={roundIndex === rounds.length - 1 ? false : true}
                    maxHeight={idx === 0 ? rounds[0].games.length * 100 : 100}
                    numberOfGamesInOneRound={round.games.length}
                    label={idx === 1 ? 'Third place' : undefined}
                  />
                </div>
              ) : (
                <EliminationGameRectangle
                  key={id}
                  player1={participant1 ? participant1.name : ''}
                  player2={!participant2 ? ' ' : participant2.name}
                  isGameStarted={isGameStarted}
                  isEven={idx % 2 === 0 ? false : true}
                  isFirstRound={roundIndex === 0 ? true : false}
                  isFinal={roundIndex === rounds.length - 1 ? false : true}
                  maxHeight={rounds[0].games.length * 100}
                  numberOfGamesInOneRound={round.games.length}
                />
              ),
            )}
          </Round>
        ))}
    </div>
  );
};

export default Rounds;
