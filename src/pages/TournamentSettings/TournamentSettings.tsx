import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changePlayerType } from 'src/store/features/settingsInfo';
import EliminationSettings from '../../components/EiminationSettings/EiminationSettings';
import TournamentSettingsTopBar from '../../components/TopBar/TournamentSettingsTopBar/TournamentSettingsTopBar';
import { RootState } from '../../store/features';
import { PlayersType, TournamentType } from '../../types/main.types';

const Elimination = () => {
  const { tournamentType, playerType } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (tournamentType === TournamentType.none) {
      history.push('/new');
    }

    if (playerType !== PlayersType.none) {
      dispatch(changePlayerType(PlayersType.none));
    }
  }, [dispatch, history, playerType, tournamentType]);

  return (
    <>
      <TournamentSettingsTopBar />
      <EliminationSettings />
    </>
  );
};

export default Elimination;
