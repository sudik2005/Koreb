/**
 * KOREB — Natural Cosmetics
 * src/hooks/useHeroVideo.js
 * Manages the procedural hero video playback, intersection observer, and cleanup.
 */

import { useEffect, useRef } from 'react';
import { createProceduralVideoController } from '../utils/media';

export function useHeroVideo(videoRef, sectionRef) {
  const ctrlRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    const sectionEl = sectionRef.current;
    if (!videoEl || !sectionEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ctrl = createProceduralVideoController(videoEl, 'hero');
    ctrlRef.current = ctrl;

    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !prefersReducedMotion.matches) {
              ctrl?.play();
            } else {
              ctrl?.pause();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(sectionEl);
    } else if (!prefersReducedMotion.matches) {
      ctrl?.play();
    }

    const onMotionChange = (e) => {
      if (e.matches) {
        ctrl?.pause();
      } else if (observer) {
        // Observer handles intersection
      } else {
        ctrl?.play();
      }
    };
    prefersReducedMotion.addEventListener('change', onMotionChange);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      prefersReducedMotion.removeEventListener('change', onMotionChange);
      if (ctrl) {
        ctrl.dispose();
      }
      ctrlRef.current = null;
    };
  }, [videoRef, sectionRef]);
}
