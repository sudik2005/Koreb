/**
 * KOREB — Natural Cosmetics
 * js/story.js
 * Scroll-driven product story engine:
 * - 5-chapter pinned scroll progress calculation
 * - Thin amber progress rail scaling
 * - Header brand indicator toggling
 * - Radial glow & ambient background video crossfading
 * - Product copy translation and crossfading
 * - Product photo frame crossfade and subtle zoom
 * - Staggered floating ingredient words & botanical cutouts parallax drift
 * - Chapter navigation dot interactions
 */

(function () {
    'use strict';

    window.KOREB = window.KOREB || {};

    let storyTrack = null;
    let progressFill = null;
    let headerBrand = null;

    let glowLayers = [];
    let bgVideos = [];
    let copyArticles = [];
    let productSlides = [];
    let parallaxGroups = [];
    let chapterDots = [];

    const TOTAL_CHAPTERS = 5;
    let currentScrollY = window.scrollY;
    let rafPending = false;
    let activeChapterIndex = -1;

    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    function updateStoryOnFrame() {
        rafPending = false;
        if (!storyTrack) return;

        const viewportH = window.innerHeight;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const reduced = prefersReducedMotion.matches;

        // 1. Toggle mini KOREB brand in header once past hero wordmark
        if (headerBrand) {
            if (currentScrollY > viewportH * 0.55) {
                headerBrand.classList.add('is-visible');
            } else {
                headerBrand.classList.remove('is-visible');
            }
        }

        // 2. Calculate normalized progress [0..1] inside the 500vh story track
        const rect = storyTrack.getBoundingClientRect();
        const scrollableDistance = Math.max(1, rect.height - viewportH);
        const rawProgress = -rect.top / scrollableDistance;
        const progress = clamp(rawProgress, 0, 1);

        // Update thin amber progress line on the left edge
        if (progressFill) {
            progressFill.style.transform = `scaleY(${progress.toFixed(4)})`;
        }

        // Map overall progress [0..1] to continuous chapter coordinate [0..4.999]
        const scaled = progress * TOTAL_CHAPTERS;
        const currentIdx = clamp(Math.floor(scaled), 0, TOTAL_CHAPTERS - 1);
        const chapterLocalProgress = clamp(scaled - currentIdx, 0, 1);

        // Update active dot indicator
        if (currentIdx !== activeChapterIndex) {
            activeChapterIndex = currentIdx;
            chapterDots.forEach((btn, idx) => {
                btn.classList.toggle('is-active', idx === currentIdx);
            });
        }

        // Determine smooth crossfade weights for each of the 5 chapters
        const isStoryInViewport = rect.bottom > 0 && rect.top < viewportH;
        const activeRenderers = window.KOREB.activeVideoRenderers;

        for (let i = 0; i < TOTAL_CHAPTERS; i++) {
            let weight = 0;
            if (i === currentIdx) {
                // Fade out near the end of chapter (0.78 -> 1.0) unless it's the final chapter
                if (i < TOTAL_CHAPTERS - 1 && chapterLocalProgress > 0.78) {
                    weight = 1 - (chapterLocalProgress - 0.78) / 0.22;
                } else {
                    weight = 1;
                }
            } else if (i === currentIdx + 1 && chapterLocalProgress > 0.78) {
                weight = (chapterLocalProgress - 0.78) / 0.22;
            }

            weight = clamp(weight, 0, 1);

            // 2a. Background radial glow crossfade
            if (glowLayers[i]) {
                glowLayers[i].style.opacity = weight.toFixed(3);
            }

            // 2b. Chapter background video opacity & off-screen pause management
            if (bgVideos[i]) {
                const vidOpacity = weight * 0.44;
                bgVideos[i].style.opacity = vidOpacity.toFixed(3);
                if (activeRenderers) {
                    const ctrl = activeRenderers.get(bgVideos[i]);
                    if (ctrl) {
                        if (isStoryInViewport && weight > 0.05 && !reduced) {
                            ctrl.play();
                        } else {
                            ctrl.pause();
                        }
                    }
                }
            }

            // 2c. Left column product copy fade & subtle vertical lift
            if (copyArticles[i]) {
                const yOffset = reduced ? 0 : (1 - weight) * 22;
                copyArticles[i].style.opacity = weight.toFixed(3);
                copyArticles[i].style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
                copyArticles[i].classList.toggle('is-interactive', weight > 0.5);
            }

            // 2d. Right column tall product photo crossfade + slow zoom (1.0 -> 1.065)
            if (productSlides[i]) {
                const localFactor = i === currentIdx ? chapterLocalProgress : (i < currentIdx ? 1 : 0);
                const scale = reduced ? 1 : 1 + localFactor * 0.065;
                productSlides[i].style.opacity = weight.toFixed(3);
                productSlides[i].style.transform = `scale(${scale.toFixed(4)})`;
            }

            // 2e. Floating italic ingredient/benefit words & botanical cutouts (staggered appearance + upward parallax drift)
            if (parallaxGroups[i]) {
                parallaxGroups[i].style.opacity = weight.toFixed(3);
                if (weight > 0.01) {
                    const items = parallaxGroups[i].querySelectorAll('[data-speed]');
                    const localP = i === currentIdx ? chapterLocalProgress : (i < currentIdx ? 1 : 0);

                    items.forEach((item) => {
                        const speed = parseFloat(item.getAttribute('data-speed') || '1');
                        const threshold = parseFloat(item.getAttribute('data-threshold') || '0');

                        // Appear one at a time as chapter progresses past each word's threshold
                        const itemReveal = reduced
                            ? 1
                            : clamp((localP - threshold * 0.65) / 0.22, 0, 1);

                        // Drift upward at different speeds
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
        currentScrollY = window.scrollY;
        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(updateStoryOnFrame);
        }
    }

    function initStory() {
        storyTrack = document.getElementById('range-story');
        progressFill = document.getElementById('progressFill');
        headerBrand = document.getElementById('headerBrand');

        glowLayers = Array.from(document.querySelectorAll('.glow-layer'));
        bgVideos = Array.from(document.querySelectorAll('.chapter-bg-video'));
        copyArticles = Array.from(document.querySelectorAll('.chapter-copy'));
        productSlides = Array.from(document.querySelectorAll('.product-slide'));
        parallaxGroups = Array.from(document.querySelectorAll('.chapter-parallax-group'));
        chapterDots = Array.from(document.querySelectorAll('.chapter-dot-btn'));

        // Initialize background procedural video controllers
        if (window.KOREB.createProceduralVideoController && window.KOREB.activeVideoRenderers) {
            bgVideos.forEach((vid, idx) => {
                const ctrl = window.KOREB.createProceduralVideoController(vid, 'ch' + idx);
                if (ctrl) {
                    window.KOREB.activeVideoRenderers.set(vid, ctrl);
                }
            });
        }

        // Chapter navigation dot click handlers
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        chapterDots.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (!storyTrack) return;
                const targetIdx = parseInt(btn.getAttribute('data-jump'), 10);
                const trackTop = storyTrack.offsetTop;
                const scrollable = storyTrack.offsetHeight - window.innerHeight;
                const targetScroll = trackTop + ((targetIdx + 0.15) / TOTAL_CHAPTERS) * scrollable;
                window.scrollTo({
                    top: targetScroll,
                    behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
                });
            });
        });
    }

    window.KOREB.initStory = initStory;
    window.KOREB.updateStoryOnFrame = updateStoryOnFrame;
    window.KOREB.onScroll = onScroll;
})();
