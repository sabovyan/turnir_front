import React from 'react';
import SingleIcon from '../../components/icons/Single/SingleIcon';
import NewGameCard from '../../components/BasicCard/NewGameCard';
import TeamsIcon from '../../components/icons/Teams/TeamsIcon';
import DrawYourPartnerIcon from '../../components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';

interface Props {}

const ParticipantCards = (props: Props) => {
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
        color="#2f97b1"
        icon={
          <SingleIcon
            style={{
              fill: 'white',
              width: '100px',
              margin: '0 auto',
              filter: 'drop-shadow(2px 4px 6px black)',
              alignSelf: 'center',
            }}
          />
        }
        name="Single"
        onCardClick={() => {}}
      />
      <NewGameCard
        color="#15b657"
        icon={
          <DrawYourPartnerIcon
            style={{
              fill: 'white',
              width: '80px',
              margin: '0 auto',
              filter: 'drop-shadow(2px 4px 6px black)',
              alignSelf: 'center',
            }}
          />
        }
        name="Teams"
        onCardClick={() => {}}
      />
      <NewGameCard
        color="#d78040"
        icon={
          <TeamsIcon
            style={{
              fill: 'white',
              width: 80,
              margin: '0 auto',
              filter: 'drop-shadow(2px 4px 6px black)',
              alignSelf: 'center',
            }}
          />
        }
        name="Draw your partner"
        onCardClick={() => {}}
      />
    </div>
  );
};

export default ParticipantCards;
