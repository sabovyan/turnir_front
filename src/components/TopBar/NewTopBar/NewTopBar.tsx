import React from 'react';

import Typography from '@material-ui/core/Typography';
import BasicTopBar from '../BasicTopBar/BasicTopBar';

import { useTranslation } from 'react-i18next';
import BasicToolBar from '../BasicToolBar/BasicToolBar';

const NewTopBar = () => {
  const { t } = useTranslation();

  return (
    <BasicTopBar>
      <BasicToolBar>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Select Mode')}
        </Typography>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default NewTopBar;
