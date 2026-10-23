# KOREB — Natural Cosmetics (React + Vite)

A modern, high-performance scroll-driven showcase website for **KOREB**, a boutique natural cosmetics brand specializing in cold-pressed botanical hair oils and nourishing skin creams.

Built with **React 18** and **Vite** (JavaScript, no router, zero UI libraries), preserving 100% visual and behavioral parity with the original design.

---

## Key Features & Architecture

- **Zero Scroll Re-renders**: The scroll story engine (`useStoryScroll`) runs inside a `requestAnimationFrame`-throttled loop and mutates DOM styles directly via refs. React state is triggered only for discrete events (updating the active chapter dot and accessibility attributes).
- **React.StrictMode Ready**: All event listeners, observers, canvas animations, and video streams clean up cleanly upon unmount.
- **Dual-Mode Media Engine**: Automatically detects whether real `.mp4`/`.webm` or poster images are present in `public/assets/`. If absent, live procedural canvas video loops and poster data-URIs render seamlessly.
- **Automated Canvas Retouching**: Fixes product photos for Chapter 1 (Face Cream) and Chapter 3 (Face Oil) to ensure labels display "KOREB", with a safe fallback ensuring original photos display if browser canvas restrictions occur.
- **Mobile Responsive Layout**: Responsive media queries re-order the story stage on mobile devices (`max-width: 960px`) to place the arched product frame on top (`54%` height) and chapter copy below (`46%` height).
- **Accessibility**: Includes skip navigation link, ARIA attributes, semantic heading hierarchy, keyboard focus styling, and `prefers-reduced-motion` compliance.

---

## Project Structure

```
koreb/
├── index.html                   # Vite HTML entry point with Google Fonts
├── koreb.html                   # Original monolithic HTML backup (untouched)
├── package.json                 # React + Vite dependencies & scripts
├── vite.config.js               # Vite configuration with React plugin
├── README.md                    # Project documentation & run guide
├── public/
│   └── assets/                  # Static assets served at /assets/...
│       ├── images/
│       │   ├── products/        # Product photos (1-rosemary-hair-oil.jpg ... 5-castor-oil.jpg)
│       │   └── posters/         # Poster frames for videos (reserved for real .jpg files)
│       ├── video/               # Video loops (reserved for real .mp4 and .webm files)
│       └── cutouts/             # Reserved for real transparent cutout images
└── src/
    ├── main.jsx                 # React root render with StrictMode & global CSS
    ├── App.jsx                  # Main single-page layout (Header, Hero, Story, Contact)
    ├── data/
    │   └── chapters.js          # Complete 5-chapter text, badge, and media data dictionary
    ├── components/
    │   ├── Cutout.jsx           # Botanical SVG component (13 botanical vector shapes)
    │   ├── Header.jsx           # Minimalist floating header & revealable mini brand mark
    │   ├── Hero.jsx             # Hero section with animated wordmark and video loop
    │   ├── Contact.jsx          # Frosted glass card with Instagram order CTA
    │   ├── Footer.jsx           # Minimal brand footer
    │   └── ProductStory/
    │       ├── index.jsx        # Pinned 500vh stage container
    │       ├── ProgressRail.jsx # Left-edge progress indicator & jump dots
    │       ├── ChapterCopy.jsx  # Left column product copy articles
    │       ├── ProductFrame.jsx # Arched product frame with canvas photo retouching
    │       └── FloatingWords.jsx# Parallax field with floating badges and cutouts
    ├── hooks/
    │   ├── useHeroVideo.js      # Hero video lifecycle & viewport intersection observer
    │   └── useStoryScroll.js    # Ref-based rAF scroll loop & discrete chapter tracking
    ├── utils/
    │   ├── media.js             # Procedural video/poster generator with real-file fallback
    │   └── retouch.js           # Canvas retouching for Face Cream & Face Oil labels
    └── styles/
        ├── base.css             # Tokens, typography, reset, focus outlines, skip link
        ├── header.css           # Header bar, mini brand mark, golden overlay
        ├── hero.css             # Fullscreen hero layout, wordmark keyframe animation
        ├── story.css            # Pinned stage, frame, progress rail, dots, cutouts
        ├── contact.css          # Contact card, Instagram CTA button, footer
        └── responsive.css       # Mobile breakpoints and prefers-reduced-motion overrides
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Builds the static production bundle into the `dist/` folder.

### 4. Preview Production Build
```bash
npm run preview
```

---

## How to Replace Assets with Real Files

All assets are located in `public/assets/`. Because they are in the `public/` folder, Vite serves them directly at `/assets/...`, preserving existing paths.

### 1. Replacing Product Photos
Product photos are stored in `public/assets/images/products/`:

| Filename | Product | Element / Slide |
| :--- | :--- | :--- |
| `1-rosemary-hair-oil.jpg` | Rosemary Strengthening Hair Oil | Slide 1 (`#prodImg0`) |
| `2-face-cream.jpg` | Natural Face Cream | Slide 2 (`#prodImg1`) |
| `3-natural-hair-oil.jpg` | 12-Botanical Natural Hair Oil | Slide 3 (`#prodImg2`) |
| `4-face-oil.jpg` | Revitalizing Face Oil | Slide 4 (`#prodImg3`) |
| `5-castor-oil.jpg` | Organic Castor Oil | Slide 5 (`#prodImg4`) |

### 2. Adding Real Video Files
Place `.mp4` and/or `.webm` video files into `public/assets/video/`:
- **Hero Video**: `hero-oil-drip.webm` and `hero-oil-drip.mp4`
- **Chapter 1 (Rosemary)**: `ch1-rosemary-loop.webm` and `ch1-rosemary-loop.mp4`
- **Chapter 2 (Resin)**: `ch2-resin-loop.webm` and `ch2-resin-loop.mp4`
- **Chapter 3 (Spices & Golden Oil)**: `ch3-spices-loop.webm` and `ch3-spices-loop.mp4`
- **Chapter 4 (Amber Light)**: `ch4-amber-light-loop.webm` and `ch4-amber-light-loop.mp4`
- **Chapter 5 (Castor Leaves)**: `ch5-castor-leaves-loop.webm` and `ch5-castor-leaves-loop.mp4`

*Note: Once these files are placed, the player automatically uses them in place of the synthesized procedural animations.*

### 3. Adding Real Video Posters
Place poster stills into `public/assets/images/posters/`:
- `hero-oil-drip-poster.jpg`
- `ch1-rosemary-poster.jpg`
- `ch2-resin-poster.jpg`
- `ch3-spices-poster.jpg`
- `ch4-amber-light-poster.jpg`
- `ch5-castor-leaves-poster.jpg`

---

## Canvas Retouching Note

HTML5 Canvas pixel manipulation requires standard HTTP/HTTPS serving (Vite's dev server or any static web server). If opened directly from the filesystem via `file://`, browser security policies bypass canvas pixel export; the built-in safe fallback automatically keeps the original photo visible without throwing errors.
