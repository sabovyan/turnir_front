import React from 'react';
import EliminationGameRectangle from '../../components/EliminationGameRectangle/EliminationGameRectangle';

import SetupTopBar from '../../components/TopBar/SetuptopBar/SetupTopBar';
import SetupList from './SetupList';

interface Props {}

const Setup = (props: Props) => {
  return (
    <div>
      <SetupTopBar />
      <div style={{ display: 'flex', height: 'calc(100vh - 85px)' }}>
        <SetupList />
        <div style={{ padding: '2rem' }}>
          <h1>hello</h1>
          <EliminationGameRectangle
            player1={'alpha'}
            player2={'betta'}
            isGameStarted
          />
        </div>
      </div>
    </div>
  );
};

export default Setup;
