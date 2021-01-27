import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EliminationIcon from '../../components/icons/elimination/EliminationIcon';
import LastManStandingIcon from '../../components/icons/LastManStanding/LastManStanding';
import RoundRobinIcon from '../../components/icons/roundRobin/RoundRobinIcon';
import NewGameCard from '../../components/BasicCard/NewGameCard';
import NewTopBar from '../../components/TopBar/NewTopBar/NewTopBar';
import { setTournamentType } from '../../store/features/settingsInfo';

import { TournamentType } from '../../types/main.types';

interface Props {}

const CreateNewTournament = (props: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useDispatch();

  const goToSettings = (tournamentType: TournamentType) => () => {
    history.push('/tournament-settings');
    dispatch(setTournamentType({ tournamentType }));
  };

  return (
    <>
      <NewTopBar />
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
          color="#ac47ac"
          name={t('Elimination')}
          onCardClick={goToSettings(TournamentType.elimination)}
          icon={
            <EliminationIcon
              style={{ fill: 'white', width: 100, margin: '0 auto' }}
            />
          }
        />
        <NewGameCard
          color="#ef6c00"
          name={t('Last Man standing')}
          onCardClick={goToSettings(TournamentType.lastManStanding)}
          icon={
            <LastManStandingIcon
              style={{ fill: 'white', width: 100, margin: '0 auto' }}
            />
          }
        />
        <NewGameCard
          color="#4f9e18"
          name={t('Round Robin')}
          onCardClick={goToSettings(TournamentType.roundRobin)}
          icon={
            <RoundRobinIcon
              style={{ fill: 'white', width: 100, margin: '0 auto' }}
            />
          }
        />
      </div>
    </>
  );
};

export default CreateNewTournament;
