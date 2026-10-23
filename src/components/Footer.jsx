/**
 * KOREB — Natural Cosmetics
 * src/components/Footer.jsx
 * Minimalist site footer with KOREB brand mark and contact phone number.
 */

import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-brand">KOREB</span>
      <a
        href="tel:+251924249494"
        className="footer-handle"
      >
        +251 924 249 494
      </a>
    </footer>
  );
}
