import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LangValue } from './types/main.types';

const languages: LangValue[] = ['en', 'ru', 'hy'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    // debug: true,
    whitelist: languages,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
