// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEN from './languages/en.json';
import translationTE from './languages/te.json';

const resources = {
  en: {
    translation: translationEN,
  },
  te: {
    translation: translationTE,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false // This helps prevent issues during initial load
    }
  });
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    i18n.changeLanguage(savedLanguage);
  }
export default i18n;