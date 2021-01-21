import React, { ChangeEvent, useState } from 'react';

import { ThemeProvider } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import greenTheme from '../../styles/theme';
import { LangValue } from '../../types/main.types';
import FormField from '../Input/FormField';

type lang = {
  name: string;
  value: LangValue;
};

const languages: lang[] = [
  { name: 'Հայերեն', value: 'hy' },
  { name: 'English', value: 'en' },
  { name: 'Русский', value: 'ru' },
];

interface Props {}

const SideBarAppSettings = (props: Props) => {
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
    <>
      <Typography
        color="textSecondary"
        variant="body1"
        component="h3"
        style={{ marginBottom: '1rem' }}
      >
        {t('Language')}
      </Typography>
      <ThemeProvider theme={greenTheme}>
        <FormField
          select
          value={selectedLang}
          onChange={handleLanguageChange}
          label=""
          style={{ margin: 10, width: 300 }}
          fullWidth={false}
        >
          {languages.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </FormField>
      </ThemeProvider>
    </>
  );
};

export default SideBarAppSettings;
