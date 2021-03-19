import React, { useCallback, useEffect } from 'react';
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
import ViewWrapper from '../common/ViewWrapper/ViewWrapper';

const EliminationSettings = (): JSX.Element => {
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
        <Tables />
        <Goals />
        <WinningSets />
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
