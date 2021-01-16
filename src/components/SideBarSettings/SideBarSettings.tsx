import React, { ChangeEvent, FC, useState } from 'react';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import colors from '../../styles/colors';
import CloseButton from '../Buttons/CloseButton/CloseButton';

const languages: string[] = ['Հայերեն', 'English', 'Русский'];

interface sideBarSettingsProps {
  settingsVisible: boolean;
  handleToggleSettings: () => void;
}

const SideBarSettings: FC<sideBarSettingsProps> = ({
  settingsVisible,
  handleToggleSettings,
}) => {
  const [selectedLang, setSelectedLang] = useState<string>(languages[1]);
  const handleLanguageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedLang(event.target.value);
  };

  return (
    <div
      className={clsx('settings', {
        settings__open: settingsVisible,
        settings__close: !settingsVisible,
      })}
    >
      <CloseButton
        onClick={handleToggleSettings}
        style={{ color: colors.white }}
      />

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
  );
};

export default SideBarSettings;
