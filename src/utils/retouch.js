/**
 * KOREB — Natural Cosmetics
 * src/utils/retouch.js
 * Automatic Canvas photo retouching for Product #2 (Face Cream) and #4 (Face Oil)
 * ensuring all labels display strictly "KOREB".
 *
 * Safe fallback: if browser restrictions (such as opening via file:// protocol)
 * block canvas pixel extraction, the original photo remains visible instead of breaking.
 */

export function retouchFaceCreamPhoto(imgEl) {
  if (!imgEl) return;

  const fix = () => {
    try {
      if (imgEl.dataset.retouched === 'true') return;
      const w = imgEl.naturalWidth;
      const h = imgEl.naturalHeight;
      if (!w || !h) return;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(imgEl, 0, 0);

      // 1. Retouch central round tilted lid label: replace top brand word with "KOREB"
      ctx.save();
      ctx.translate(w * 0.432, h * 0.436);
      ctx.rotate(-0.105);
      const lidGrad = ctx.createLinearGradient(-w * 0.11, 0, w * 0.11, 0);
      lidGrad.addColorStop(0, '#E3BAD1');
      lidGrad.addColorStop(0.5, '#ECC6DC');
      lidGrad.addColorStop(1, '#DFAEC8');
      ctx.fillStyle = lidGrad;
      ctx.beginPath();
      ctx.roundRect(-w * 0.108, -h * 0.017, w * 0.216, h * 0.031, 8);
      ctx.fill();

      ctx.fillStyle = '#4B1521';
      ctx.font = `600 ${Math.round(w * 0.043)}px "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KOREB', 0, 0);
      ctx.restore();

      // 2. Retouch front-center bottom jar label band
      ctx.save();
      ctx.translate(w * 0.482, h * 0.654);
      ctx.rotate(-0.025);
      const midGrad = ctx.createLinearGradient(-w * 0.165, 0, w * 0.165, 0);
      midGrad.addColorStop(0, '#BA91A6');
      midGrad.addColorStop(0.45, '#DFB7CD');
      midGrad.addColorStop(0.85, '#CFA3BA');
      midGrad.addColorStop(1, '#B5899F');
      ctx.fillStyle = midGrad;
      ctx.beginPath();
      ctx.roundRect(-w * 0.162, -h * 0.036, w * 0.324, h * 0.068, 6);
      ctx.fill();

      ctx.fillStyle = '#4E1621';
      ctx.font = `700 ${Math.round(w * 0.095)}px "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KOREB', 0, h * 0.002);
      ctx.restore();

      // 3. Retouch top-right jar label band
      ctx.save();
      ctx.translate(w * 0.835, h * 0.456);
      const trGrad = ctx.createLinearGradient(-w * 0.16, 0, w * 0.16, 0);
      trGrad.addColorStop(0, '#C79DB2');
      trGrad.addColorStop(0.5, '#E2B9D0');
      trGrad.addColorStop(1, '#C59BB0');
      ctx.fillStyle = trGrad;
      ctx.beginPath();
      ctx.roundRect(-w * 0.155, -h * 0.034, w * 0.31, h * 0.066, 6);
      ctx.fill();

      ctx.fillStyle = '#4B1520';
      ctx.font = `700 ${Math.round(w * 0.092)}px "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KOREB', 0, h * 0.002);
      ctx.restore();

      // 4. Retouch bottom-right jar label band
      ctx.save();
      ctx.translate(w * 0.88, h * 0.678);
      ctx.rotate(0.05);
      const brGrad = ctx.createLinearGradient(-w * 0.14, 0, w * 0.14, 0);
      brGrad.addColorStop(0, '#BD93A8');
      brGrad.addColorStop(0.5, '#DCAFD7');
      brGrad.addColorStop(1, '#C79BB2');
      ctx.fillStyle = brGrad;
      ctx.beginPath();
      ctx.roundRect(-w * 0.14, -h * 0.035, w * 0.28, h * 0.068, 6);
      ctx.fill();

      ctx.fillStyle = '#4B1520';
      ctx.font = `700 ${Math.round(w * 0.088)}px "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KOREB', 0, h * 0.002);
      ctx.restore();

      // 5. Retouch left-top & left-bottom partial jars
      ctx.save();
      ctx.translate(w * 0.175, h * 0.422);
      ctx.fillStyle = '#DAB2C7';
      ctx.fillRect(-w * 0.105, -h * 0.028, w * 0.20, h * 0.054);
      ctx.fillStyle = '#531924';
      ctx.font = `700 ${Math.round(w * 0.072)}px "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KOREB', -w * 0.005, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(w * 0.125, h * 0.645);
      ctx.rotate(-0.04);
      ctx.fillStyle = '#D5ACC1';
      ctx.fillRect(-w * 0.125, -h * 0.032, w * 0.25, h * 0.062);
      ctx.fillStyle = '#531924';
      ctx.font = `700 ${Math.round(w * 0.082)}px "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KOREB', 0, 0);
      ctx.restore();

      const retouchedData = canvas.toDataURL('image/jpeg', 0.92);
      imgEl.dataset.retouched = 'true';
      imgEl.src = retouchedData;
    } catch (e) {
      console.warn('KOREB: Face cream photo canvas retouching bypassed (local file:// restrictions or canvas unavailable). Original photo retained.', e);
    }
  };

  if (imgEl.complete && imgEl.naturalWidth) {
    fix();
  } else {
    imgEl.addEventListener('load', fix, { once: true });
  }
}

export function retouchFaceOilPhoto(imgEl) {
  if (!imgEl) return;

  const fix = () => {
    try {
      if (imgEl.dataset.retouched === 'true') return;
      const w = imgEl.naturalWidth;
      const h = imgEl.naturalHeight;
      if (!w || !h) return;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(imgEl, 0, 0);

      // Sample the warm cream paper label directly over the secondary line (y: 63.8% to 69.8%)
      const patchX = w * 0.21;
      const patchY = h * 0.638;
      const patchW = w * 0.58;
      const patchH = h * 0.062;

      const paperGrad = ctx.createLinearGradient(patchX, patchY, patchX + patchW, patchY);
      paperGrad.addColorStop(0, '#EFE4D2');
      paperGrad.addColorStop(0.5, '#E4D4BE');
      paperGrad.addColorStop(1, '#CCB79B');

      ctx.fillStyle = paperGrad;
      ctx.fillRect(patchX, patchY, patchW, patchH);

      // Subtle horizontal gold botanical rule in its place for balanced apothecary spacing
      ctx.strokeStyle = 'rgba(138, 107, 56, 0.45)';
      ctx.lineWidth = Math.max(1.5, w * 0.003);
      ctx.beginPath();
      ctx.moveTo(w * 0.36, h * 0.669);
      ctx.lineTo(w * 0.64, h * 0.669);
      ctx.stroke();

      const retouchedData = canvas.toDataURL('image/jpeg', 0.94);
      imgEl.dataset.retouched = 'true';
      imgEl.src = retouchedData;
    } catch (e) {
      console.warn('KOREB: Face oil photo canvas retouching bypassed (local file:// restrictions or canvas unavailable). Original photo retained.', e);
    }
  };

  if (imgEl.complete && imgEl.naturalWidth) {
    fix();
  } else {
    imgEl.addEventListener('load', fix, { once: true });
  }
}
