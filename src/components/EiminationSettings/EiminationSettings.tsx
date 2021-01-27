import { Paper } from '@material-ui/core';
import React from 'react';
import Goals from '../Goals/Goals';
import Tables from '../Tables/Tables';
import WinningSets from '../WinningSets/WinningSets';

const EliminationSettings = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        outline: 'none',
        margin: '1rem',
      }}
    >
      <Paper
        elevation={6}
        style={{
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
        }}
      >
        <Tables />
        <Goals />
        <WinningSets />
      </Paper>
    </div>
  );
};

export default EliminationSettings;
