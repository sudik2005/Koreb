/**
 * KOREB — Natural Cosmetics
 * src/context/LanguageContext.jsx
 * Context providing language state (en/am), toggle handler, and translations.
 * Defaults to 'am' (Amharic) for Ethiopian clientele, with seamless English toggle.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext({
  lang: 'am',
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('koreb_lang');
      return saved === 'en' || saved === 'am' ? saved : 'am';
    } catch {
      return 'am';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('koreb_lang', lang);
    } catch {
      // Ignore localStorage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'am' ? 'en' : 'am'));
  };

  const t = (key) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.am;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
