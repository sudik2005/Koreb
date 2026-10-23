/**
 * KOREB — Natural Cosmetics
 * src/App.jsx
 * Main application layout assembling SkipLink, Header, Hero, ProductStory, and Contact.
 */

import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductStory from './components/ProductStory';
import Contact from './components/Contact';

export default function App() {
  const headerBrandRef = useRef(null);

  return (
    <>
      <a href="#range-story" className="skip-link">
        Skip to product range
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
