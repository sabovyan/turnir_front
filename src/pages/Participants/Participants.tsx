import React, { useEffect, useState } from 'react';

import ParticipantsTopBar from 'src/components/TopBar/ParticipantsTopBar/ParticipantsTopBar';
import ParticipantCards from 'src/components/PariticipantsCards/ParticipantCards';
import { RootState } from 'src/store/features';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlayersSettingsView, TournamentType } from '../../types/main.types';
import ParticipantAdd from 'src/components/ParticipantAdd/ParticipantAdd';
import SingleIcon from '../../components/icons/Single/SingleIcon';
import TeamsIcon from '../../components/icons/Teams/TeamsIcon';
import colors from '../../styles/colors';
import DrawYourPartnerIcon from '../../components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';
import personCardIconStyle from 'src/styles/personCardIconStyle';

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
    <>
      <ParticipantsTopBar view={view} />

      {view === 'cards' ? (
        <ParticipantCards onCardClick={handleSingleCardClick} />
      ) : (
        <ParticipantAdd
          icon={
            view === PlayersSettingsView.single ? (
              <SingleIcon style={personCardIconStyle} />
            ) : view === PlayersSettingsView.team ? (
              <TeamsIcon style={personCardIconStyle} />
            ) : view === PlayersSettingsView.DRP ? (
              <DrawYourPartnerIcon style={personCardIconStyle} />
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
    </>
  );
};

export default Participants;
