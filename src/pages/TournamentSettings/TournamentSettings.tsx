import React from 'react';
import EliminationSettings from '../../components/EiminationSettings/EiminationSettings';
import TournamentSettingsTopBar from '../../components/TopBar/TournamentSettingsTopBar/TournamentSettingsTopBar';

interface Props {}

const Elimination = (props: Props) => {
  return (
    <div>
      <TournamentSettingsTopBar />
      <EliminationSettings />
    </div>
  );
};

export default Elimination;
