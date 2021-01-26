import React from 'react';

import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  topBar: {
    margin: 0,
    padding: '10px 1rem',
    justifyContent: 'space-between',
    minHeight: 80,
  },
});

const BasicTopBar = ({ children }: AppBarProps) => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="transparent" className={classes.topBar}>
      {children}
    </AppBar>
  );
};

export default BasicTopBar;
