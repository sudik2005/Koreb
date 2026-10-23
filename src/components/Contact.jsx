/**
 * KOREB — Natural Cosmetics
 * src/components/Contact.jsx
 * Contact apothecary card, phone order call-to-action button, and footer.
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
          All orders and product questions happen directly by phone. Call us with the oils or
          creams you would like, and we will arrange your order personally.
        </p>
        <a
          href="tel:+251924249494"
          className="contact-button"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call +251 924 249 494</span>
        </a>
      </div>

      <Footer />
    </section>
  );
}
