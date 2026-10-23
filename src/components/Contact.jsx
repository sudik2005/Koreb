/**
 * KOREB — Natural Cosmetics
 * src/components/Contact.jsx
 * Contact apothecary card, Instagram direct-order call-to-action button, and footer.
 */

import React from 'react';
import Footer from './Footer';
import '../styles/contact.css';

export default function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contactHeading">
      <div className="contact-card">
        <p className="contact-eyebrow">Personal apothecary service</p>
        <h2 className="contact-heading" id="contactHeading">
          Order or ask a question
        </h2>
        <p className="contact-body">
          All orders and product questions happen directly on Instagram. Send us a message with the
          oils or creams you would like, and we will arrange your order personally.
        </p>
        <a
          href="https://instagram.com/yamy16082"
          target="_blank"
          rel="noopener noreferrer"
          className="ig-button"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span>Message @yamy16082 on Instagram</span>
        </a>
      </div>

      <Footer />
    </section>
  );
}
