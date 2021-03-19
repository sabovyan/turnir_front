import React from 'react';
import SingleIcon from '../../components/icons/Single/SingleIcon';
import NewGameCard from '../../components/BasicCard/NewGameCard';
import TeamsIcon from '../../components/icons/Teams/TeamsIcon';
import DrawYourPartnerIcon from '../../components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';
import { useTranslation } from 'react-i18next';
import colors from '../../styles/colors';
import { PlayersSettingsView } from '../../types/main.types';
import PARTICIPANT_CARDS from 'src/constants/participantCard';
import ClickableCard from '../common/Cards/ClickableCard/ClickableCard';

interface IParticipantCardsProps {
  onCardClick: (type: PlayersSettingsView) => void;
}

const ParticipantCards = ({ onCardClick }: IParticipantCardsProps) => {
  const { t } = useTranslation();

  const handleCardClick = (type: PlayersSettingsView) => () => {
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
      {PARTICIPANT_CARDS.map(({ color, icon, name, playersSettingsView }) => (
        <ClickableCard
          color={color}
          icon={icon}
          name={name}
          onCardClick={handleCardClick(playersSettingsView)}
        />
      ))}
      {/* <NewGameCard
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
      /> */}
    </div>
  );
};

export default ParticipantCards;
