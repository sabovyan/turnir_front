import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import SetupTopBar from '../../components/TopBar/SetuptopBar/SetupTopBar';
import { RootState } from '../../store/features';
import Typography from '@material-ui/core/Typography';
import SetupList from './SetupList';
import EliminationGameRectangle from '../../components/EliminationGameRectangle/EliminationGameRectangle';

interface Props {}

const Setup = (props: Props) => {
  const { players, games, rounds } = useSelector(
    (state: RootState) => state.gamesForSetup,
  );

  const history = useHistory();

  useEffect(() => {
    if (players.length < 1) {
      history.push('/');
    }
  }, []);

  return (
    <div>
      <SetupTopBar />
      <div
        style={{
          display: 'flex',
        }}
      >
        <SetupList players={players} />
        <div
          style={{
            width: 'calc(100vw - 340px)',
            height: 'calc(100vh - 100px)',
            paddingLeft: '20px',
            display: 'flex',
            overflow: 'scroll',
          }}
        >
          {rounds &&
            rounds.map((round, roundIndex) => (
              <div style={{ width: '300px' }}>
                <Typography style={{ padding: '1rem', textAlign: 'center' }}>
                  {round.name}
                </Typography>
                <div
                  style={{
                    height: rounds[0].games.length * 100,
                    width: '350px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}
                >
                  {round.games.map((game, idx) => (
                    <EliminationGameRectangle
                      key={game.id}
                      player1={game.player1 ? game.player1.name : ''}
                      player2={!game.player2 ? ' ' : game.player2.name}
                      isGameStarted={false}
                      isEven={idx % 2 === 0 ? false : true}
                      isFirstRound={roundIndex === 0 ? true : false}
                      isFinal={roundIndex === rounds.length - 1 ? false : true}
                      roundIndex={roundIndex}
                      maxHeight={rounds[0].games.length * 100}
                      numberOfGamesInOneRound={round.games.length}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
        {/* <div
          style={{
            width: 'calc(100vw - 340px)',
            // height: 'calc(100vh - 90px)',
            paddingLeft: '20px',
            display: 'flex',
            overflow: 'scroll',
          }}
        >
          {rounds &&
            rounds.map((round, roundIndex) => (
              <div style={{ width: '300px' }}>
                <Typography style={{ padding: '1rem', textAlign: 'center' }}>
                  {round.name}
                </Typography>
                <div
                  style={{
                    height: '800px',
                    display: 'Grid',
                    gridTemplateRows: `repeat(${round.games.length}, 100px)`,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '350px',
                  }}
                >
                  {round.games.map((game, idx) => (
                    <EliminationGameRectangle
                      key={game.id}
                      player1={game.player1 ? game.player1.name : ''}
                      player2={!game.player2 ? ' ' : game.player2.name}
                      isGameStarted={false}
                      isEven={idx % 2 === 0 ? false : true}
                      isFirstRound={roundIndex === 0 ? true : false}
                      isFinal={roundIndex === rounds.length - 1 ? false : true}
                      roundIndex={roundIndex}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default Setup;
