import React, { useState } from 'react';
import Colors from 'src/styles/colors';
import Typography from '@material-ui/core/Typography';

import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ListItem, makeStyles, List, Button } from '@material-ui/core';
import playerStatsConfig from 'src/constants/playerStatsConfig';

interface Props {}

const useStyles = makeStyles({
  icon: {
    color: Colors.white,
    cursor: 'pointer',
  },

  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    background: Colors.sideColor,
    color: Colors.white,
    padding: 16,
  },
});

const PlayerStats = (props: Props) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleHorizontalBarIconClick = () => {
    setOpen((state) => !state);
  };

  return (
    <div
      style={{
        height: 60,
        background: Colors.sideColor,
        minWidth: 400,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <Typography></Typography>
        {open ? (
          <CloseIcon
            className={classes.icon}
            onClick={handleHorizontalBarIconClick}
          />
        ) : (
          <SettingsIcon
            className={classes.icon}
            onClick={handleHorizontalBarIconClick}
          />
        )}
      </div>
      <div style={{ background: Colors.sideColor }}>
        <List style={{ background: Colors.sideColor }}>
          {playerStatsConfig.map((el) => (
            <ListItem className={classes.listItem}>
              <Typography variant="body2">{el.name}</Typography>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <PowerSettingsNewIcon />
                <VisibilityIcon />
              </div>
            </ListItem>
          ))}
        </List>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            style={{
              color: Colors.white,
            }}
          >
            {'more'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
