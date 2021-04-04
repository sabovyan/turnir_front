import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Rounds from 'src/components/Rounds/Rounds';
import TournamentTopBar from 'src/components/TopBar/TournamentTopBar/TournamentTopBar';
import tournamentService from 'src/services/tournament.service';
import { RootState } from 'src/store/features';

import { ITournamentAllTogether } from 'src/types/main.types';

interface Props {}

const Tournament = (props: Props) => {
  const { scale, isFullScreen } = useSelector(
    (state: RootState) => state.tournament,
  );

  const [tournament, setTournament] = useState<ITournamentAllTogether | null>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const numberId = Number(id);

    tournamentService
      .getById({ id: numberId })
      .then((res) => {
        if (res) {
          const { rounds, ...t } = res;

          setTournament({ ...t, rounds: rounds.reverse() });
        } else {
          setTournament(null);
        }
      })
      .catch((error) => {
        setTournament(null);
      });
  }, [id]);

  return (
    <div
      style={
        isFullScreen
          ? {
              transform: 'translateY(-100px)',
              transition: 'transform 100ms linear 100ms',
            }
          : {}
      }
    >
      <TournamentTopBar tournament={tournament} />

      {tournament === undefined ? (
        <LinearProgress />
      ) : tournament === null ? (
        <div>tournament was not found</div>
      ) : (
        <Rounds rounds={tournament.rounds} isGameStarted={true} scale={scale} />
      )}
    </div>
  );
};

export default Tournament;
