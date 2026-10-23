/**
 * KOREB — Natural Cosmetics
 * src/components/Footer.jsx
 * Minimalist site footer with KOREB brand mark and Instagram handle.
 */

import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-brand">KOREB</span>
      <a
        href="https://instagram.com/yamy16082"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-handle"
      >
        @yamy16082
      </a>
    </footer>
  );
}
