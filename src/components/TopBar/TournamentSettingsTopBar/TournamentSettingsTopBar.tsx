import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BasicTopBar from '../BasicTopBar/BasicTopBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import CButton from '../../Buttons/CustomButton/CustomButton';
import { useHistory } from 'react-router-dom';
import BackButton from '../../Buttons/BackButton/BackButton';

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
