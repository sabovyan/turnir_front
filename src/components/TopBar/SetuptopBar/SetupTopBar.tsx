import React, { ChangeEvent } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleThirdPlaceRound,
  createGamesAndPlayersForSetup,
} from '../../../store/features/gamesForSetup';
import { RootState } from 'src/store/features';
import shuffleArray from 'src/utils/shufflePlayers';
import { PlayerWithNameAndId } from 'src/types/main.types';
import { useHistory } from 'react-router';

interface Props {}

const SetupTopBar = (props: Props) => {
  const { players, hasThirdPlaceGame } = useSelector(
    (state: RootState) => state.gamesForSetup,
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCheckBoxChange = (event: ChangeEvent<{}>, checked: boolean) => {
    dispatch(toggleThirdPlaceRound(checked));
  };

  const handlePlayersShuffle = () => {
    const shuffledPlayers = shuffleArray<PlayerWithNameAndId>(players);

    dispatch(
      createGamesAndPlayersForSetup({
        players: shuffledPlayers,
      }),
    );
  };

  const handleBackButtonClick = () => {
    history.goBack();
  };

  return (
    <BasicTopBar>
      <BasicToolBar>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Setup')}
        </Typography>
        <div>
          <FormControlLabel
            checked={hasThirdPlaceGame}
            control={<Checkbox name="thirdPlace" color="primary" />}
            label="Match for Third Place"
            onChange={handleCheckBoxChange}
          />
          <IconButton onClick={handlePlayersShuffle}>
            <ShuffleIcon />
          </IconButton>
          <BackButton onClick={handleBackButtonClick} />
          <CButton text={t('Start')} />
        </div>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default SetupTopBar;
