import { Paper } from '@material-ui/core';
import React from 'react';
import FormField from '../Input/FormField';
import Tables from '../Tables/Tables';

const EliminationSettings = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '80vh',
        outline: 'none',
      }}
    >
      <Paper
        elevation={4}
        style={{ width: '400px', display: 'flex', flexDirection: 'column' }}
      >
        <Tables />
        <FormField label="" />
        <FormField label="" />
        <FormField label="" />
        <FormField label="" />
      </Paper>
    </div>
  );
};

export default EliminationSettings;
