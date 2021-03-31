import React, { useEffect } from 'react';

import ParticipantsTopBar from 'src/components/TopBar/ParticipantsTopBar/ParticipantsTopBar';
import ParticipantCards from 'src/components/PariticipantsCards/ParticipantCards';
import { RootState } from 'src/store/features';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TournamentType } from '../../types/main.types';
import ParticipantAdd from 'src/components/ParticipantAdd/ParticipantAdd';

interface Props {}

const Participants = (props: Props) => {
  const { tournamentType, playerType } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const history = useHistory();

  useEffect(() => {
    if (tournamentType === TournamentType.none) {
      history.push('/new');
    }
  });

  return (
    <>
      <ParticipantsTopBar />

      {playerType === 'none' ? <ParticipantCards /> : <ParticipantAdd />}
    </>
  );
};

export default Participants;
