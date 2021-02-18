import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BasicToolBar from '../BasicToolBar/BasicToolBar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import BackButton from '../../Buttons/BackButton/BackButton';
import CButton from '../../Buttons/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';

interface Props {}

const SetupTopBar = (props: Props) => {
  const { t } = useTranslation();
  return (
    <BasicTopBar>
      <BasicToolBar>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Setup')}
        </Typography>
        <div>
          <FormControlLabel
            control={<Checkbox name="thirdPlace" color="primary" />}
            label="Match for Third Place"
          />
          <IconButton>
            <ShuffleIcon />
          </IconButton>
          <BackButton />
          <CButton text={t('Start')} />
        </div>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default SetupTopBar;