import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../store/features';
import { getPlayers } from '../../../store/features/settingsInfo';
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
  const players = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const handleNextButtonClick = () => {
    const targetedPlayers = players.filter((pl) => pl.name);

    if (targetedPlayers.length) {
      dispatch(getPlayers({ players: targetedPlayers }));
      history.push('/setup');
    }
  };

  return (
    <BasicTopBar>
      <BasicToolBar>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Add Participants')}
        </Typography>
        <div>
          <BackButton onClick={handleBackButtonClick} />
          {view !== 'cards' && (
            <CButton text={t('Next')} onClick={handleNextButtonClick} />
          )}
        </div>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default ParticipantsTopBar;
