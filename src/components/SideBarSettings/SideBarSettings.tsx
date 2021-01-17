import React, { ChangeEvent, FC, useState } from 'react';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import colors from '../../styles/colors';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import { useTranslation } from 'react-i18next';
import { LangValue } from '../../types/main.types';

type lang = {
  name: string;
  value: LangValue;
};

const languages: lang[] = [
  { name: 'Հայերեն', value: 'hy' },
  { name: 'English', value: 'en' },
  { name: 'Русский', value: 'ru' },
];

interface sideBarSettingsProps {
  settingsVisible: boolean;
  handleToggleSettings: () => void;
}

const SideBarSettings: FC<sideBarSettingsProps> = ({
  settingsVisible,
  handleToggleSettings,
}) => {
  const { i18n } = useTranslation();

  const [selectedLang, setSelectedLang] = useState<LangValue>(
    i18n.language as LangValue,
  );

  const handleLanguageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedLang(event.target.value as LangValue);
    i18n.changeLanguage(event.target.value);
    console.log(i18n.language);
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
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Paper>
    </div>
  );
};

export default SideBarSettings;
