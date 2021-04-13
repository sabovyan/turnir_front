import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UpdateScoreModal from 'src/components/common/Modal/updateScoreModal';

import Rounds from 'src/components/Rounds/Rounds';
import TournamentTopBar from 'src/components/TopBar/TournamentTopBar/TournamentTopBar';

import { RootState } from 'src/store/features';
import { getTournamentById } from 'src/store/features/tournament.feature';

import { AsyncResponseStatus } from 'src/types/main.types';

interface Props {}

const Tournament = (props: Props) => {
  const { scale, data: tournament, error, status } = useSelector(
    (state: RootState) => state.tournament,
  );

  // const [tournament, setTournament] = useState<ITournamentAllTogether | null>();

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    const numberId = Number(id);
    dispatch(getTournamentById({ id: numberId }));
  }, [dispatch, id]);

  return (
    <div>
      <TournamentTopBar tournament={tournament} />

      {status === AsyncResponseStatus.loading ? (
        <LinearProgress />
      ) : status === AsyncResponseStatus.fullfilled && tournament ? (
        <>
          <UpdateScoreModal />
          <Rounds
            rounds={tournament.rounds}
            isGameStarted={true}
            scale={scale}
          />
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default Tournament;
