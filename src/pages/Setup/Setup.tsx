import React from 'react';

import SetupTopBar from '../../components/TopBar/SetuptopBar/SetupTopBar';
import SetupList from './SetupList';

interface Props {}

const Setup = (props: Props) => {
  return (
    <div>
      <SetupTopBar />
      <div style={{ display: 'flex', height: 'calc(100vh - 85px)' }}>
        <SetupList />
      </div>
    </div>
  );
};

export default Setup;
