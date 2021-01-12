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

const colors = {
  green: '#54fd54',
  white: '#ffffffce',
};

interface Props {
  handleToggleSettings: () => void;
  active: string;
}

const SideBarList: FC<Props> = ({ handleToggleSettings, active }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleDrawer = (event: any) => {
    if (
      !(event.target.parentNode.tagName === 'svg') &&
      !(event.target.parentNode.tagName === 'DIV')
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
      <div>
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
                color: active === 'settings' ? colors.green : colors.white,
              }}
            />
          </ListItemIcon>
          <ListItemText primary={'Settings'} />
        </ListItem>
      </div>
      <div>
        <ListItem button style={{ margin: '10px 0' }}>
          <ListItemIcon>
            <PersonIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Login'} />
        </ListItem>
      </div>
    </List>
  );
};

export default SideBarList;
