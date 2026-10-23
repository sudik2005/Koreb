/**
 * KOREB — Natural Cosmetics
 * js/cutouts.js
 * Botanical SVG cutouts generator and DOM injector.
 * Populates [data-cutout] img elements with crisp, transparent SVG data URIs.
 */

(function () {
    'use strict';

    window.KOREB = window.KOREB || {};

    const CUTOUT_SVGS = {
        rosemary: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M22 98 C44 74, 70 46, 98 18" stroke="#6E8458" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M34 84 C26 70, 24 58, 30 50 C36 58, 38 72, 34 84 Z" fill="#7E9B68"/>
  <path d="M46 72 C36 56, 36 44, 43 36 C49 46, 50 60, 46 72 Z" fill="#9DB397"/>
  <path d="M58 58 C48 44, 49 32, 56 24 C62 34, 62 47, 58 58 Z" fill="#73905E"/>
  <path d="M72 44 C63 31, 64 20, 71 14 C76 22, 76 34, 72 44 Z" fill="#9DB397"/>
  <path d="M40 80 C54 84, 66 82, 74 75 C64 70, 50 73, 40 80 Z" fill="#688454"/>
  <path d="M52 66 C67 70, 79 68, 86 61 C76 56, 62 59, 52 66 Z" fill="#88A472"/>
  <path d="M66 52 C80 55, 91 53, 98 46 C88 42, 75 45, 66 52 Z" fill="#73905E"/>
  <path d="M80 36 C91 39, 100 37, 106 31 C98 28, 87 30, 80 36 Z" fill="#9DB397"/>
</svg>`,

        castor: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <ellipse cx="48" cy="64" rx="22" ry="30" transform="rotate(-18 48 64)" fill="#5C3620" stroke="#D69A38" stroke-width="1.5"/>
  <path d="M38 44 C46 52, 42 74, 52 84" stroke="#D6A96A" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M52 42 C58 56, 54 68, 60 80" stroke="#C89250" stroke-width="2.2" stroke-linecap="round"/>
  <ellipse cx="43" cy="36" rx="6" ry="4" transform="rotate(-18 43 36)" fill="#E5C89E"/>
  <ellipse cx="77" cy="60" rx="19" ry="26" transform="rotate(16 77 60)" fill="#4A2A18" stroke="#C88A32" stroke-width="1.5"/>
  <path d="M72 42 C78 54, 74 68, 80 78" stroke="#D6A96A" stroke-width="2.2" stroke-linecap="round"/>
</svg>`,

        cinnamon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M22 84 L82 24 L98 40 L38 100 Z" fill="#8C4A27"/>
  <path d="M28 89 L88 29" stroke="#B66E3E" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="90" cy="32" rx="11" ry="6" transform="rotate(45 90 32)" fill="#5A2B13" stroke="#C8824C" stroke-width="2"/>
  <ellipse cx="30" cy="92" rx="11" ry="6" transform="rotate(45 30 92)" fill="#6D371A" stroke="#C8824C" stroke-width="2"/>
</svg>`,

        turmeric: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M20 68 C18 52, 34 42, 54 44 C72 45, 92 38, 98 54 C104 68, 86 82, 64 80 C44 79, 22 82, 20 68 Z" fill="#B8732A"/>
  <path d="M36 52 C42 62, 42 70, 38 76 M58 46 C62 58, 62 68, 58 78" stroke="#8F5319" stroke-width="2" stroke-linecap="round"/>
  <circle cx="84" cy="60" r="15" fill="#E88D14" stroke="#B86814" stroke-width="2.5"/>
  <circle cx="84" cy="60" r="9" fill="#FFA726"/>
</svg>`,

        almond: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M60 18 C84 38, 92 70, 76 92 C66 104, 54 104, 44 92 C28 70, 36 38, 60 18 Z" fill="#B5743B" stroke="#E0A96D" stroke-width="1.5"/>
  <path d="M60 26 C68 48, 68 74, 60 94 M50 38 C54 56, 54 74, 49 88 M70 38 C66 56, 66 74, 71 88" stroke="#8C5222" stroke-width="1.6" stroke-linecap="round"/>
</svg>`,

        flax: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <ellipse cx="42" cy="48" rx="9" ry="16" transform="rotate(-28 42 48)" fill="#7A4924" stroke="#C9935B" stroke-width="1.2"/>
  <ellipse cx="74" cy="44" rx="9" ry="16" transform="rotate(22 74 44)" fill="#8B542B" stroke="#C9935B" stroke-width="1.2"/>
  <ellipse cx="58" cy="74" rx="9" ry="16" transform="rotate(8 58 74)" fill="#6B3E1D" stroke="#C9935B" stroke-width="1.2"/>
  <ellipse cx="82" cy="76" rx="8" ry="14" transform="rotate(-35 82 76)" fill="#7A4924" stroke="#C9935B" stroke-width="1.2"/>
</svg>`,

        blackcumin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M36 42 L48 34 L44 50 Z" fill="#232824" stroke="#9DB397" stroke-width="1.2"/>
  <path d="M66 36 L80 42 L68 52 Z" fill="#1D221E" stroke="#9DB397" stroke-width="1.2"/>
  <path d="M52 62 L66 56 L60 72 Z" fill="#2A302B" stroke="#D69A38" stroke-width="1.2"/>
  <path d="M34 72 L48 68 L42 82 Z" fill="#232824" stroke="#9DB397" stroke-width="1.2"/>
  <path d="M74 68 L88 64 L80 80 Z" fill="#1D221E" stroke="#D69A38" stroke-width="1.2"/>
</svg>`,

        beetroot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <circle cx="60" cy="64" r="32" fill="#6E1933" stroke="#A63456" stroke-width="2"/>
  <circle cx="60" cy="64" r="23" fill="none" stroke="#932849" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="60" cy="64" r="14" fill="none" stroke="#B84366" stroke-width="1.8"/>
  <circle cx="60" cy="64" r="5" fill="#D45B7F"/>
</svg>`,

        coconut: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M22 56 A38 38 0 0 0 98 56 Z" fill="#5A3821"/>
  <path d="M28 56 A32 32 0 0 0 92 56 Z" fill="#F4EDE2"/>
  <path d="M38 56 A22 22 0 0 0 82 56 Z" fill="#DFD3C3"/>
</svg>`,

        basil: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M26 94 C24 54, 52 24, 94 22 C92 64, 64 92, 26 94 Z" fill="#5F8D4E" stroke="#9DB397" stroke-width="1.5"/>
  <path d="M26 94 C48 72, 70 48, 94 22" stroke="#A8C69F" stroke-width="2" stroke-linecap="round"/>
  <path d="M46 74 C44 58, 52 48, 64 46 M62 58 C60 46, 68 38, 78 36" stroke="#8FB385" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,

        resin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M36 70 C30 54, 44 38, 60 42 C76 45, 84 62, 74 76 C64 88, 42 84, 36 70 Z" fill="#DDA448" stroke="#F4D088" stroke-width="1.5"/>
  <circle cx="52" cy="56" r="6" fill="#F8E0A6" opacity="0.65"/>
  <circle cx="78" cy="44" r="10" fill="#C6862C" stroke="#EAB965" stroke-width="1.2"/>
</svg>`,

        boswellia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M24 92 C46 70, 70 46, 94 24" stroke="#8C7A5B" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="42" cy="66" rx="10" ry="6" transform="rotate(-35 42 66)" fill="#8B9E70"/>
  <ellipse cx="58" cy="50" rx="10" ry="6" transform="rotate(-35 58 50)" fill="#9DB397"/>
  <ellipse cx="74" cy="34" rx="9" ry="5" transform="rotate(-35 74 34)" fill="#8B9E70"/>
  <ellipse cx="54" cy="78" rx="10" ry="6" transform="rotate(25 54 78)" fill="#7A8E60"/>
  <ellipse cx="70" cy="62" rx="10" ry="6" transform="rotate(25 70 62)" fill="#9DB397"/>
</svg>`,

        droplet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M60 20 C60 20, 88 56, 88 76 A28 28 0 0 1 32 76 C32 56, 60 20, 60 20 Z" fill="#D69A38" stroke="#F3C979" stroke-width="1.8"/>
  <path d="M48 68 C46 78, 52 88, 62 90" stroke="#FFF2D6" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
</svg>`
    };

    function injectBotanicalCutouts() {
        const cutoutImgs = document.querySelectorAll('[data-cutout]');
        cutoutImgs.forEach((img) => {
            const type = img.getAttribute('data-cutout');
            const svg = CUTOUT_SVGS[type] || CUTOUT_SVGS.droplet;
            img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
        });
    }

    window.KOREB.CUTOUT_SVGS = CUTOUT_SVGS;
    window.KOREB.injectBotanicalCutouts = injectBotanicalCutouts;
})();
