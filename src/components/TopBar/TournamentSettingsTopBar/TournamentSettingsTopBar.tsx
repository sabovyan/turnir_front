import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BasicTopBar from '../BasicTopBar/BasicTopBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import CButton from '../../Buttons/CustomButton/CustomButton';

const TournamentSettingsTopBar = () => {
  const { t } = useTranslation();
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
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
          <CButton text={t('Next')} />
        </div>
      </Toolbar>
    </BasicTopBar>
  );
};

export default TournamentSettingsTopBar;
