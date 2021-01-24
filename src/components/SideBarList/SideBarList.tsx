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

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useAuth from '../../services/authentication';

import './SideBarList.css';
import svg from '../../assets/tournaments.svg';

interface ISideBarList {
  handleSettingsIconClick: () => void;
  activeSettings: boolean;
  personIconClick: () => void;
}

const SideBarList: FC<ISideBarList> = ({
  handleSettingsIconClick,
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
      !(event.target.tagName === 'div') &&
      !(event.target.tagName === 'IMG')
    ) {
      setOpen((state) => !state);
    }
  };

  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useAuth();

  const handleHomeIconClick = () => {
    history.push('/');
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

        <ListItem button onClick={handleHomeIconClick}>
          <ListItemIcon>
            <HomeIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={t('Home')} />
        </ListItem>

        <ListItem button onClick={handleSettingsIconClick}>
          <ListItemIcon>
            <Settings
              style={{
                color: activeSettings ? colors.green : colors.white,
              }}
            />
          </ListItemIcon>
          <ListItemText primary={t('Settings')} />
        </ListItem>
      </span>
      <span>
        <ListItem button style={{ margin: '0' }} onClick={personIconClick}>
          <ListItemIcon>
            {!user ? (
              <PersonIcon style={{ color: 'white' }} />
            ) : (
              <img src={svg} alt="logged users" width="25" />
            )}
          </ListItemIcon>
          <ListItemText primary={user ? user.displayName : t('Login')} />
        </ListItem>
      </span>
    </List>
  );
};

export default SideBarList;
