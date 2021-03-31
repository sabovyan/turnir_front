import React from 'react';
import { useTranslation } from 'react-i18next';
import PARTICIPANT_CARDS from 'src/constants/participantCard';
import ClickableCard from '../common/Cards/ClickableCard/ClickableCard';
import ViewWrapper from '../common/ViewWrapper/ViewWrapper';
import { useDispatch } from 'react-redux';
import { PlayersType } from 'src/types/main.types';
import { changePlayerType } from 'src/store/features/settingsInfo';

const ParticipantCards = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSingleCardClick = (type: PlayersType) => () => {
    dispatch(changePlayerType(type));
  };

  return (
    <ViewWrapper>
      {PARTICIPANT_CARDS.map(({ color, icon, name, type }) => (
        <ClickableCard
          key={name}
          color={color}
          icon={icon}
          name={t(name)}
          onCardClick={handleSingleCardClick(type)}
          isInteractive={false}
        />
      ))}
    </ViewWrapper>
  );
};

export default ParticipantCards;
