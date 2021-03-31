import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlayersType } from 'src/types/main.types';
import { RootState } from '../../../store/features';
import { setUpGamesAndPlayers } from '../../../store/features/gamesForSetup';
import BackButton from '../../common/Buttons/BackButton/BackButton';
import CButton from '../../common/Buttons/CustomButton/CustomButton';
import BasicToolBar from '../BasicToolBar/BasicToolBar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';

import TopBarGroupList from './TopBarGroupList';
import { setResponseStatus } from 'src/store/features/formResponseStatus';
import {
  arrangeParticipantsInTwoArrays,
  changePlayerType,
} from 'src/store/features/settingsInfo';

const ParticipantsTopBar = () => {
  const { playerType } = useSelector((state: RootState) => state.settingsInfo);

  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { participants } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const handleBackButtonClick = () => {
    dispatch(changePlayerType(PlayersType.none));
    history.push('/tournament-settings');
  };

  const handleNextButtonClick = () => {
    if (playerType === PlayersType.DYP) {
      if (participants.length % 2 !== 0) {
        dispatch(
          setResponseStatus({
            message: 'Quantity of players must be even',
            open: true,
            type: 'error',
          }),
        );
        return;
      }
      dispatch(arrangeParticipantsInTwoArrays());
      dispatch(changePlayerType(PlayersType.DYP2));
      return;
    }

    if (participants.length) {
      dispatch(
        setUpGamesAndPlayers({
          participants: participants,
        }),
      );

      dispatch(changePlayerType(PlayersType.none));
      history.push('/setup');
    } else {
      dispatch(
        setResponseStatus({
          message: 'your players list is empty',
          open: true,
          type: 'error',
        }),
      );
    }
  };

  return (
    <BasicTopBar>
      <BasicToolBar>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Add Participants')}
        </Typography>
        <div>
          {playerType !== PlayersType.none && <TopBarGroupList />}

          <BackButton
            onClick={handleBackButtonClick}
            style={{ borderRadius: 0 }}
          />
          {playerType !== PlayersType.none && (
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
