import React from 'react';

import BackButton from '../../common/Buttons/BackButton/BackButton';
import CButton from '../../common/Buttons/CustomButton/CustomButton';
import BasicTopBar from '../BasicTopBar/BasicTopBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TournamentSettingsTopBar = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const handleNextButtonClick = () => {
    history.push('/participants');
  };

  return (
    <BasicTopBar>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Tournament Settings')}
        </Typography>
        <div>
          <BackButton onClick={handleBackButtonClick} />
          <CButton text={t('Next')} onClick={handleNextButtonClick} />
        </div>
      </Toolbar>
    </BasicTopBar>
  );
};

export default TournamentSettingsTopBar;
