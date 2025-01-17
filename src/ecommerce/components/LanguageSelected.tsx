// src/components/LanguageSelector.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (event: any) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>{t('common.language')}</InputLabel>
      <Select
        value={i18n.language}
        label={t('common.language')}
        onChange={changeLanguage}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="te">తెలుగు</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;