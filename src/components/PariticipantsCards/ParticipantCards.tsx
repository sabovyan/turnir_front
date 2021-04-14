import React from 'react';
import { useTranslation } from 'react-i18next';
import PARTICIPANT_CARDS from 'src/constants/participantCard';
import ClickableCard from '../common/Cards/ClickableCard/ClickableCard';
import ViewWrapper from '../common/ViewWrapper/ViewWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { PlayersType, TournamentType } from 'src/types/main.types';
import { changePlayerType } from 'src/store/features/settingsInfo';
import { RootState } from 'src/store/features';

const ParticipantCards = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { tournamentType } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const handleSingleCardClick = (type: PlayersType) => () => {
    dispatch(changePlayerType(type));
  };

  return (
    <ViewWrapper>
      {PARTICIPANT_CARDS.map(({ color, icon, name, type }) => {
        if (
          tournamentType === TournamentType.elimination &&
          type === PlayersType.MDYP
        ) {
          return null;
        }

        return (
          <ClickableCard
            key={name}
            color={color}
            icon={icon}
            name={t(name)}
            onCardClick={handleSingleCardClick(type)}
            isInteractive={false}
          />
        );
      })}
    </ViewWrapper>
  );
};

export default ParticipantCards;
