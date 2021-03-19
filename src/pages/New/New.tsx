import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewTopBar from '../../components/TopBar/NewTopBar/NewTopBar';
import { setTournamentType } from '../../store/features/settingsInfo';
import { TournamentType } from '../../types/main.types';
import ClickableCard from 'src/components/common/Cards/ClickableCard/ClickableCard';
import GAME_CARDS from 'src/constants/gameCards';

import styles from './New.module.css';

interface Props {}

const NewTournament = (props: Props) => {
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
      <div className={styles.newTournament}>
        {GAME_CARDS.map(({ name, icon, color, tournamentType }) => (
          <ClickableCard
            name={t(name)}
            icon={icon}
            color={color}
            onCardClick={goToSettings(tournamentType)}
          />
        ))}
      </div>
    </>
  );
};

export default NewTournament;
