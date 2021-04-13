import React from 'react';
import { TransitionEvent } from 'react';
import gameUiDetails from 'src/constants/gameUiDetails';
import { DraftRound } from 'src/types/main.types';
import EliminationSingleGame from '../EliminationSingleGame/EliminationSingleGame';
import Round from '../Round/Round';

import styles from './Rounds.module.css';

interface Props {
  rounds: DraftRound[];
  isGameStarted: boolean;
  scale: number | false;
}

const Rounds = ({ rounds, isGameStarted, scale }: Props) => {
  const roundHeight = rounds.length
    ? rounds[0].games.length * gameUiDetails.height
    : 0;

  return (
    <div
      className={styles.roundsBox}
      style={{
        width: isGameStarted ? '100%' : 'calc(100vw - 350px)',
      }}
    >
      <div
        className={!isGameStarted ? styles.roundWrapper : styles.gameWrapper}
        style={
          scale
            ? {
                transform: `scale(${scale / 100})`,
              }
            : {}
        }
        onTransitionEnd={(event: TransitionEvent<HTMLDivElement>) => {
          event.currentTarget.style.transform = scale
            ? `scale(${scale / 100})`
            : '';
        }}
      >
        {rounds.map(({ games, name }, roundIndex) => (
          <Round name={name} key={name} roundHeight={roundHeight}>
            {games.map((game, gameIndex) => {
              if (name !== 'Final') {
                return (
                  <EliminationSingleGame
                    key={game.id}
                    game={game}
                    gameIndex={gameIndex}
                    roundIndex={roundIndex}
                    isFinal={roundIndex === rounds.length - 1}
                    totalGames={games.length}
                    roundHeight={roundHeight}
                    isGameStarted={isGameStarted}
                  />
                );
              }
              return gameIndex === 1 && games.length > 1 ? (
                <div
                  className={styles.thirdPlaceGame}
                  style={{
                    position: 'absolute',
                    top: '60%',
                    left: -5,
                    transform: 'translateY(50%)',
                  }}
                >
                  <EliminationSingleGame
                    key={game.id}
                    game={game}
                    gameIndex={gameIndex}
                    roundIndex={roundIndex}
                    isFinal={roundIndex === rounds.length - 1}
                    totalGames={games.length}
                    roundHeight={roundHeight}
                    isGameStarted={isGameStarted}
                  />
                </div>
              ) : (
                <EliminationSingleGame
                  key={game.id}
                  game={game}
                  gameIndex={gameIndex}
                  roundIndex={roundIndex}
                  isFinal={roundIndex === rounds.length - 1}
                  totalGames={games.length}
                  roundHeight={roundHeight}
                  isGameStarted={isGameStarted}
                />
              );
            })}
          </Round>
        ))}
      </div>
    </div>
  );
};

export default Rounds;

/**
 * @description this is a block of code for testing UI
 * @example
 * <Round
        name={rounds[0].name}
        key={rounds[0].name}
        roundHeight={roundHeight}
      >
        {rounds[0].games.map((game, gameIndex) => (
          <EliminationSingleGame
            game={game}
            gameIndex={gameIndex}
            roundIndex={0}
            isFinal={0 !== rounds.length - 1}
            totalGames={rounds[0].games.length}
            roundHeight={roundHeight}
          />
        ))}
      </Round> 
 */
