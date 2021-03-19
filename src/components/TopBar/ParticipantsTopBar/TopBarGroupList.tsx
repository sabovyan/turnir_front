import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  Tooltip,
  withStyles,
  Zoom,
} from '@material-ui/core';

import ImportIcon from '@material-ui/icons/SystemUpdateAlt';
import colors from '../../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/features';
// import { setTournamentPlayers } from '../../../store/features/settingsInfo';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const TopBarGroupList = () => {
  const { groups, players } = useSelector((state: RootState) => state);

  const [selectedGroup, setSelectedGroup] = useState<number | 'all' | false>(
    false,
  );

  const handleListItemClick = (id: number | 'all') => {
    setSelectedGroup((state) => (id === state ? false : id));
  };

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (id: number | 'all') => () => {
    handleListItemClick(id);

    if (id === selectedGroup) {
      // dispatch(setTournamentPlayers({ players: [] }));
    } else {
      if (id === 'all') {
        const currentPlayers = players.map(({ name, id }) => ({ name, id }));
        // dispatch(setTournamentPlayers({ players: currentPlayers }));
        return;
      }

      const currentGroup = groups.find((group) => id === group.id);

      if (!currentGroup) return;

      const currentPlayers = currentGroup.players.map(({ name, id }) => ({
        name,
        id,
      }));
      // dispatch(setTournamentPlayers({ players: currentPlayers }));
    }
    // setAnchorEl(null);
  };

  return (
    <>
      <Tooltip TransitionComponent={Zoom} title="Import players">
        <IconButton aria-label="import players" onClick={handleClick}>
          <ImportIcon style={{ fontSize: '2rem' }} />
        </IconButton>
      </Tooltip>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          key="all"
          data-id={'all'}
          button
          onClick={handleMenuItemClick('all')}
          style={{
            background: selectedGroup === 'all' ? colors.green : 'white',
            color: selectedGroup === 'all' ? colors.white : 'black',
            minWidth: '200px',
          }}
        >
          <ListItemText primary={'All'} />
        </MenuItem>

        {groups &&
          groups.map((group) => (
            <MenuItem
              key={group.id}
              data-id={group.id}
              button
              onClick={handleMenuItemClick(group.id)}
              style={{
                background: selectedGroup === group.id ? colors.green : 'white',
                color: selectedGroup === group.id ? colors.white : 'black',
                minWidth: '200px',
              }}
            >
              <ListItemText primary={group.name} />
            </MenuItem>
          ))}
      </StyledMenu>
    </>
  );
};

export default TopBarGroupList;
