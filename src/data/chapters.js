/**
 * KOREB — Natural Cosmetics
 * src/data/chapters.js
 * Complete content dictionary for the 5-chapter product story.
 * Preserves exact wording, coordinates, parallax thresholds, and asset paths.
 */

export const CHAPTERS = [
  {
    id: 0,
    chapterIndex: '01 / 05',
    title: 'Rosemary strengthening hair oil',
    size: '100 ml / 3.4 fl oz',
    sentence: 'Infused with fresh rosemary in an amber glass dropper bottle for daily scalp and strand care.',
    dotLabel: 'Jump to Rosemary strengthening hair oil',
    productImage: {
      id: 'prodImg0',
      src: 'assets/images/products/1-rosemary-hair-oil.jpg',
      alt: 'KOREB Rosemary strengthening hair oil, 100 ml amber glass dropper bottle with gold collar and cream label beside fresh green rosemary sprigs on warm wood.',
      retouchType: null,
      loading: undefined
    },
    media: {
      sceneType: 'ch0',
      poster: 'assets/images/posters/ch1-rosemary-poster.jpg',
      webm: 'assets/video/ch1-rosemary-loop.webm',
      mp4: 'assets/video/ch1-rosemary-loop.mp4'
    },
    floatingItems: [
      { x: '10%', y: '22%', speed: 1.15, threshold: 0.06, cutout: 'rosemary', word: 'Rosemary' },
      { x: '86%', y: '34%', speed: 0.82, threshold: 0.22, word: 'Strengthening' },
      { x: '14%', y: '68%', speed: 1.35, threshold: 0.38, word: 'Hair oil' },
      { x: '84%', y: '76%', speed: 0.95, threshold: 0.52, cutout: 'droplet', word: '100 ml / 3.4 fl oz' }
    ],
    floatingCutoutsOnly: [
      { x: '88%', y: '14%', size: '64px', speed: 1.45, threshold: 0.12, cutout: 'rosemary' }
    ]
  },
  {
    id: 1,
    chapterIndex: '02 / 05',
    title: 'Natural face cream',
    size: 'Small-batch apothecary jar',
    sentence: 'A rich, comforting cream crafted with aromatic tree resins to keep skin soft and supple.',
    dotLabel: 'Jump to Natural face cream',
    productImage: {
      id: 'prodImg1',
      src: 'assets/images/products/2-face-cream.jpg',
      alt: 'KOREB Natural face cream in white-lidded jars with dusty rose labels arranged on travertine stone with golden resin tears beneath a Boswellia tree.',
      retouchType: 'cream',
      loading: 'lazy'
    },
    media: {
      sceneType: 'ch1',
      poster: 'assets/images/posters/ch2-resin-poster.jpg',
      webm: 'assets/video/ch2-resin-loop.webm',
      mp4: 'assets/video/ch2-resin-loop.mp4'
    },
    floatingItems: [
      { x: '12%', y: '24%', speed: 1.1, threshold: 0.08, cutout: 'resin', word: 'Natural face cream' },
      { x: '86%', y: '32%', speed: 0.88, threshold: 0.24, word: 'Aromatic resin' },
      { x: '14%', y: '72%', speed: 1.28, threshold: 0.40, cutout: 'boswellia', word: 'Botanical moisture' },
      { x: '84%', y: '74%', speed: 0.92, threshold: 0.54, word: 'Soft & supple' }
    ],
    floatingCutoutsOnly: []
  },
  {
    id: 2,
    chapterIndex: '03 / 05',
    title: 'Natural hair oil',
    size: '330 g',
    sentence: 'Twelve whole seeds, roots, oils, and warm spices cold-infused into a golden conditioning oil.',
    dotLabel: 'Jump to Natural hair oil',
    productImage: {
      id: 'prodImg2',
      src: 'assets/images/products/3-natural-hair-oil.jpg',
      alt: 'KOREB Natural hair oil, 330 g clear bottle filled with golden oil surrounded by cinnamon sticks, turmeric root, almonds, flax seeds, rosemary, and basil on carved wood.',
      retouchType: null,
      loading: 'lazy'
    },
    media: {
      sceneType: 'ch2',
      poster: 'assets/images/posters/ch3-spices-poster.jpg',
      webm: 'assets/video/ch3-spices-loop.webm',
      mp4: 'assets/video/ch3-spices-loop.mp4'
    },
    floatingItems: [
      { x: '8%', y: '10%', speed: 1.18, threshold: 0.02, cutout: 'castor', word: 'Castor oil' },
      { x: '86%', y: '12%', speed: 0.86, threshold: 0.08, cutout: 'flax', word: 'Flax seed' },
      { x: '6%', y: '26%', speed: 1.34, threshold: 0.14, cutout: 'rosemary', word: 'Rosemary' },
      { x: '90%', y: '27%', speed: 1.05, threshold: 0.20, cutout: 'blackcumin', word: 'Black cumin' },
      { x: '10%', y: '42%', speed: 0.92, threshold: 0.26, cutout: 'turmeric', word: 'Turmeric' },
      { x: '88%', y: '43%', speed: 1.26, threshold: 0.32, cutout: 'cinnamon', word: 'Cinnamon' },
      { x: '7%', y: '58%', speed: 1.12, threshold: 0.38, cutout: 'almond', word: 'Almond' },
      { x: '89%', y: '59%', speed: 0.84, threshold: 0.44, cutout: 'droplet', word: 'Olive oil' },
      { x: '11%', y: '74%', speed: 1.30, threshold: 0.50, cutout: 'coconut', word: 'Coconut' },
      { x: '86%', y: '75%', speed: 0.98, threshold: 0.56, word: 'Niger seed' },
      { x: '18%', y: '89%', speed: 1.16, threshold: 0.62, word: 'Pumpkin oil' },
      { x: '80%', y: '90%', speed: 1.22, threshold: 0.68, cutout: 'beetroot', word: 'Beet root' }
    ],
    floatingCutoutsOnly: [
      { x: '50%', y: '6%', size: '54px', speed: 1.4, threshold: 0.18, cutout: 'basil' }
    ]
  },
  {
    id: 3,
    chapterIndex: '04 / 05',
    title: 'Face oil',
    size: '100 ml / 3.4 fl oz',
    sentence: 'An organic and nourishing revitalizing blend in amber glass that leaves skin calm and luminous.',
    dotLabel: 'Jump to Face oil',
    productImage: {
      id: 'prodImg3',
      src: 'assets/images/products/4-face-oil.jpg',
      alt: 'KOREB Face oil, 100 ml amber glass dropper bottle with gold cap and cream label reading Organic and nourishing, Revitalizing blend.',
      retouchType: 'oil',
      loading: 'lazy'
    },
    media: {
      sceneType: 'ch3',
      poster: 'assets/images/posters/ch4-amber-light-poster.jpg',
      webm: 'assets/video/ch4-amber-light-loop.webm',
      mp4: 'assets/video/ch4-amber-light-loop.mp4'
    },
    floatingItems: [
      { x: '12%', y: '24%', speed: 1.15, threshold: 0.08, cutout: 'droplet', word: 'Organic & nourishing' },
      { x: '86%', y: '36%', speed: 0.88, threshold: 0.25, word: 'Revitalizing blend' },
      { x: '14%', y: '72%', speed: 1.28, threshold: 0.42, cutout: 'almond', word: 'Face oil' },
      { x: '84%', y: '76%', speed: 0.95, threshold: 0.56, word: '100 ml / 3.4 fl oz' }
    ],
    floatingCutoutsOnly: []
  },
  {
    id: 4,
    chapterIndex: '05 / 05',
    title: 'Organic castor oil',
    size: 'Squeeze bottle',
    sentence: 'Pure cold-pressed castor bean oil for deep hydration, strength and shine, frizz control, and growth boost.',
    dotLabel: 'Jump to Organic castor oil',
    productImage: {
      id: 'prodImg4',
      src: 'assets/images/products/5-castor-oil.jpg',
      alt: 'Three bottles of KOREB Organic castor oil on a sunlit wooden table surrounded by green castor leaves and mottled castor beans.',
      retouchType: null,
      loading: 'lazy'
    },
    media: {
      sceneType: 'ch4',
      poster: 'assets/images/posters/ch5-castor-leaves-poster.jpg',
      webm: 'assets/video/ch5-castor-leaves-loop.webm',
      mp4: 'assets/video/ch5-castor-leaves-loop.mp4'
    },
    floatingItems: [
      { x: '10%', y: '20%', speed: 1.16, threshold: 0.06, cutout: 'droplet', word: 'Deep hydration' },
      { x: '87%', y: '30%', speed: 0.86, threshold: 0.22, cutout: 'castor', word: 'Strength & shine' },
      { x: '12%', y: '70%', speed: 1.32, threshold: 0.38, word: 'Frizz control' },
      { x: '85%', y: '76%', speed: 0.98, threshold: 0.52, cutout: 'basil', word: 'Growth boost' }
    ],
    floatingCutoutsOnly: []
  }
];
