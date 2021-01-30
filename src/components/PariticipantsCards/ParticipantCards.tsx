import React from 'react';
import SingleIcon from '../../components/icons/Single/SingleIcon';
import NewGameCard from '../../components/BasicCard/NewGameCard';
import TeamsIcon from '../../components/icons/Teams/TeamsIcon';
import DrawYourPartnerIcon from '../../components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';
import { useTranslation } from 'react-i18next';
import colors from '../../styles/colors';

interface IParticipantCardsProps {
  SingleCardClick: () => void;
}

const ParticipantCards = ({ SingleCardClick }: IParticipantCardsProps) => {
  const { t } = useTranslation();

  const handleSingleCardClick = () => {
    SingleCardClick();
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
        onCardClick={handleSingleCardClick}
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
        onCardClick={() => {}}
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
        onCardClick={() => {}}
      />
    </div>
  );
};

export default ParticipantCards;
