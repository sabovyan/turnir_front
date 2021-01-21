import React, { ChangeEvent, FC, useState } from 'react';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import colors from '../../styles/colors';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import { useTranslation } from 'react-i18next';
import { LangValue, SettingsContent } from '../../types/main.types';
import FormField from '../Input/FormField';
import greenTheme from '../../styles/theme';
import { ThemeProvider } from '@material-ui/core';
import SideBarAppSettings from '../SideBarAppSettings/SideBarAppSettings';
import SideBarProfileSettings from '../SideBarProfileSettings/SideBarProfileSettings';

type lang = {
  name: string;
  value: LangValue;
};

const languages: lang[] = [
  { name: 'Հայերեն', value: 'hy' },
  { name: 'English', value: 'en' },
  { name: 'Русский', value: 'ru' },
];

interface ISideBarSettingsProps {
  settingsVisible: boolean;
  handleToggleSettings: () => void;
  settingsContent: SettingsContent;
}

const SideBarSettings: FC<ISideBarSettingsProps> = ({
  settingsVisible,
  handleToggleSettings,
  settingsContent,
}) => {
  const { i18n, t } = useTranslation();

  const [selectedLang, setSelectedLang] = useState<LangValue>(
    i18n.language as LangValue,
  );

  const handleLanguageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedLang(event.target.value as LangValue);
    i18n.changeLanguage(event.target.value);
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
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '10px',
        }}
      >
        {settingsContent === 'profile' ? (
          <SideBarProfileSettings />
        ) : (
          <SideBarAppSettings />
        )}
      </Paper>
    </div>
  );
};

export default SideBarSettings;
