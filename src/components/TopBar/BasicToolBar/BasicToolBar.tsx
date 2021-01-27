import React from 'react';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  toolbar: {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
});

const BasicToolBar = ({ children, ...props }: ToolbarProps) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar} {...props}>
      {children}
    </Toolbar>
  );
};

export default BasicToolBar;
