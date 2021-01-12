import React, { ChangeEvent, FC, useState } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import GamepadIcon from '@material-ui/icons/Gamepad';
import HomeIcon from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import {
  Backdrop,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import './SideBar.css';
import greenTheme from '../../styles/theme';
import SideBarList from '../SideBarList/SideBarList';

const colors = {
  green: '#54fd54',
  white: '#ffffffce',
};

const languages: string[] = ['Armenian', 'English', 'Russian'];

const SideBar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [SettingsVisible, setSettingsVisible] = useState<boolean>(true);
  const [active, setActive] = useState<string>('settings');

  const [selectedLang, setSelectedLang] = useState<string>(languages[1]);

  const handleToggleDrawer = (event: any) => {
    if (
      !(event.target.parentNode.tagName === 'svg') &&
      !(event.target.parentNode.tagName === 'DIV')
    ) {
      setOpen((state) => !state);
    }
  };

  const handleToggleSettings = () => {
    if (SettingsVisible) {
      setActive('none');
    } else {
      setActive('settings');
    }
    setSettingsVisible((state) => !state);
  };

  const handleLanguageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedLang(event.target.value);
  };

  return (
    <div>
      <Backdrop
        onClick={handleToggleSettings}
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
          <IconButton
            onClick={handleToggleSettings}
            style={{ color: colors.white }}
          >
            <CloseIcon />
          </IconButton>
          <Paper
            elevation={3}
            style={{ background: 'white', width: '100%', height: '100%' }}
          >
            <Typography
              color="textSecondary"
              variant="body1"
              component="h3"
              style={{ margin: '20px 10px' }}
            >
              Language
            </Typography>
            <TextField
              id="standard-select-currency"
              select
              value={selectedLang}
              onChange={handleLanguageChange}
              fullWidth
            >
              {languages.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Paper>
        </div>
        <SideBarList
          active={active}
          handleToggleSettings={handleToggleSettings}
        />
      </section>
    </div>
  );
};

export default SideBar;
