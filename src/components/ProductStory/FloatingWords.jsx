/**
 * KOREB — Natural Cosmetics
 * src/components/ProductStory/FloatingWords.jsx
 * Floating parallax field around the product frame,
 * rendering floating ingredient words and transparent botanical cutouts.
 * Supports Amharic and English translations.
 */

import React from 'react';
import Cutout from '../Cutout';
import { useLanguage } from '../../context/LanguageContext';

export default function FloatingWords({ chapters, parallaxRefs }) {
  const { lang } = useLanguage();
  const isAm = lang === 'am';

  return (
    <div className="parallax-field" id="parallaxField" aria-hidden="true">
      {chapters.map((ch, idx) => (
        <div
          key={ch.id}
          ref={(el) => (parallaxRefs.current[idx] = el)}
          className="chapter-parallax-group"
          data-chapter={idx}
        >
          {ch.floatingItems.map((item, i) => {
            const word = isAm && item.wordAm ? item.wordAm : item.word;
            return (
              <div
                key={i}
                className="floating-item"
                style={{ '--x': item.x, '--y': item.y }}
                data-side={parseFloat(item.x) < 40 ? 'left' : parseFloat(item.x) > 60 ? 'right' : 'center'}
                data-speed={item.speed}
                data-threshold={item.threshold}
              >
                {item.cutout && <Cutout name={item.cutout} className="floating-cutout" />}
                <span className="floating-word">{word}</span>
              </div>
            );
          })}

          {ch.floatingCutoutsOnly.map((cutoutItem, j) => (
            <Cutout
              key={j}
              name={cutoutItem.cutout}
              className="floating-cutout-only"
              style={{
                '--x': cutoutItem.x,
                '--y': cutoutItem.y,
                '--size': cutoutItem.size
              }}
              speed={cutoutItem.speed}
              threshold={cutoutItem.threshold}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
