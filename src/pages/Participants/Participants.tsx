import React, { useEffect, useState } from 'react';

import ParticipantsTopBar from '../../components/TopBar/ParticipantsTopBar/ParticipantsTopBar';
import ParticipantCards from '../../components/PariticipantsCards/ParticipantCards';
import { RootState } from '../../store/features';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlayersSettingsView, TournamentType } from '../../types/main.types';
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
  const [view, setView] = useState<PlayersSettingsView>(
    PlayersSettingsView.cards,
  );

  const handleSingleCardClick = (type: PlayersSettingsView) => {
    setView(type);
  };

  const changeViewToCards = () => {
    setView(PlayersSettingsView.cards);
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
            view === PlayersSettingsView.single ? (
              <SingleIcon style={{ fill: 'white' }} />
            ) : view === PlayersSettingsView.team ? (
              <TeamsIcon style={{ fill: 'white' }} />
            ) : view === PlayersSettingsView.DRP ? (
              <DrawYourPartnerIcon style={{ fill: 'white' }} />
            ) : null
          }
          name={
            view === PlayersSettingsView.single
              ? 'Single'
              : view === PlayersSettingsView.team
              ? 'Team'
              : view === PlayersSettingsView.DRP
              ? 'Draw your partner'
              : ''
          }
          goBackToCards={changeViewToCards}
          cardBackgroundColor={
            view === PlayersSettingsView.single
              ? colors.single
              : view === PlayersSettingsView.team
              ? colors.teams
              : view === PlayersSettingsView.DRP
              ? colors.DrawYourPartner
              : 'black'
          }
        />
      )}
    </div>
  );
};

export default Participants;
