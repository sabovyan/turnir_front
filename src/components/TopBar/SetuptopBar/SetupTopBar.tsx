import React, { ChangeEvent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BasicToolBar from '../BasicToolBar/BasicToolBar';
import BasicTopBar from '../BasicTopBar/BasicTopBar';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import { BackButton, CButton } from 'src/components/common/Buttons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleThirdPlaceRound,
  setUpGamesAndPlayers,
} from '../../../store/features/gamesForSetup';
import { RootState } from 'src/store/features';
import shuffleArray from 'src/utils/shufflePlayers';
import { Participant, PlayersType } from 'src/types/main.types';
import { useHistory } from 'react-router';
import { changePlayerType } from 'src/store/features/settingsInfo';
import tournamentService from 'src/services/tournament.service';
import useAuth from 'src/services/authentication';
import { createTournament } from 'src/store/features/tournament.feature';
import { setResponseStatus } from 'src/store/features/formResponseStatus';
import { setNewTournamentModal } from 'src/store/features/newTournamentModal';

interface Props {}

const SetupTopBar = (props: Props) => {
  const {
    gamesForSetup: { participants, hasThirdPlaceGame, firstRoundGames },
    settingsInfo: { goalsToWin, tables, tournamentType, winningSets },
  } = useSelector((state: RootState) => state);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCheckBoxChange = (event: ChangeEvent<{}>, checked: boolean) => {
    dispatch(toggleThirdPlaceRound(checked));
  };

  const handlePlayersShuffle = () => {
    const shuffledParticipants = shuffleArray<Participant>(participants);
    dispatch(
      setUpGamesAndPlayers({
        participants: shuffledParticipants,
      }),
    );
  };

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const handleNextButtonClick = async () => {
    dispatch(setNewTournamentModal(true));
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
          <CButton text={t('Start')} onClick={handleNextButtonClick} />
        </div>
      </BasicToolBar>
    </BasicTopBar>
  );
};

export default SetupTopBar;
