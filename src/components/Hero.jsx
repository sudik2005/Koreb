/**
 * KOREB — Natural Cosmetics
 * src/components/Hero.jsx
 * Fullscreen hero section with letter-by-letter rising wordmark,
 * procedural video loop with real-media fallback, and scroll cue.
 */

import React, { useRef } from 'react';
import { useHeroVideo } from '../hooks/useHeroVideo';
import '../styles/hero.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useHeroVideo(videoRef, sectionRef);

  return (
    <>
      <section
        className="hero"
        id="heroSection"
        ref={sectionRef}
        aria-label="Introduction"
      >
        <div className="hero-media-wrap" aria-hidden="true">
          <video
            ref={videoRef}
            id="heroVideo"
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="assets/images/posters/hero-oil-drip-poster.jpg"
          >
            <source src="assets/video/hero-oil-drip.webm" type="video/webm" />
            <source src="assets/video/hero-oil-drip.mp4" type="video/mp4" />
          </video>
          <div className="hero-vignette"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-wordmark" aria-label="KOREB">
            <span className="hero-letter" aria-hidden="true">K</span>
            <span className="hero-letter" aria-hidden="true">O</span>
            <span className="hero-letter" aria-hidden="true">R</span>
            <span className="hero-letter" aria-hidden="true">E</span>
            <span className="hero-letter" aria-hidden="true">B</span>
          </h1>
          <p className="hero-tagline">Natural oils and creams for your hair and skin.</p>
        </div>

        <a href="#range-story" className="hero-scroll-cue">
          <span>Scroll to meet the range</span>
          <span className="hero-scroll-line" aria-hidden="true"></span>
        </a>
      </section>

      <div className="section-transition-veil" aria-hidden="true"></div>
    </>
  );
}
