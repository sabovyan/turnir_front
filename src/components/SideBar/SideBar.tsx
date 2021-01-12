import React, { FC, useState } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import GamepadIcon from '@material-ui/icons/Gamepad';
import HomeIcon from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';

import './SideBar.css';
import { Backdrop } from '@material-ui/core';

const SideBar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [SettingsVisible, setSettingsVisible] = useState<boolean>(true);

  const handleToggleDrawer = (event: any) => {
    if (
      !(event.target.parentNode.tagName === 'svg') &&
      !(event.target.parentNode.tagName === 'div') &&
      !(event.target.parentNode.tagName === 'DIV')
    ) {
      setOpen((state) => !state);
    }
  };

  const handleToggleSettings = () => {
    setSettingsVisible((state) => !state);
  };

  return (
    <div>
      <Backdrop
        open={SettingsVisible}
        style={{
          justifyContent: 'flex-start',
        }}
      ></Backdrop>
      <section
        className={clsx('sidebar__container', {
          sideBar__withSettings: SettingsVisible,
        })}
      >
        <div
          className={clsx('settings', {
            settings__open: SettingsVisible,
            settings__close: !SettingsVisible,
          })}
        >
          settings
        </div>
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
                <GamepadIcon style={{ color: 'green' }} />
              </ListItemIcon>
              <ListItemText primary={'turnir'} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <HomeIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>

            <ListItem button onClick={handleToggleSettings}>
              <ListItemIcon>
                <Settings style={{ color: 'white' }} />
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
      </section>
    </div>
  );
};

export default SideBar;
