import React, { KeyboardEvent, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import tournament from '../../assets/tournaments.svg';
import CButton from '../../components/Buttons/CustomButton/CustomButton';
import { useHistory } from 'react-router-dom';
import HomeTopBar from '../../components/TopBar/HomeTopBar/HomeTopBar';
import useAuth from '../../services/authentication';
import { useDispatch } from 'react-redux';
import { setResponseStatus } from '../../store/features/formResponseStatus';

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useAuth();

  const goToNewTournament = () => {
    if (!user) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t('you are not logged in'),
          open: true,
        }),
      );
    } else {
      history.push('/new');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleShortCuts = (e: globalThis.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      goToNewTournament();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleShortCuts);
    return () => {
      document.removeEventListener('keypress', handleShortCuts);
    };
  }, [handleShortCuts]);

  return (
    <>
      <HomeTopBar />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '80vh',
          outline: 'none',
        }}
      >
        <img src={tournament} alt="tournament" />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '20px 0',
          }}
        >
          <Typography component="h2" variant="h4">
            {t('Nothing here, yet')}
          </Typography>
          <Typography
            component="p"
            variant="body2"
            color="textSecondary"
            style={{ margin: '10px 0' }}
          >
            {t('Let’s get started with a new tournament')}
          </Typography>
        </div>
        <CButton
          text={t('NEW TOURNAMENT')}
          cssStyles={{ fontSize: '1.2rem' }}
          onClick={goToNewTournament}
        />
        <div
          style={{
            margin: '1rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="p"
            variant="h4"
            color="textSecondary"
            style={{ margin: '10px 0' }}
          >
            {t('Press ctrl + Enter')}
          </Typography>
          <Typography
            component="p"
            variant="body1"
            color="textSecondary"
            style={{ margin: '10px 0' }}
          >
            {t('to start a new tournament')}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Home;
