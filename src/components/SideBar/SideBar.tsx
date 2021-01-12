import React, { ChangeEvent, FC, useState } from 'react';
/* MAterial ui */
import clsx from 'clsx';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

/* components */
import SideBarList from '../SideBarList/SideBarList';

import './SideBar.css';

const colors = {
  green: '#54fd54',
  white: '#ffffffce',
};

const languages: string[] = ['Armenian', 'English', 'Russian'];

const SideBar: FC = () => {
  const [SettingsVisible, setSettingsVisible] = useState<boolean>(true);
  const [active, setActive] = useState<string>('settings');

  const [selectedLang, setSelectedLang] = useState<string>(languages[1]);

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
