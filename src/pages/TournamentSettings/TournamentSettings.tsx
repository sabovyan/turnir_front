import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EliminationSettings from '../../components/EiminationSettings/EiminationSettings';
import TournamentSettingsTopBar from '../../components/TopBar/TournamentSettingsTopBar/TournamentSettingsTopBar';
import { RootState } from '../../store/features';
import { TournamentType } from '../../types/main.types';

const Elimination = () => {
  const { tournamentType } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const history = useHistory();

  useEffect(() => {
    if (tournamentType === TournamentType.none) {
      history.push('/new');
    }
  }, [history, tournamentType]);

  return (
    <>
      <TournamentSettingsTopBar />
      <EliminationSettings />
    </>
  );
};

export default Elimination;
