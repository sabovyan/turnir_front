import React, { KeyboardEvent } from 'react';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import tournament from '../../assets/tournaments.svg';
import CButton from '../../components/Buttons/CustomButton/CustomButton';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleShortCuts = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      history.push('/new');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '80vh',
        outline: 'none',
      }}
      tabIndex={0}
      onKeyPress={handleShortCuts}
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
      <CButton text={t('NEW TOURNAMENT')} cssStyles={{ fontSize: '1.2rem' }} />
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
  );
};

export default Home;
