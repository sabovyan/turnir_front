import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EliminationGameRectangle from 'src/components/EliminationGameRectangle/EliminationGameRectangle';
import Round from 'src/components/Round/Round';
import TournamentTopBar from 'src/components/TopBar/TournamentTopBar/TournamentTopBar';
import { RootState } from 'src/store/features';

interface Props {}

const Tournament = (props: Props) => {
  const tournament = useSelector((state: RootState) => state.tournament);
  const history = useHistory();

  const rounds = tournament?.rounds.reverse();

  useEffect(() => {
    if (!tournament) {
      history.push('/');
    }
  }, [history, tournament]);

  return (
    tournament && (
      <div>
        <TournamentTopBar />
        <div style={{ display: 'flex' }}>
          {rounds &&
            rounds.map((round, roundIndex) => (
              <Round
                key={round.name}
                roundHeight={tournament.rounds[0].games.length * 100}
                name={round.name}
              >
                {round.games.map(({ id, participant1, participant2 }, idx) =>
                  roundIndex === 0 && round.games.length === 2 ? (
                    <div
                      key={id}
                      // className={styles.finalRoundWithTwoGames}
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
                          roundIndex === tournament.rounds.length - 1
                            ? false
                            : true
                        }
                        maxHeight={
                          idx === 0
                            ? tournament.rounds[0].games.length * 100
                            : 100
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
                      isFinal={
                        roundIndex === tournament.rounds.length - 1
                          ? false
                          : true
                      }
                      maxHeight={tournament.rounds[0].games.length * 100}
                      numberOfGamesInOneRound={round.games.length}
                    />
                  ),
                )}
              </Round>
            ))}
        </div>
      </div>
    )
  );
};

export default Tournament;
