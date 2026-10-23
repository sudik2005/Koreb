/**
 * KOREB — Natural Cosmetics
 * js/main.js
 * Main application coordinator:
 * - Bootstraps cutouts injection, photo retouching, hero controller, and story stage
 * - Manages reduced-motion accessibility changes
 * - Registers global scroll & resize event listeners
 */

(function () {
    'use strict';

    window.KOREB = window.KOREB || {};

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function init() {
        // 1. Inject transparent botanical cutouts
        if (typeof window.KOREB.injectBotanicalCutouts === 'function') {
            window.KOREB.injectBotanicalCutouts();
        }

        // 2. Retouch photos #2 (Face Cream) & #4 (Face Oil) so only "KOREB" appears
        const prodImg1 = document.getElementById('prodImg1');
        const prodImg3 = document.getElementById('prodImg3');
        if (prodImg1 && typeof window.KOREB.retouchFaceCreamPhoto === 'function') {
            window.KOREB.retouchFaceCreamPhoto(prodImg1);
        }
        if (prodImg3 && typeof window.KOREB.retouchFaceOilPhoto === 'function') {
            window.KOREB.retouchFaceOilPhoto(prodImg3);
        }

        // 3. Initialize Hero Video & IntersectionObserver
        if (typeof window.KOREB.initHero === 'function') {
            window.KOREB.initHero();
        }

        // 4. Initialize Story Track, Background Videos & Navigation Dots
        if (typeof window.KOREB.initStory === 'function') {
            window.KOREB.initStory();
        }

        // 5. Listen for prefers-reduced-motion system changes
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches && window.KOREB.activeVideoRenderers) {
                window.KOREB.activeVideoRenderers.forEach((ctrl) => {
                    if (ctrl && typeof ctrl.pause === 'function') {
                        ctrl.pause();
                    }
                });
            }
            if (typeof window.KOREB.onScroll === 'function') {
                window.KOREB.onScroll();
            }
        });

        // 6. Bind scroll & resize listeners with passive flags
        if (typeof window.KOREB.onScroll === 'function') {
            window.addEventListener('scroll', window.KOREB.onScroll, { passive: true });
            window.addEventListener('resize', window.KOREB.onScroll, { passive: true });
        }

        // 7. Initial render pass
        if (typeof window.KOREB.updateStoryOnFrame === 'function') {
            window.KOREB.updateStoryOnFrame();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
