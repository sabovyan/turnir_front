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
  const { players, rounds } = useSelector(
    (state: RootState) => state.gamesForSetup,
  );

  const history = useHistory();

  useEffect(() => {
    if (players.length < 1) {
      history.push('/');
    }
  }, [history, players.length]);

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
              <div style={{ width: '300px' }} key={round.name}>
                <Typography
                  color="textSecondary"
                  style={{ padding: '1rem', textAlign: 'center' }}
                >
                  {round.name}
                </Typography>
                <div
                  style={{
                    height: rounds[0].games.length * 100,
                    width: '350px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    position: 'relative',
                  }}
                >
                  {round.games.map((game, idx) =>
                    roundIndex === rounds.length - 1 &&
                    round.games.length === 2 ? (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: idx === 0 ? '50%' : '20%',
                          transform:
                            idx === 0
                              ? `translate(0,${50}%)`
                              : `translate(0, ${90}%)`,
                        }}
                      >
                        <EliminationGameRectangle
                          key={game.id}
                          player1={game.player1 ? game.player1.name : ''}
                          player2={!game.player2 ? ' ' : game.player2.name}
                          isGameStarted={false}
                          isEven={idx % 2 === 0 ? false : true}
                          isFirstRound={roundIndex === 0 ? true : false}
                          isFinal={
                            roundIndex === rounds.length - 1 ? false : true
                          }
                          maxHeight={
                            idx === 0 ? rounds[0].games.length * 100 : 100
                          }
                          numberOfGamesInOneRound={round.games.length}
                          label={idx === 1 ? 'Third place' : undefined}
                        />
                      </div>
                    ) : (
                      <EliminationGameRectangle
                        key={game.id}
                        player1={game.player1 ? game.player1.name : ''}
                        player2={!game.player2 ? ' ' : game.player2.name}
                        isGameStarted={false}
                        isEven={idx % 2 === 0 ? false : true}
                        isFirstRound={roundIndex === 0 ? true : false}
                        isFinal={
                          roundIndex === rounds.length - 1 ? false : true
                        }
                        maxHeight={rounds[0].games.length * 100}
                        numberOfGamesInOneRound={round.games.length}
                      />
                    ),
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Setup;
