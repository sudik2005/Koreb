/**
 * KOREB — Natural Cosmetics
 * src/components/ProductStory/ChapterCopy.jsx
 * Left column rendering the 5 product text chapters with index, title, size,
 * description, and why it's essential.
 * Supports both Amharic (አማርኛ) and English dynamically.
 */

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function ChapterCopy({ chapters, copyRefs }) {
  const { lang, t } = useLanguage();
  const isAm = lang === 'am';

  return (
    <div className="copy-column">
      {chapters.map((ch, idx) => {
        const isFirst = idx === 0;
        const title = isAm && ch.titleAm ? ch.titleAm : ch.title;
        const size = isAm && ch.sizeAm ? ch.sizeAm : ch.size;
        const sentence = isAm && ch.sentenceAm ? ch.sentenceAm : ch.sentence;
        const importance = isAm && ch.importanceAm ? ch.importanceAm : ch.importance;

        return (
          <article
            key={ch.id}
            ref={(el) => (copyRefs.current[idx] = el)}
            className={`chapter-copy ${isFirst ? 'is-interactive' : ''}`}
            data-chapter={idx}
            style={isFirst ? { opacity: 1, transform: 'translateY(0)' } : undefined}
          >
            <span className="chapter-index">{ch.chapterIndex}</span>
            <h2 className="chapter-title">{title}</h2>
            <span className="chapter-size">{size}</span>
            <p className="chapter-sentence">{sentence}</p>
            {importance && (
              <div className="chapter-importance">
                <span className="chapter-importance-label">{t('whyEssential')}</span>
                <p className="chapter-importance-text">{importance}</p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
