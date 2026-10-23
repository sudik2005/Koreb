/**
 * KOREB — Natural Cosmetics
 * src/components/ProductStory/ProgressRail.jsx
 * Thin amber left-edge progress indicator and chapter dot quick-jump buttons.
 */

import React from 'react';

export default function ProgressRail({
  progressFillRef,
  chapters,
  activeChapter,
  onJump
}) {
  return (
    <>
      <div className="progress-rail" aria-hidden="true">
        <div className="progress-fill" ref={progressFillRef} id="progressFill"></div>
      </div>

      <div className="chapter-dots" role="navigation" aria-label="Product chapters">
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            className={`chapter-dot-btn ${activeChapter === idx ? 'is-active' : ''}`}
            data-jump={idx}
            aria-label={ch.dotLabel}
            onClick={() => onJump(idx)}
          >
            <span></span>
          </button>
        ))}
      </div>
    </>
  );
}
