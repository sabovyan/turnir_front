import React, { FC, useState } from 'react';

/* UI Components */
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
/* ICONS */
import PersonIcon from '@material-ui/icons/Person';
import GamepadIcon from '@material-ui/icons/Gamepad';
import HomeIcon from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import colors from '../../styles/colors';

import './SideBarList.css';

interface Props {
  handleToggleSettings: () => void;
  activeSettings: string;
  personIconClick: () => void;
}

const SideBarList: FC<Props> = ({
  handleToggleSettings,
  activeSettings,
  personIconClick,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  /* ANCHOR Here is any */
  const handleToggleDrawer = (event: any) => {
    if (
      !(event.target.tagName === 'svg') &&
      !(event.target.tagName === 'path') &&
      !(event.target.tagName === 'DIV') &&
      !(event.target.tagName === 'div')
    ) {
      setOpen((state) => !state);
    }
  };

  return (
    <List
      onClick={handleToggleDrawer}
      className={clsx('list', {
        'list-open': open,
        'list-close': !open,
      })}
    >
      <span>
        <ListItem style={{ margin: '0 0 10px 0' }}>
          <ListItemIcon>
            <GamepadIcon style={{ color: colors.green }} />
          </ListItemIcon>
          <ListItemText primary={'TURNIR'} style={{ color: colors.green }} />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <HomeIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>

        <ListItem button onClick={handleToggleSettings}>
          <ListItemIcon>
            <Settings
              style={{
                color:
                  activeSettings === 'settings' ? colors.green : colors.white,
              }}
            />
          </ListItemIcon>
          <ListItemText primary={'Settings'} />
        </ListItem>
      </span>
      <span>
        <ListItem button style={{ margin: '0' }} onClick={personIconClick}>
          <ListItemIcon>
            <PersonIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Login'} />
        </ListItem>
      </span>
    </List>
  );
};

export default SideBarList;
