import React, { useState } from 'react';
import Colors from 'src/styles/colors';
import Typography from '@material-ui/core/Typography';

import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles, List, Button } from '@material-ui/core';
import PlayerStatsListItem from './PlayerStatsListItem';
import { RootState } from 'src/store/features';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  icon: {
    color: Colors.white,
    cursor: 'pointer',
  },
});

interface Props {}

const PlayerStatsHeader = (props: Props) => {
  const playerStats = useSelector((state: RootState) => state.playerStats);

  const [open, setOpen] = useState(false);

  const handleHorizontalBarIconClick = () => {
    setOpen((state) => !state);
  };

  const classes = useStyles();
  return (
    <div
      style={{
        height: open ? (playerStats.data.length + 1) * 70 : 60,
        transition: 'height 200ms linear',
        background: Colors.sideColor,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 1,
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
      <div
        style={{
          background: Colors.sideColor,
          width: 400,
        }}
      >
        <List style={{ background: Colors.sideColor }}>
          {playerStats.data.map((el) => (
            <PlayerStatsListItem name={el.name} />
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

export default PlayerStatsHeader;
