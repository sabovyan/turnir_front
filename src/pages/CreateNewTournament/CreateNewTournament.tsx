import React from 'react';
import EliminationIcon from '../../components/icons/elimination/EliminationIcon';
import LastManStandingIcon from '../../components/icons/last man standing/LastManStanding';
import RoundRobinIcon from '../../components/icons/roundRobin/RoundRobinIcon';
import NewGameCard from '../../components/NewGameCard/NewGameCard';

interface Props {}

const CreateNewTournament = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem 0',
        gap: '1rem',
      }}
    >
      <NewGameCard
        background="#ac47ac"
        name="Elimination"
        buttonCLick={() => {}}
        icon={
          <EliminationIcon
            style={{ fill: 'white', width: 40, alignSelf: 'flex-end' }}
          />
        }
      />
      <NewGameCard
        background="#ef6c00"
        name="Last Man standing"
        buttonCLick={() => {}}
        icon={
          <LastManStandingIcon
            style={{ fill: 'white', width: 40, alignSelf: 'flex-end' }}
          />
        }
      />
      <NewGameCard
        background="#ef6c00"
        name="Last Man standing"
        buttonCLick={() => {}}
        // icon={
        //   <LastManStandingIcon
        //     style={{ fill: 'white', width: 40, alignSelf: 'flex-end' }}
        //   />
        // }
        icon={
          <RoundRobinIcon
            style={{ fill: 'white', width: 40, alignSelf: 'flex-end' }}
          />
        }
      />
    </div>
  );
};

export default CreateNewTournament;
