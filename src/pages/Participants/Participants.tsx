import React, { useEffect } from 'react';

import ParticipantsTopBar from '../../components/TopBar/ParticipantsTopBar/ParticipantsTopBar';
import ParticipantCards from '../../components/PariticipantsCards/ParticipantCards';
import { RootState } from '../../store/features';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TournamentType } from '../../types/main.types';

interface Props {}

const Participants = (props: Props) => {
  const { tournamentType } = useSelector(
    (state: RootState) => state.settingsInfo,
  );
  const history = useHistory();

  useEffect(() => {
    if (tournamentType === TournamentType.none) {
      history.push('/new');
    }
  });

  return (
    <div>
      <ParticipantsTopBar />

      <ParticipantCards />
    </div>
  );
};

export default Participants;
