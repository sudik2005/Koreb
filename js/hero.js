/**
 * KOREB — Natural Cosmetics
 * js/hero.js
 * Hero wordmark animation and ambient hero video playback/observer.
 */

(function () {
    'use strict';

    window.KOREB = window.KOREB || {};

    function initHero() {
        const heroSection = document.getElementById('heroSection');
        const heroVideo = document.getElementById('heroVideo');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (heroVideo && window.KOREB.createProceduralVideoController) {
            const heroCtrl = window.KOREB.createProceduralVideoController(heroVideo, 'hero');
            if (heroCtrl && window.KOREB.activeVideoRenderers) {
                window.KOREB.activeVideoRenderers.set(heroVideo, heroCtrl);

                // Pause hero video when scrolled off-screen
                if ('IntersectionObserver' in window && heroSection) {
                    const heroObserver = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting && !prefersReducedMotion.matches) {
                                    heroCtrl.play();
                                } else {
                                    heroCtrl.pause();
                                }
                            });
                        },
                        { threshold: 0.05 }
                    );
                    heroObserver.observe(heroSection);
                } else if (!prefersReducedMotion.matches) {
                    heroCtrl.play();
                }
            }
        }
    }

    window.KOREB.initHero = initHero;
})();
