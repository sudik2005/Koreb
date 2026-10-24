/**
 * KOREB — Natural Cosmetics
 * src/components/ProductStory/ChapterCopy.jsx
 * Left column rendering the 5 product text chapters with index, title, size, and body copy.
 */

import React from 'react';

export default function ChapterCopy({ chapters, copyRefs }) {
  return (
    <div className="copy-column">
      {chapters.map((ch, idx) => {
        const isFirst = idx === 0;
        return (
          <article
            key={ch.id}
            ref={(el) => (copyRefs.current[idx] = el)}
            className={`chapter-copy ${isFirst ? 'is-interactive' : ''}`}
            data-chapter={idx}
            style={isFirst ? { opacity: 1, transform: 'translateY(0)' } : undefined}
          >
            <span className="chapter-index">{ch.chapterIndex}</span>
            <h2 className="chapter-title">{ch.title}</h2>
            <span className="chapter-size">{ch.size}</span>
            <p className="chapter-sentence">{ch.sentence}</p>
            {ch.importance && (
              <div className="chapter-importance">
                <span className="chapter-importance-label">Why it&apos;s essential</span>
                <p className="chapter-importance-text">{ch.importance}</p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
