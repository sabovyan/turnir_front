import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlayersSettingsView } from '../../types/main.types';
import PARTICIPANT_CARDS from 'src/constants/participantCard';
import ClickableCard from '../common/Cards/ClickableCard/ClickableCard';
import ViewWrapper from '../common/ViewWrapper/ViewWrapper';

interface IParticipantCardsProps {
  onCardClick: (type: PlayersSettingsView) => void;
}

const ParticipantCards = ({ onCardClick }: IParticipantCardsProps) => {
  const { t } = useTranslation();

  const handleCardClick = (type: PlayersSettingsView) => () => {
    onCardClick(type);
  };

  return (
    <ViewWrapper>
      {PARTICIPANT_CARDS.map(({ color, icon, name, playersSettingsView }) => (
        <ClickableCard
          key={name}
          color={color}
          icon={icon}
          name={name}
          onCardClick={handleCardClick(playersSettingsView)}
        />
      ))}
    </ViewWrapper>
  );
};

export default ParticipantCards;
