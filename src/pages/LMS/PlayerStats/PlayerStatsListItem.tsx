import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Colors from 'src/styles/colors';

interface Props {}

const useStyles = makeStyles({
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    background: Colors.sideColor,
    color: Colors.white,
    padding: 16,
  },
});

interface Props {
  name: string;
}

const PlayerStatsListItem = ({ name }: Props) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem} style={{ height: 50 }}>
      <Typography variant="body2">{name}</Typography>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <PowerSettingsNewIcon />
        <VisibilityIcon />
      </div>
    </ListItem>
  );
};

export default PlayerStatsListItem;
