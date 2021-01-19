import React from 'react';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import tournament from '../../assets/tournaments.svg';
import CButton from '../../components/Buttons/CustomButton/CustomButton';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '80vh',
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
          Nothing here, yet.
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color="textSecondary"
          style={{ margin: '10px 0' }}
        >
          Let’s get started with a new tournament.
        </Typography>
      </div>
      <CButton text={t('NEW TOURNAMENT')} cssStyles={{ fontSize: '1.2rem' }} />
    </div>
  );
};

export default Home;
