import React from 'react';
import SingleIcon from '../../components/icons/Single/SingleIcon';
import NewGameCard from '../../components/BasicCard/NewGameCard';
import TeamsIcon from '../../components/icons/Teams/TeamsIcon';
import DrawYourPartnerIcon from '../../components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';
import { useTranslation } from 'react-i18next';
import colors from '../../styles/colors';
import { setPlayersSettingsView } from '../../types/main.types';

interface IParticipantCardsProps {
  onCardClick: (type: setPlayersSettingsView) => void;
}

const ParticipantCards = ({ onCardClick }: IParticipantCardsProps) => {
  const { t } = useTranslation();

  const handleCardClick = (type: setPlayersSettingsView) => () => {
    onCardClick(type);
  };

  return (
    <div
      style={{
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem 0',
        gap: '4rem',
      }}
    >
      <NewGameCard
        color={colors.single}
        icon={
          <SingleIcon
            style={{
              fill: 'white',
              width: '100px',
              margin: '0 auto',
              filter: 'drop-shadow(2px 2px 2px black)',
              alignSelf: 'center',
            }}
          />
        }
        name={t('Single')}
        onCardClick={handleCardClick(setPlayersSettingsView.single)}
      />
      <NewGameCard
        color={colors.teams}
        icon={
          <DrawYourPartnerIcon
            style={{
              fill: 'white',
              width: '80px',
              margin: '0 auto',
              filter: 'drop-shadow(2px 2px 2px black)',
              alignSelf: 'center',
            }}
          />
        }
        name={t('Teams')}
        onCardClick={handleCardClick(setPlayersSettingsView.team)}
      />
      <NewGameCard
        color={colors.DrawYourPartner}
        icon={
          <TeamsIcon
            style={{
              fill: 'white',
              width: 80,
              margin: '0 auto',
              filter: 'drop-shadow(2px 2px 2px black)',
              alignSelf: 'center',
            }}
          />
        }
        name={t('Draw your partner')}
        onCardClick={handleCardClick(setPlayersSettingsView.DRP)}
      />
    </div>
  );
};

export default ParticipantCards;
