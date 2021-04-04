import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import SetupTopBar from 'src/components/TopBar/SetuptopBar/SetupTopBar';
import SetupList from '../../components/SetupList/SetupList';

import { RootState } from '../../store/features';

import Rounds from 'src/components/Rounds/Rounds';

interface Props {}

const Setup = (props: Props) => {
  const { participants, rounds } = useSelector(
    (state: RootState) => state.gamesForSetup,
  );

  const history = useHistory();

  // const renderRounds = deepCopyArray(rounds).reverse();

  useEffect(() => {
    if (participants.length < 1) {
      history.push('/');
    }
  }, [history, participants.length]);

  return (
    <>
      <SetupTopBar />
      <div
        style={{
          display: 'flex',
        }}
      >
        <SetupList />
        <Rounds rounds={rounds} isGameStarted={false} scale={false} />
        {/* <div className={styles.roundWrapper}>
          {rounds &&
            rounds.map((round, roundIndex) => (
              <Round
                key={round.name}
                roundHeight={rounds[0].games.length * 100}
                name={round.name}
              >
                {round.games.map(({ id, participant1, participant2 }, idx) =>
                  roundIndex === rounds.length - 1 &&
                  round.games.length === 2 ? (
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
                      key={id}
                      player1={participant1 ? participant1.name : ''}
                      player2={!participant2 ? ' ' : participant2.name}
                      isGameStarted={false}
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
        </div> */}
      </div>
    </>
  );
};

export default Setup;
