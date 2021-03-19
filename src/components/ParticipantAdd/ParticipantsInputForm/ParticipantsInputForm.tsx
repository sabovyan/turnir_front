import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

import InputWithSearch from './InputWithSearch';

const ParticipantsInputForm = () => {
  const { t } = useTranslation();

  return (
    <div style={{ margin: '10px', padding: '1rem', position: 'relative' }}>
      <Typography
        color="textSecondary"
        style={{ alignSelf: 'flex-start', margin: '10px 0' }}
      >
        {t('Enter names of the players')}
      </Typography>
      <InputWithSearch />
    </div>
  );
};

export default ParticipantsInputForm;
