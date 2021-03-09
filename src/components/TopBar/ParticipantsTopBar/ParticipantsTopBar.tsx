import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../store/features';
import { createGamesAndPlayersForSetup } from '../../../store/features/gamesForSetup';
import { setPlayersSettingsView } from '../../../types/main.types';
import BackButton from '../../Buttons/BackButton/BackButton';
import CButton from '../../Buttons/CustomButton/CustomButton';
import BasicToolBar from '../BasicToolBar/BasicToolBar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';

import TopBarGroupList from './TopBarGroupList';

interface IParticipantsTopBarProps {
  view: setPlayersSettingsView;
  selectedGroup: number | false;
  handleListItemClick: (id: number) => void;
}

const ParticipantsTopBar = ({
  view,
  selectedGroup,
  handleListItemClick,
}: IParticipantsTopBarProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { players } = useSelector((state: RootState) => state.settingsInfo);

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const handleNextButtonClick = () => {
    if (players.length) {
      dispatch(createGamesAndPlayersForSetup({ players }));
      history.push('/setup');
    } else {
      console.log('players are empty');
    }
  };

  return (
    <BasicTopBar>
      <BasicToolBar>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Add Participants')}
        </Typography>
        <div>
          {view !== 'cards' && (
            <TopBarGroupList
              selectedGroup={selectedGroup}
              handleListItemClick={handleListItemClick}
            />
          )}

          <BackButton
            onClick={handleBackButtonClick}
            style={{ borderRadius: 0 }}
          />
          {view !== 'cards' && (
            <>
              <CButton text={t('Next')} onClick={handleNextButtonClick} />
            </>
          )}
        </div>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default ParticipantsTopBar;
