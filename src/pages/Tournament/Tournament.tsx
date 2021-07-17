import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'src/store/features';
import { getTournamentById } from 'src/store/features/tournament.feature';
import {
  AsyncResponseStatus,
  Participant,
  RoundName,
} from 'src/types/main.types';

import Rounds from 'src/components/Rounds/Rounds';
import LinearProgress from '@material-ui/core/LinearProgress';
import TournamentTopBar from 'src/components/TopBar/TournamentTopBar/TournamentTopBar';
import UpdateScoreModal from 'src/components/common/Modal/updateScoreModal';

import CompletionAlert from 'src/components/common/CompletionAlert/CompletionAlert';
import { countVictories } from 'src/utils/countVictories';
import { setResult } from 'src/store/features/result.feature';

interface Props {}

const moveWinnerToEnd = (participants: Participant[], temp: Participant) => {
  const newParticipants = participants.filter((p) => p.id !== temp.id);
  newParticipants.push(temp);

  return newParticipants;
};

const Tournament = (props: Props) => {
  const { scale, data: tournament, error, status } = useSelector(
    (state: RootState) => state.tournament,
  );

  const [localStatus] = useState<typeof status>(AsyncResponseStatus.fullfilled);

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const history = useHistory();

  const moveToResultPage = () => {
    if (!tournament) return;

    const [firstRound] = tournament.rounds;

    let participants = firstRound.games.reduce<Participant[]>((acc, game) => {
      if (game.participant1) {
        acc.push(game.participant1);
      }

      if (game.participant2) {
        acc.push(game.participant2);
      }

      return acc;
    }, []);

    tournament.rounds.forEach(({ games, name }, roundIdx) => {
      if (name === RoundName.final) {
        if (games.length === 1) {
          const game = games[0];
          const score = countVictories(
            game.firstParticipantScore,
            game.secondParticipantScore,
          );

          if (score.firstScore > score.secondScore) {
            participants = moveWinnerToEnd(participants, game.participant1);
          } else {
            participants = moveWinnerToEnd(participants, game.participant2);
          }
          return;
        }

        const final = games[0];
        const thirdPlace = games[1];

        const thirdPlaceScore = countVictories(
          thirdPlace.firstParticipantScore,
          thirdPlace.secondParticipantScore,
        );
        console.log(thirdPlaceScore);

        if (thirdPlaceScore.firstScore > thirdPlaceScore.secondScore) {
          if (thirdPlace.participant1) {
            participants = moveWinnerToEnd(
              participants,
              thirdPlace.participant1,
            );
          }
        } else {
          if (thirdPlace.participant2) {
            participants = moveWinnerToEnd(
              participants,
              thirdPlace.participant2,
            );
          }
        }

        const finalScore = countVictories(
          final.firstParticipantScore,
          final.secondParticipantScore,
        );

        if (finalScore.firstScore > finalScore.secondScore) {
          participants = moveWinnerToEnd(participants, final.participant1);
        } else {
          participants = moveWinnerToEnd(participants, final.participant2);
        }

        return;
      }

      games.forEach((game) => {
        if (!game.nextGameId) return;
        const nextGameId = game.nextGameId;
        const nextGame = tournament.rounds[roundIdx + 1].games.find(
          (game) => game.id === nextGameId,
        );
        if (!nextGame) return;

        if (game.nextGamePosition === 1) {
          if (
            game.participant1 &&
            nextGame.participant1.id === game.participant1.id
          ) {
            const temp = participants.find(
              (p) => p.id === nextGame.participant1.id,
            );
            if (temp) {
              participants = moveWinnerToEnd(participants, temp);
            }
          }

          if (
            game.participant2 &&
            nextGame.participant1.id === game.participant2.id
          ) {
            const temp = participants.find(
              (p) => p.id === nextGame.participant1.id,
            );
            if (temp) {
              participants = moveWinnerToEnd(participants, temp);
            }
          }
        }

        if (game.nextGamePosition === 2) {
          if (
            game.participant1 &&
            nextGame.participant2.id === game.participant1.id
          ) {
            const temp = participants.find(
              (p) => p.id === nextGame.participant2.id,
            );
            if (temp) {
              participants = moveWinnerToEnd(participants, temp);
            }
          }

          if (
            game.participant2 &&
            nextGame.participant2.id === game.participant2.id
          ) {
            const temp = participants.find(
              (p) => p.id === nextGame.participant2.id,
            );
            if (temp) {
              participants = moveWinnerToEnd(participants, temp);
            }
          }
        }
      });
    });

    participants.reverse();

    dispatch(
      setResult({
        participants,
        name: tournament.name,
        tournamentType: tournament.tournamentTypeId,
      }),
    );

    console.log(participants);
    history.push('/result');
  };

  useEffect(() => {
    const numberId = Number(id);
    dispatch(getTournamentById({ id: numberId }));
  }, [dispatch, id]);

  return (
    <div>
      <TournamentTopBar tournament={tournament} />

      {localStatus === AsyncResponseStatus.loading ? (
        <LinearProgress />
      ) : localStatus === AsyncResponseStatus.fullfilled && tournament ? (
        <>
          <UpdateScoreModal />
          <Rounds
            rounds={tournament.rounds}
            isGameStarted={true}
            scale={scale}
          />

          <CompletionAlert
            open={tournament.completionStatus}
            onButtonClick={moveToResultPage}
          />
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default Tournament;
