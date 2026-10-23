/**
 * KOREB — Natural Cosmetics
 * src/components/ProductStory/index.jsx
 * Pinned 500vh product story stage coordinating progress, glow layers,
 * background videos, chapter text, arched product frame, and parallax floating words.
 */

import React, { useRef } from 'react';
import { CHAPTERS } from '../../data/chapters';
import { useStoryScroll } from '../../hooks/useStoryScroll';
import ProgressRail from './ProgressRail';
import ChapterCopy from './ChapterCopy';
import ProductFrame from './ProductFrame';
import FloatingWords from './FloatingWords';
import '../../styles/story.css';

export default function ProductStory({ headerBrandRef }) {
  const trackRef = useRef(null);
  const progressFillRef = useRef(null);
  const glowRefs = useRef([]);
  const videoRefs = useRef([]);
  const copyRefs = useRef([]);
  const slideRefs = useRef([]);
  const parallaxRefs = useRef([]);

  const { activeChapter, jumpToChapter } = useStoryScroll({
    trackRef,
    progressFillRef,
    headerBrandRef,
    glowRefs,
    videoRefs,
    copyRefs,
    slideRefs,
    parallaxRefs,
    chapterCount: CHAPTERS.length
  });

  return (
    <>
      <section className="story-track" id="range-story" ref={trackRef} aria-label="Product range">
        <div className="story-stage" id="storyStage">
          {/* Left Edge Thin Amber Progress Line & Navigation Dots */}
          <ProgressRail
            progressFillRef={progressFillRef}
            chapters={CHAPTERS}
            activeChapter={activeChapter}
            onJump={jumpToChapter}
          />

          {/* Crossfading Radial Background Glows */}
          <div className="glow-layers" aria-hidden="true">
            {CHAPTERS.map((ch, idx) => (
              <div
                key={ch.id}
                ref={(el) => (glowRefs.current[idx] = el)}
                className="glow-layer"
                data-chapter={idx}
                style={idx === 0 ? { opacity: 1 } : undefined}
              ></div>
            ))}
          </div>

          {/* Seamless Looping Chapter Background Videos */}
          <div className="bg-video-layers" aria-hidden="true">
            {CHAPTERS.map((ch, idx) => (
              <video
                key={ch.id}
                ref={(el) => (videoRefs.current[idx] = el)}
                className="chapter-bg-video"
                data-chapter={idx}
                muted
                loop
                playsInline
                preload="none"
                poster={ch.media.poster}
              >
                <source src={ch.media.webm} type="video/webm" />
                <source src={ch.media.mp4} type="video/mp4" />
              </video>
            ))}
          </div>

          <div className="stage-vignette" aria-hidden="true"></div>

          {/* Stage Foreground Grid */}
          <div className="stage-inner">
            <ChapterCopy chapters={CHAPTERS} copyRefs={copyRefs} />

            <div className="visual-column">
              <ProductFrame chapters={CHAPTERS} slideRefs={slideRefs} />
              <FloatingWords chapters={CHAPTERS} parallaxRefs={parallaxRefs} />
            </div>
          </div>
        </div>
      </section>

      <div className="section-transition-veil" aria-hidden="true"></div>
    </>
  );
}
