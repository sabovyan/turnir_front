import Typography from '@material-ui/core/Typography';
import React from 'react';
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
      className={!isGameStarted ? styles.roundWrapper : styles.gameWrapper}
      style={{
        transform: scale ? `scale(${scale / 100})` : `scale(${1})`,
      }}
    >
      {rounds.map(({ games, name }, roundIndex) => (
        <Round name={name} key={name} roundHeight={roundHeight}>
          {games.map((game, gameIndex) => (
            <EliminationSingleGame
              key={game.id}
              game={game}
              gameIndex={gameIndex}
              roundIndex={roundIndex}
              isFinal={roundIndex !== rounds.length - 1}
              totalGames={games.length}
              roundHeight={roundHeight}
              isGameStarted={isGameStarted}
            />
          ))}
        </Round>
      ))}
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

//   <div
//     key={game.id}
//     className={styles.finalRoundWithTwoGames}
//     style={{
//       position: 'absolute',

//       bottom: gameIndex === 0 ? '50%' : '20%',
//       transform:
//         gameIndex === 0
//           ? `translateY(${50}%)`
//           : `translateY(${10}%)`,
//     }}
//   >
//     {gameIndex === 1 ? (
//       <Typography variant="h6" align="center" color="textSecondary">
//         {'Third Place'}
//       </Typography>
//     ) : null}
//     <EliminationSingleGame
//       game={game}
//       gameIndex={gameIndex}
//       roundIndex={roundIndex}
//       isFinal={roundIndex !== rounds.length - 1}
//       totalGames={games.length}
//       roundHeight={roundHeight}
//     />
//   </div>
