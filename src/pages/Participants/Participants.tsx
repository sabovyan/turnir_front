import React, { useEffect, useState } from 'react';

import ParticipantsTopBar from '../../components/TopBar/ParticipantsTopBar/ParticipantsTopBar';
import ParticipantCards from '../../components/PariticipantsCards/ParticipantCards';
import { RootState } from '../../store/features';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPlayersSettingsView, TournamentType } from '../../types/main.types';
import ParticipantInput from '../../components/ParticipantsInput/ParticipantsInput';
import SingleIcon from '../../components/icons/Single/SingleIcon';
import TeamsIcon from '../../components/icons/Teams/TeamsIcon';
import colors from '../../styles/colors';
import DrawYourPartnerIcon from '../../components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';

interface Props {}

const Participants = (props: Props) => {
  const { tournamentType } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const history = useHistory();
  const [view, setView] = useState<setPlayersSettingsView>(
    setPlayersSettingsView.cards,
  );

  const handleSingleCardClick = (type: setPlayersSettingsView) => {
    setView(type);
  };

  const changeViewToCards = () => {
    setView(setPlayersSettingsView.cards);
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
        <ParticipantCards onCardClick={handleSingleCardClick} />
      ) : (
        <ParticipantInput
          icon={
            view === setPlayersSettingsView.single ? (
              <SingleIcon style={{ fill: 'white' }} />
            ) : view === setPlayersSettingsView.team ? (
              <TeamsIcon style={{ fill: 'white' }} />
            ) : view === setPlayersSettingsView.DRP ? (
              <DrawYourPartnerIcon style={{ fill: 'white' }} />
            ) : null
          }
          name={
            view === setPlayersSettingsView.single
              ? 'Single'
              : view === setPlayersSettingsView.team
              ? 'Team'
              : view === setPlayersSettingsView.DRP
              ? 'Draw your partner'
              : ''
          }
          goBackToCards={changeViewToCards}
          cardBackgroundColor={
            view === setPlayersSettingsView.single
              ? colors.single
              : view === setPlayersSettingsView.team
              ? colors.teams
              : view === setPlayersSettingsView.DRP
              ? colors.DrawYourPartner
              : 'black'
          }
        />
      )}
    </div>
  );
};

export default Participants;
