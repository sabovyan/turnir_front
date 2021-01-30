import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { setPlayersSettingsView } from '../../../types/main.types';
import BackButton from '../../Buttons/BackButton/BackButton';
import CButton from '../../Buttons/CustomButton/CustomButton';
import BasicToolBar from '../BasicToolBar/BasicToolBar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';

interface IParticipantsTopBarProps {
  view: setPlayersSettingsView;
}

const ParticipantsTopBar = ({ view }: IParticipantsTopBarProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleBackButtonClick = () => {
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
          {view !== 'cards' && <CButton text={t('next')} />}
        </div>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default ParticipantsTopBar;
