/**
 * KOREB — Natural Cosmetics
 * src/App.jsx
 * Main application layout assembling SkipLink, Header, Hero, ProductStory, and Contact.
 * Wrapped in LanguageProvider supporting Amharic & English.
 */

import React, { useRef } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductStory from './components/ProductStory';
import Contact from './components/Contact';

function AppContent() {
  const headerBrandRef = useRef(null);
  const { t } = useLanguage();

  return (
    <>
      <a href="#range-story" className="skip-link">
        {t('skipLink')}
      </a>

      {/* Soft Golden-Light Texture Overlay for Section Transitions */}
      <div className="golden-light-overlay" id="goldenLightOverlay" aria-hidden="true"></div>

      <Header ref={headerBrandRef} />

      <main id="top">
        <Hero />
        <ProductStory headerBrandRef={headerBrandRef} />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
