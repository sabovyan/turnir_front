import React, { useEffect, useState } from 'react';

import ParticipantsTopBar from '../../components/TopBar/ParticipantsTopBar/ParticipantsTopBar';
import ParticipantCards from '../../components/PariticipantsCards/ParticipantCards';
import { RootState } from '../../store/features';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPlayersSettingsView, TournamentType } from '../../types/main.types';
import ParticipantInput from '../../components/ParticipantsInput/ParticipantsInput';
import SingleIcon from '../../components/icons/Single/SingleIcon';

interface Props {}

const Participants = (props: Props) => {
  const { tournamentType } = useSelector(
    (state: RootState) => state.settingsInfo,
  );
  const history = useHistory();
  const [view, setView] = useState<setPlayersSettingsView>('cards');

  const handleSingleCardClick = () => {
    setView('single');
  };

  useEffect(() => {
    if (tournamentType === TournamentType.none) {
      history.push('/new');
    }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ParticipantsTopBar view={view} />

      {view === 'cards' ? (
        <ParticipantCards SingleCardClick={handleSingleCardClick} />
      ) : view === 'single' ? (
        <ParticipantInput
          icon={<SingleIcon style={{ fill: 'white' }} />}
          name="Single"
        />
      ) : null}
    </div>
  );
};

export default Participants;
