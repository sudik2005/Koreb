/**
 * KOREB — Natural Cosmetics
 * src/components/Header.jsx
 * Floating header bar with revealable mini brand mark and in-page navigation links.
 */

import React, { forwardRef } from 'react';
import '../styles/header.css';

const Header = forwardRef(function Header(props, ref) {
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
          The range
        </a>
        <a href="#contact" className="header-link">
          Order
        </a>
      </nav>
    </header>
  );
});

export default Header;
