/**
 * KOREB — Natural Cosmetics
 * src/data/chapters.js
 * Complete content dictionary for the 5-chapter product story.
 * Preserves exact wording, coordinates, parallax thresholds, and asset paths.
 * Supports both English and Amharic (አማርኛ).
 */

export const CHAPTERS = [
  {
    id: 0,
    chapterIndex: '01 / 05',
    title: 'Rosemary strengthening hair oil',
    titleAm: 'የሮዝመሪ የፀጉር ማጠናከሪያ ዘይት',
    size: '100 ml / 3.4 fl oz',
    sizeAm: '100 ሚሊ / 3.4 ፍ.ኦዝ',
    sentence:
      'Infused with fresh rosemary in an amber glass dropper bottle for daily scalp and strand care.',
    sentenceAm:
      'ለእለት ተእለት የራስ ቆዳ እና የፀጉር እንክብካቤ የሚሆን ትኩስ ሮዝመሪ የተዋሃደበት አምበር ጠብታ ጠርሙስ።',
    importance:
      'Awakens dormant follicles, stimulates scalp micro-circulation, and fortifies roots to curb hair fall and foster resilient, thicker growth.',
    importanceAm:
      'የተኙ የፀጉር ስሮችን ያነቃቃል፣ የራስ ቆዳ የደም ዝውውርን ያፋጥናል፣ እንዲሁም የፀጉር መርገፍን በመግታት ጠንካራ እና ወፍራም ፀጉር እንዲያድግ ያደርጋል።',
    dotLabel: 'Jump to Rosemary strengthening hair oil',
    dotLabelAm: 'ወደ ሮዝመሪ የፀጉር ዘይት ይዝለሉ',
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
      { x: '10%', y: '22%', speed: 1.15, threshold: 0.06, cutout: 'rosemary', word: 'Rosemary', wordAm: 'ሮዝመሪ' },
      { x: '86%', y: '34%', speed: 0.82, threshold: 0.22, word: 'Strengthening', wordAm: 'ማጠናከሪያ' },
      { x: '14%', y: '68%', speed: 1.35, threshold: 0.38, word: 'Hair oil', wordAm: 'የፀጉር ዘይት' },
      { x: '84%', y: '76%', speed: 0.95, threshold: 0.52, cutout: 'droplet', word: '100 ml / 3.4 fl oz', wordAm: '100 ሚሊ' }
    ],
    floatingCutoutsOnly: [
      { x: '88%', y: '14%', size: '64px', speed: 1.45, threshold: 0.12, cutout: 'rosemary' }
    ]
  },
  {
    id: 1,
    chapterIndex: '02 / 05',
    title: 'Natural face cream',
    titleAm: 'የተፈጥሮ የፊት ክሬም',
    size: 'Small-batch apothecary jar',
    sizeAm: 'የተመረጠ የዕፅዋት ቅባት ማሰሮ',
    sentence:
      'A rich, comforting cream crafted with aromatic tree resins to keep skin soft and supple.',
    sentenceAm:
      'ቆዳዎን ለስላሳ እና ውብ አድርጎ ለመጠበቅ ከመዓዛማ የዕጣን ሙጫዎች የተዘጋጀ የተመጣጠነ ክሬም።',
    importance:
      'Shields skin with rare aromatic tree resins (Boswellia), sealing in deep hydration and defending against moisture loss and environmental fatigue.',
    importanceAm:
      'ቆዳን ውድ በሆኑ የተፈጥሮ ሙጫዎች (ቦስዌሊያ) በመጠበቅ ጥልቅ እርጥበትን ይይዛል፤ ቆዳ ድርቀትንና የአየር ንብረት ተጽእኖን እንዲቋቋም ይረዳል።',
    dotLabel: 'Jump to Natural face cream',
    dotLabelAm: 'ወደ ተፈጥሮ የፊት ክሬም ይዝለሉ',
    productImage: {
      id: 'prodImg1',
      src: 'assets/images/products/2-face-cream.jpg',
      alt: 'KOREB Natural face cream in white-lidded jars with dusty rose labels arranged on travertine stone with golden resin tears beneath a Boswellia tree.',
      retouchType: null,
      loading: 'lazy'
    },
    media: {
      sceneType: 'ch1',
      poster: 'assets/images/posters/ch2-resin-poster.jpg',
      webm: 'assets/video/ch2-resin-loop.webm',
      mp4: 'assets/video/ch2-resin-loop.mp4'
    },
    floatingItems: [
      { x: '12%', y: '24%', speed: 1.1, threshold: 0.08, cutout: 'resin', word: 'Natural face cream', wordAm: 'የተፈጥሮ የፊት ክሬም' },
      { x: '86%', y: '32%', speed: 0.88, threshold: 0.24, word: 'Aromatic resin', wordAm: 'የዕጣን ሙጫ' },
      { x: '14%', y: '72%', speed: 1.28, threshold: 0.40, cutout: 'boswellia', word: 'Botanical moisture', wordAm: 'የተፈጥሮ እርጥበት' },
      { x: '84%', y: '74%', speed: 0.92, threshold: 0.54, word: 'Soft & supple', wordAm: 'ለስላሳ እና ውብ' }
    ],
    floatingCutoutsOnly: []
  },
  {
    id: 2,
    chapterIndex: '03 / 05',
    title: 'Natural hair oil',
    titleAm: 'የተፈጥሮ የፀጉር ዘይት',
    size: '330 g',
    sizeAm: '330 ግራም',
    sentence:
      'Twelve whole seeds, roots, oils, and warm spices cold-infused into a golden conditioning oil.',
    sentenceAm:
      'አስራ ሁለት ሙሉ ዘሮች፣ ስሮች፣ ዘይቶችና ቅመማ ቅመሞች በብርድ ቅንብር ተዋህደው የተዘጋጀ የወርቅ ቀለም ያለው ኮንዲሽነር ዘይት።',
    importance:
      'Delivers intensive whole-botanical restoration to replenish dry scalp, repair split ends, and rebuild damaged hair cuticles from within.',
    importanceAm:
      'የደረቀ የራስ ቆዳን ለማለስለስ፣ የተሰባበረ ፀጉርን ለመጠገን እና የተጎዳውን የፀጉር ክፍል ከውስጥ ለማደስ የተሟላ የተፈጥሮ ቅመሞች ቅንብር ይሰጣል።',
    dotLabel: 'Jump to Natural hair oil',
    dotLabelAm: 'ወደ ተፈጥሮ የፀጉር ዘይት ይዝለሉ',
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
      { x: '8%', y: '10%', speed: 1.18, threshold: 0.02, cutout: 'castor', word: 'Castor oil', wordAm: 'የጉሎ ዘይት' },
      { x: '86%', y: '12%', speed: 0.86, threshold: 0.08, cutout: 'flax', word: 'Flax seed', wordAm: 'ተልባ' },
      { x: '6%', y: '26%', speed: 1.34, threshold: 0.14, cutout: 'rosemary', word: 'Rosemary', wordAm: 'ሮዝመሪ' },
      { x: '90%', y: '27%', speed: 1.05, threshold: 0.20, cutout: 'blackcumin', word: 'Black cumin', wordAm: 'ጥቁር አዝሙድ' },
      { x: '10%', y: '42%', speed: 0.92, threshold: 0.26, cutout: 'turmeric', word: 'Turmeric', wordAm: 'እርድ' },
      { x: '88%', y: '43%', speed: 1.26, threshold: 0.32, cutout: 'cinnamon', word: 'Cinnamon', wordAm: 'ቀረፋ' },
      { x: '7%', y: '58%', speed: 1.12, threshold: 0.38, cutout: 'almond', word: 'Almond', wordAm: 'ለውዝ' },
      { x: '89%', y: '59%', speed: 0.84, threshold: 0.44, cutout: 'droplet', word: 'Olive oil', wordAm: 'የወይራ ዘይት' },
      { x: '11%', y: '74%', speed: 1.30, threshold: 0.50, cutout: 'coconut', word: 'Coconut', wordAm: 'ኮኮናት' },
      { x: '86%', y: '75%', speed: 0.98, threshold: 0.56, word: 'Niger seed', wordAm: 'ኑግ' },
      { x: '18%', y: '89%', speed: 1.16, threshold: 0.62, word: 'Pumpkin oil', wordAm: 'የዱባ ፍሬ ዘይት' },
      { x: '80%', y: '90%', speed: 1.22, threshold: 0.68, cutout: 'beetroot', word: 'Beet root', wordAm: 'ቀይ ስር' }
    ],
    floatingCutoutsOnly: [
      { x: '50%', y: '6%', size: '54px', speed: 1.4, threshold: 0.18, cutout: 'basil' }
    ]
  },
  {
    id: 3,
    chapterIndex: '04 / 05',
    title: 'Face oil',
    titleAm: 'የፊት ዘይት',
    size: '100 ml / 3.4 fl oz',
    sizeAm: '100 ሚሊ / 3.4 ፍ.ኦዝ',
    sentence:
      'An organic and nourishing revitalizing blend in amber glass that leaves skin calm and luminous.',
    sentenceAm:
      'ቆዳን የሚያረጋጋ፣ የሚያድስና ወርቃማ ብሩህነትን የሚያጎናጽፍ የተፈጥሮ ቅንብር በአምበር ጠርሙስ።',
    importance:
      'Restores the skin’s natural lipid barrier with concentrated antioxidants, calming sensitivity and unveiling a soft, luminous golden glow.',
    importanceAm:
      'በተፈጥሮ አንቲኦክሲዳንት ንጥረ ነገሮች አማካኝነት የቆዳን የተፈጥሮ ዘይት ሚዛን ይጠብቃል፣ የቆዳ መቆጣትን ያረጋጋል፣ እንዲሁም ቆዳን ሳያወፍር ጽዱና ብሩህ ያደርጋል።',
    dotLabel: 'Jump to Face oil',
    dotLabelAm: 'ወደ ፊት ዘይት ይዝለሉ',
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
      { x: '12%', y: '24%', speed: 1.15, threshold: 0.08, cutout: 'droplet', word: 'Organic & nourishing', wordAm: 'ተፈጥሯዊ እና ገንቢ' },
      { x: '86%', y: '36%', speed: 0.88, threshold: 0.25, word: 'Revitalizing blend', wordAm: 'የሚያድስ ቅንብር' },
      { x: '14%', y: '72%', speed: 1.28, threshold: 0.42, cutout: 'almond', word: 'Face oil', wordAm: 'የፊት ዘይት' },
      { x: '84%', y: '76%', speed: 0.95, threshold: 0.56, word: '100 ml / 3.4 fl oz', wordAm: '100 ሚሊ' }
    ],
    floatingCutoutsOnly: []
  },
  {
    id: 4,
    chapterIndex: '05 / 05',
    title: 'Organic castor oil',
    titleAm: 'ኦርጋኒክ የጉሎ ዘይት',
    size: 'Squeeze bottle',
    sizeAm: 'የሚጨመቅ ጠርሙስ',
    sentence:
      'Pure cold-pressed castor bean oil for deep hydration, strength and shine, frizz control, and growth boost.',
    sentenceAm:
      'ለጥልቅ እርጥበት፣ ለጥንካሬና ለብርሃን፣ ለስላሳነትና ለፀጉር እድገት የሚሆን ንጹህ በብርድ የተጨመቀ የጉሎ ዘይት።',
    importance:
      'Acts as a dense, ricinoleic humectant that locks in maximum moisture, controls stubborn frizz, and visibly boosts hair, lash, and brow density.',
    importanceAm:
      'ከፍተኛ እርጥበትን የመጠበቅ አቅም ያለው በመሆኑ የፀጉር መሰባበርን ያስቆማል፣ የፀጉር መሸበብን ይቆጣጠራል፣ እንዲሁም የቅንድብ፣ የዐይን ሽፋሽፍት እና የፀጉርን ጥንካሬና ብዛት ያፋጥናል።',
    dotLabel: 'Jump to Organic castor oil',
    dotLabelAm: 'ወደ ኦርጋኒክ የጉሎ ዘይት ይዝለሉ',
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
      { x: '10%', y: '20%', speed: 1.16, threshold: 0.06, cutout: 'droplet', word: 'Deep hydration', wordAm: 'ጥልቅ እርጥበት' },
      { x: '87%', y: '30%', speed: 0.86, threshold: 0.22, cutout: 'castor', word: 'Strength & shine', wordAm: 'ጥንካሬና ብርሃን' },
      { x: '12%', y: '70%', speed: 1.32, threshold: 0.38, word: 'Frizz control', wordAm: 'ለስላሳ ቁጥጥር' },
      { x: '85%', y: '76%', speed: 0.98, threshold: 0.52, cutout: 'basil', word: 'Growth boost', wordAm: 'የእድገት ማፋጠኛ' }
    ],
    floatingCutoutsOnly: []
  }
];
