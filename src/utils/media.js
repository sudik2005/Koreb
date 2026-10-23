/**
 * KOREB — Natural Cosmetics
 * src/utils/media.js
 * Seamless procedural video & poster synthesis engine with "real file first, synthesized fallback".
 * Generates live silent looping canvas streams and high-res poster fallbacks for the Hero
 * and all 5 Product Chapters, while automatically prioritizing real asset files if dropped in.
 *
 * Includes a dispose() method for clean unmounting under React.StrictMode.
 */

export function createProceduralVideoController(videoEl, sceneType) {
  if (!videoEl) return null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Phones can't afford live canvas streams; they keep the static synthesized poster.
  const isLowPower = window.matchMedia('(max-width: 960px), (pointer: coarse)').matches;
  const FRAME_INTERVAL = 1000 / 24;
  let lastDraw = 0;
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  let animId = null;
  let isRunning = false;
  let startTime = performance.now();
  let streamAttached = false;
  let realSourceAvailable = false;
  let isDisposed = false;

  // Check if real <source> tags exist and test whether they load
  const sources = Array.from(videoEl.querySelectorAll('source'));
  const sourceErrorListeners = [];

  const handleLoadedData = () => {
    if (!streamAttached && !isDisposed) {
      realSourceAvailable = true;
    }
  };

  const handleCanPlay = () => {
    if (!streamAttached && !isDisposed) {
      realSourceAvailable = true;
    }
  };

  if (sources.length > 0) {
    let failedSources = 0;
    sources.forEach((sourceEl) => {
      const onError = () => {
        failedSources++;
        if (failedSources >= sources.length && !isDisposed) {
          realSourceAvailable = false;
        }
      };
      sourceEl.addEventListener('error', onError);
      sourceErrorListeners.push({ el: sourceEl, fn: onError });
    });

    videoEl.addEventListener('loadeddata', handleLoadedData);
    videoEl.addEventListener('canplay', handleCanPlay);
  }

  function drawFrame(now) {
    if (isDisposed) return;
    const t = ((now - startTime) * 0.001) % 6.0; // 6-second seamless loop phase
    const phase = (t / 6.0) * Math.PI * 2;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (sceneType === 'hero') {
      // Warm golden-hour apothecary background with slow dripping golden oil & swaying rosemary
      const bg = ctx.createRadialGradient(w * 0.52, h * 0.38, 20, w * 0.5, h * 0.5, w * 0.75);
      bg.addColorStop(0, '#4E331B');
      bg.addColorStop(0.45, '#2A1D13');
      bg.addColorStop(1, '#121B15');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Warm golden-hour bokeh orbs
      for (let i = 0; i < 9; i++) {
        const bx = w * (0.15 + 0.7 * ((i * 0.37) % 1)) + Math.sin(phase + i) * 18;
        const by = h * (0.2 + 0.65 * ((i * 0.29) % 1)) + Math.cos(phase + i * 0.7) * 12;
        const r = 28 + (i % 4) * 18;
        const orb = ctx.createRadialGradient(bx, by, 2, bx, by, r);
        orb.addColorStop(0, 'rgba(214, 154, 56, 0.22)');
        orb.addColorStop(1, 'rgba(214, 154, 56, 0)');
        ctx.fillStyle = orb;
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Softly swaying out-of-focus rosemary needles in foreground left & right
      ctx.save();
      ctx.translate(w * 0.18, h * 0.88);
      ctx.rotate(Math.sin(phase) * 0.045);
      ctx.strokeStyle = 'rgba(118, 145, 98, 0.32)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(40, -90, 95, -170);
      ctx.stroke();
      for (let j = 1; j <= 7; j++) {
        const py = -j * 22;
        const px = j * 12;
        ctx.fillStyle = 'rgba(142, 168, 122, 0.28)';
        ctx.beginPath();
        ctx.ellipse(px - 14, py, 16, 4, -0.5, 0, Math.PI * 2);
        ctx.ellipse(px + 12, py + 4, 16, 4, 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Glass dropper tip at top center
      const cx = w * 0.5;
      ctx.fillStyle = 'rgba(239, 230, 212, 0.18)';
      ctx.beginPath();
      ctx.moveTo(cx - 11, 0);
      ctx.lineTo(cx - 5, 68);
      ctx.arc(cx, 68, 5, Math.PI, 0, true);
      ctx.lineTo(cx + 11, 0);
      ctx.closePath();
      ctx.fill();

      // Golden oil drop forming and dripping slowly
      const dropCycle = (t % 3.0) / 3.0; // Two slow drips per 6s loop
      let dropY = 74;
      let dropR = 6 + dropCycle * 6;
      if (dropCycle > 0.62) {
        const fall = (dropCycle - 0.62) / 0.38;
        dropY = 78 + fall * fall * (h - 90);
        dropR = 9.5;
      }
      const dropGrad = ctx.createRadialGradient(cx - 2, dropY - 3, 1, cx, dropY, dropR * 1.6);
      dropGrad.addColorStop(0, '#FFF0C2');
      dropGrad.addColorStop(0.45, '#D69A38');
      dropGrad.addColorStop(1, 'rgba(168, 100, 24, 0)');
      ctx.fillStyle = dropGrad;
      ctx.beginPath();
      ctx.arc(cx, dropY, dropR * 1.4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Chapter-specific ambient looping background scenes
      const palettes = {
        ch0: ['#593820', '#2E1E13', '#D69A38', '#8FA982'], // Rosemary & warm wood
        ch1: ['#5C343F', '#2E1B22', '#E6B89C', '#C49A6C'], // Resin tree leaves & stone
        ch2: ['#63461A', '#2E210E', '#F0A830', '#A46428'], // Golden oil, turmeric & seeds
        ch3: ['#6B421E', '#332010', '#E8A948', '#F4DFC0'], // Warm window caustics on amber
        ch4: ['#314726', '#192615', '#9DB397', '#C99846']  // Sunlit green castor leaves
      };
      const pal = palettes[sceneType] || palettes.ch0;

      const zoom = 1 + 0.04 * Math.sin(phase * 0.5);
      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);
      ctx.scale(zoom, zoom);
      ctx.translate(-w * 0.5, -h * 0.5);

      const g = ctx.createRadialGradient(
        w * (0.62 + 0.06 * Math.sin(phase)),
        h * (0.46 + 0.05 * Math.cos(phase)),
        15,
        w * 0.5,
        h * 0.5,
        w * 0.75
      );
      g.addColorStop(0, pal[0]);
      g.addColorStop(0.55, pal[1]);
      g.addColorStop(1, '#121B15');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Soft diagonal warm light rays & swaying botanical silhouettes
      for (let i = 0; i < 7; i++) {
        const x = w * (0.12 + i * 0.14) + Math.sin(phase + i * 0.9) * 24;
        const y = h * (0.2 + (i % 3) * 0.25) + Math.cos(phase + i * 0.6) * 16;
        const rad = 42 + (i % 3) * 26;
        const ray = ctx.createRadialGradient(x, y, 2, x, y, rad);
        ray.addColorStop(0, pal[2] + '33');
        ray.addColorStop(0.6, pal[3] + '18');
        ray.addColorStop(1, 'rgba(18, 27, 21, 0)');
        ctx.fillStyle = ray;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function tick(now) {
    if (!isRunning || isDisposed) return;
    if (now - lastDraw >= FRAME_INTERVAL) {
      lastDraw = now;
      drawFrame(now);
    }
    animId = requestAnimationFrame(tick);
  }

  // Render initial frame
  drawFrame(performance.now());

  // Poster handling: check if real poster file exists; if not, use synthesized poster
  const origPoster = videoEl.getAttribute('poster');
  if (origPoster) {
    const posterImg = new Image();
    posterImg.onload = () => {
      // Real poster found; keep original attribute
    };
    posterImg.onerror = () => {
      if (isDisposed) return;
      try {
        const posterDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        videoEl.setAttribute('poster', posterDataUrl);
      } catch (e) { }
    };
    posterImg.src = origPoster;
  } else {
    try {
      const posterDataUrl = canvas.toDataURL('image/jpeg', 0.82);
      videoEl.setAttribute('poster', posterDataUrl);
    } catch (e) { }
  }

  function attachStreamIfNeeded() {
    if (streamAttached || realSourceAvailable || prefersReducedMotion.matches || isDisposed) return;
    if (typeof canvas.captureStream === 'function') {
      try {
        const stream = canvas.captureStream(24);
        videoEl.srcObject = stream;
        streamAttached = true;
      } catch (e) { }
    }
  }

  return {
    play() {
      if (prefersReducedMotion.matches || isDisposed || isLowPower || isRunning) return;

      if (!realSourceAvailable && (!videoEl.currentSrc || videoEl.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) {
        attachStreamIfNeeded();
      }

      isRunning = true;
      startTime = performance.now();
      animId = requestAnimationFrame(tick);

      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          if (!streamAttached && typeof canvas.captureStream === 'function' && !isDisposed) {
            try {
              const stream = canvas.captureStream(24);
              videoEl.srcObject = stream;
              streamAttached = true;
              videoEl.play().catch(() => { });
            } catch (e) { }
          }
        });
      }
    },
    pause() {
      if (!isRunning && videoEl.paused) return;
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      animId = null;
      try {
        videoEl.pause();
      } catch (e) { }
    },
    dispose() {
      isDisposed = true;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      isRunning = false;
      try {
        videoEl.pause();
      } catch (e) { }

      // Remove listeners
      sourceErrorListeners.forEach(({ el, fn }) => {
        el.removeEventListener('error', fn);
      });
      videoEl.removeEventListener('loadeddata', handleLoadedData);
      videoEl.removeEventListener('canplay', handleCanPlay);

      if (streamAttached && videoEl.srcObject) {
        try {
          const tracks = videoEl.srcObject.getTracks ? videoEl.srcObject.getTracks() : [];
          tracks.forEach((t) => t.stop());
          videoEl.srcObject = null;
        } catch (e) { }
      }
    }
  };
}
