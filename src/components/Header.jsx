/**
 * KOREB — Natural Cosmetics
 * src/components/Header.jsx
 * Floating header bar with revealable mini brand mark, in-page navigation links,
 * and Amharic / English language switcher.
 */

import React, { forwardRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/header.css';

const Header = forwardRef(function Header(props, ref) {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="site-header">
      <a
        ref={ref}
        href="#top"
        className="brand-mini"
        id="headerBrand"
        aria-label="KOREB home"
      >
        KOREB
      </a>
      <nav className="header-nav" aria-label="Primary">
        <a href="#range-story" className="header-link">
          {t('navRange')}
        </a>
        <a href="#contact" className="header-link">
          {t('navOrder')}
        </a>
        <button
          type="button"
          className="lang-toggle-btn"
          onClick={toggleLang}
          aria-label={t('switchLangAria')}
          title={lang === 'am' ? 'Switch to English' : 'ወደ አማርኛ ቀይር'}
        >
          <span className={`lang-label ${lang === 'am' ? 'is-active' : ''}`}>አማ</span>
          <span className="lang-sep">/</span>
          <span className={`lang-label ${lang === 'en' ? 'is-active' : ''}`}>EN</span>
        </button>
      </nav>
    </header>
  );
});

export default Header;
