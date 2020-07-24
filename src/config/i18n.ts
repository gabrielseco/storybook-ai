import { i18nConfiguration } from '@rogal/react-translate';

import commonES from '@locales/es/common.json';
import commonEN from '@locales/en/common.json';

export const i18nConfig = {
  languages: ['es', 'en'],
  translations: {
    es: {
      common: commonES
    },
    en: {
      common: commonEN
    }
  },
  fallbackLng: 'en',
  language: 'en'
};

export const i18n = i18nConfiguration(i18nConfig);
