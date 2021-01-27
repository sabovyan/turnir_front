import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import BackButton from '../../Buttons/BackButton/BackButton';
import BasicToolBar from '../BasicToolBar/BasicToolBar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';

interface Props {}

const ParticipantsTopBar = (props: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleBackButtonClick = () => {
    console.log('here');

    history.goBack();
  };

  return (
    <BasicTopBar>
      <BasicToolBar>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Add Participants')}
        </Typography>
        <div>
          <BackButton onClick={handleBackButtonClick} />
        </div>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default ParticipantsTopBar;
