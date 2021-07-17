import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/features';
import { useHistory } from 'react-router';
import useAuth from '../../services/authentication';
import { setResponseStatus } from '../../store/features/formResponseStatus';

import SettingsItem from 'src/components/TournamentSettingsItem';
import ViewWrapper from '../common/ViewWrapper/ViewWrapper';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel, Paper, Typography } from '@material-ui/core';

import { TournamentType } from 'src/types/main.types';

import styles from './EliminationSettings.module.css';

const EliminationSettings = () => {
  const { tournamentType } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const handleShortCuts = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        if (!user) {
          dispatch(
            setResponseStatus({
              type: 'error',
              message: t('you are not logged in'),
              open: true,
            }),
          );
        } else {
          history.push('/participants');
        }
      }
    };

    document.addEventListener('keypress', handleShortCuts);
    return (): void => {
      document.removeEventListener('keypress', handleShortCuts);
    };
  }, [dispatch, history, t, user]);

  return (
    <ViewWrapper>
      <Paper className={styles.paper} elevation={3}>
        {tournamentType === TournamentType.lastManStanding ? (
          <SettingsItem.Lives />
        ) : null}
        <SettingsItem.Tables />
        <SettingsItem.Goals />
        {tournamentType === TournamentType.lastManStanding ? (
          <div>
            <FormControlLabel control={<Checkbox />} label={t('Draw')} />
          </div>
        ) : null}

        <SettingsItem.WinningSets />

        {tournamentType === TournamentType.lastManStanding ? (
          <SettingsItem.Points />
        ) : null}

        <div style={{ width: '480px' }}>
          <Typography
            align="center"
            variant="h6"
            component="h2"
            color="textSecondary"
            tabIndex={0}
            style={{ margin: '2rem 0' }}
          >
            Press ctrl + Enter to go to the next page
          </Typography>
        </div>
      </Paper>
    </ViewWrapper>
  );
};

export default EliminationSettings;
