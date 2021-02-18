import React, { useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import useAuth from '../../services/authentication';
import { setResponseStatus } from '../../store/features/formResponseStatus';
import Goals from '../Goals/Goals';
import Tables from '../Tables/Tables';
import WinningSets from '../WinningSets/WinningSets';

import styles from './EliminationSettings.module.css';

const EliminationSettings = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useAuth();
  const { t } = useTranslation();

  const goToParticipants = () => {
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
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleShortCuts = (e: globalThis.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      goToParticipants();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleShortCuts);
    return (): void => {
      document.removeEventListener('keypress', handleShortCuts);
    };
  }, [handleShortCuts]);

  return (
    <div className={styles.eliminationSettings}>
      <Paper
        elevation={6}
        style={{
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
        }}
      >
        <Tables />
        <Goals />
        <WinningSets />
      </Paper>
      <div style={{ width: '400px' }}>
        <Typography
          align="center"
          variant="h5"
          component="h2"
          color="textSecondary"
          tabIndex={0}
          style={{ marginTop: '3rem' }}
        >
          focus on me and Press ctrl + Enter to go to the next page
        </Typography>
      </div>
    </div>
  );
};

export default EliminationSettings;
