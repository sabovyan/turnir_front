import React from 'react';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  toolbar: {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
});

const NewTopBar = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <BasicTopBar>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Select Mode')}
        </Typography>
      </Toolbar>
    </BasicTopBar>
  );
};

export default NewTopBar;
