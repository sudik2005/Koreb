/**
 * KOREB — Natural Cosmetics
 * src/hooks/useStoryScroll.js
 * High-performance, requestAnimationFrame-throttled story scroll hook.
 *
 * Updates DOM styles directly via refs to avoid React re-renders on scroll.
 * Uses React state only for discrete changes (activeChapter).
 * Properly disposes video controllers, observers, and listeners on unmount.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { createProceduralVideoController } from '../utils/media';

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function useStoryScroll({
  trackRef,
  progressFillRef,
  headerBrandRef,
  glowRefs,
  videoRefs,
  copyRefs,
  slideRefs,
  parallaxRefs,
  chapterCount = 5
}) {
  const [activeChapter, setActiveChapter] = useState(0);
  const activeChapterRef = useRef(0);
  const rafPendingRef = useRef(false);
  const rafIdRef = useRef(null);
  const videoControllersRef = useRef([]);

  const jumpToChapter = useCallback(
    (targetIdx) => {
      const trackEl = trackRef.current;
      if (!trackEl) return;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const trackTop = trackEl.offsetTop;
      const scrollable = trackEl.offsetHeight - window.innerHeight;
      const targetScroll = trackTop + ((targetIdx + 0.15) / chapterCount) * scrollable;
      window.scrollTo({
        top: targetScroll,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
      });
    },
    [trackRef, chapterCount]
  );

  useEffect(() => {
    // 1. Initialize background video controllers for each chapter
    const controllers = [];
    videoRefs.current.forEach((vidEl, idx) => {
      if (vidEl) {
        const ctrl = createProceduralVideoController(vidEl, 'ch' + idx);
        controllers.push(ctrl);
      } else {
        controllers.push(null);
      }
    });
    videoControllersRef.current = controllers;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateStoryOnFrame() {
      rafPendingRef.current = false;
      const trackEl = trackRef.current;
      if (!trackEl) return;

      const viewportH = window.innerHeight;
      const reduced = prefersReducedMotion.matches;
      const scrollY = window.scrollY;

      // 1. Toggle mini KOREB brand in header once past hero wordmark
      const headerBrand = headerBrandRef?.current || document.getElementById('headerBrand');
      if (headerBrand) {
        if (scrollY > viewportH * 0.55) {
          headerBrand.classList.add('is-visible');
        } else {
          headerBrand.classList.remove('is-visible');
        }
      }

      // 2. Calculate normalized progress [0..1] inside the 500vh story track
      const rect = trackEl.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - viewportH);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = clamp(rawProgress, 0, 1);

      // Update thin amber progress line on the left edge directly on DOM node
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleY(${progress.toFixed(4)})`;
      }

      // Map overall progress [0..1] to continuous chapter coordinate [0..4.999]
      const scaled = progress * chapterCount;
      const currentIdx = clamp(Math.floor(scaled), 0, chapterCount - 1);
      const chapterLocalProgress = clamp(scaled - currentIdx, 0, 1);

      // Discrete change only: update active chapter state
      if (currentIdx !== activeChapterRef.current) {
        activeChapterRef.current = currentIdx;
        setActiveChapter(currentIdx);
      }

      // Determine smooth crossfade weights for each chapter
      const isStoryInViewport = rect.bottom > 0 && rect.top < viewportH;

      for (let i = 0; i < chapterCount; i++) {
        let weight = 0;
        if (i === currentIdx) {
          if (i < chapterCount - 1 && chapterLocalProgress > 0.78) {
            weight = 1 - (chapterLocalProgress - 0.78) / 0.22;
          } else {
            weight = 1;
          }
        } else if (i === currentIdx + 1 && chapterLocalProgress > 0.78) {
          weight = (chapterLocalProgress - 0.78) / 0.22;
        }

        weight = clamp(weight, 0, 1);

        // 2a. Background radial glow crossfade
        const glowEl = glowRefs.current[i];
        if (glowEl) {
          glowEl.style.opacity = weight.toFixed(3);
        }

        // 2b. Chapter background video opacity & off-screen pause management
        const videoEl = videoRefs.current[i];
        const ctrl = videoControllersRef.current[i];
        if (videoEl) {
          const vidOpacity = weight * 0.44;
          videoEl.style.opacity = vidOpacity.toFixed(3);
          if (ctrl) {
            if (isStoryInViewport && weight > 0.05 && !reduced) {
              ctrl.play();
            } else {
              ctrl.pause();
            }
          }
        }

        // 2c. Left column product copy fade & subtle vertical lift
        const copyEl = copyRefs.current[i];
        if (copyEl) {
          const yOffset = reduced ? 0 : (1 - weight) * 22;
          copyEl.style.opacity = weight.toFixed(3);
          copyEl.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
          copyEl.classList.toggle('is-interactive', weight > 0.5);
        }

        // 2d. Right column tall product photo crossfade + slow zoom
        const slideEl = slideRefs.current[i];
        if (slideEl) {
          const localFactor = i === currentIdx ? chapterLocalProgress : (i < currentIdx ? 1 : 0);
          const scale = reduced ? 1 : 1 + localFactor * 0.065;
          slideEl.style.opacity = weight.toFixed(3);
          slideEl.style.transform = `scale(${scale.toFixed(4)})`;
        }

        // 2e. Floating words & cutouts parallax drift
        const parallaxEl = parallaxRefs.current[i];
        if (parallaxEl) {
          parallaxEl.style.opacity = weight.toFixed(3);
          if (weight > 0.01) {
            const items = parallaxEl.querySelectorAll('[data-speed]');
            const localP = i === currentIdx ? chapterLocalProgress : (i < currentIdx ? 1 : 0);

            items.forEach((item) => {
              const speed = parseFloat(item.getAttribute('data-speed') || '1');
              const threshold = parseFloat(item.getAttribute('data-threshold') || '0');

              const itemReveal = reduced
                ? 1
                : clamp((localP - threshold * 0.65) / 0.22, 0, 1);

              const driftY = reduced
                ? 0
                : (0.5 - localP) * 95 * speed;

              item.style.opacity = (itemReveal * weight).toFixed(3);
              item.style.transform = `translate3d(-50%, ${driftY.toFixed(1)}px, 0)`;
            });
          }
        }
      }
    }

    function onScroll() {
      if (!rafPendingRef.current) {
        rafPendingRef.current = true;
        rafIdRef.current = requestAnimationFrame(updateStoryOnFrame);
      }
    }

    const onMotionChange = (e) => {
      if (e.matches) {
        videoControllersRef.current.forEach((ctrl) => ctrl?.pause());
      }
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    prefersReducedMotion.addEventListener('change', onMotionChange);

    // Initial pass
    updateStoryOnFrame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      prefersReducedMotion.removeEventListener('change', onMotionChange);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      videoControllersRef.current.forEach((ctrl) => ctrl?.dispose());
      videoControllersRef.current = [];
    };
  }, [
    trackRef,
    progressFillRef,
    headerBrandRef,
    glowRefs,
    videoRefs,
    copyRefs,
    slideRefs,
    parallaxRefs,
    chapterCount
  ]);

  return { activeChapter, jumpToChapter };
}
