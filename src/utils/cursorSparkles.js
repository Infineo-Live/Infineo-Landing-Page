// ✨ Twinkling Stardust Cursor Trail — Theme-Aware Portal Edition
//
// Uses a dedicated #sparkle-portal overlay div (position:fixed, z-index:999999)
// as the container for ALL particles. This guarantees sparkles render above
// every section regardless of stacking contexts created by filter, will-change,
// backdrop-filter, or transform on section ancestors.
//
// Dark mode  → cosmic galaxy: violet, electric blue, cyan, magenta, aurora green
// Light mode → warm magical:  gold, coral, peach, rose, amber

export default function initCursorSparkles({
  minInterval = 50,
  extraChance = 0.14,
  clickBurst  = 8,
} = {}) {
  if (typeof window === 'undefined') return;
  if ('ontouchstart' in window) return;   // skip touch-only devices

  // ── Create or reuse the portal overlay ──────────────────────
  let portal = document.getElementById('sparkle-portal');
  if (!portal) {
    portal = document.createElement('div');
    portal.id = 'sparkle-portal';
    // Inline fallback styles in case App.css hasn't loaded yet
    portal.style.cssText =
      'position:fixed;inset:0;width:100vw;height:100vh;' +
      'pointer-events:none;z-index:999999;overflow:visible;';
    document.body.appendChild(portal);
  }

  // ── Palettes ─────────────────────────────────────────────────
  const PALETTE_DARK = [
    { fill: '#C084FC', outer: '#7C3AED', spec: 'rgba(255,255,255,0.95)', glow: '#A855F7' }, // cosmic violet
    { fill: '#60A5FA', outer: '#2563EB', spec: 'rgba(200,230,255,0.95)', glow: '#3B82F6' }, // electric blue
    { fill: '#67E8F9', outer: '#0891B2', spec: 'rgba(255,255,255,0.98)', glow: '#22D3EE' }, // neon cyan
    { fill: '#F472B6', outer: '#BE185D', spec: 'rgba(255,220,240,0.95)', glow: '#EC4899' }, // hot magenta
    { fill: '#86EFAC', outer: '#15803D', spec: 'rgba(220,255,230,0.95)', glow: '#4ADE80' }, // aurora green
    { fill: '#E0F2FE', outer: '#7DD3FC', spec: 'rgba(255,255,255,1)',    glow: '#BAE6FD' }, // star white-blue
    { fill: '#A5B4FC', outer: '#4338CA', spec: 'rgba(230,230,255,0.95)', glow: '#818CF8' }, // deep indigo
  ];

  const PALETTE_LIGHT = [
    { fill: '#FDE68A', outer: '#D97706', spec: 'rgba(255,255,255,0.95)', glow: '#F59E0B' }, // warm gold
    { fill: '#FCA5A5', outer: '#DC2626', spec: 'rgba(255,245,245,0.95)', glow: '#F87171' }, // coral rose
    { fill: '#FDBA74', outer: '#EA580C', spec: 'rgba(255,250,240,0.95)', glow: '#FB923C' }, // soft peach
    { fill: '#F9A8D4', outer: '#BE185D', spec: 'rgba(255,240,250,0.95)', glow: '#F472B6' }, // blossom pink
    { fill: '#FEF08A', outer: '#CA8A04', spec: 'rgba(255,255,230,0.98)', glow: '#EAB308' }, // amber shimmer
    { fill: '#FFFFFF', outer: '#F59E0B', spec: 'rgba(255,255,255,1)',    glow: '#FDE68A' }, // champagne
    { fill: '#A7F3D0', outer: '#059669', spec: 'rgba(230,255,245,0.95)', glow: '#6EE7B7' }, // soft mint
  ];

  function getPalette() {
    return document.documentElement.getAttribute('data-theme') === 'light'
      ? PALETTE_LIGHT
      : PALETTE_DARK;
  }

  function rand(a, b)  { return Math.random() * (b - a) + a; }
  function pick(arr)   { return arr[Math.floor(Math.random() * arr.length)]; }

  function easeOutElastic(t) {
    return t === 0 ? 0 : t === 1 ? 1
      : Math.pow(2, -8 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
  }

  // ── SVG shape builders ────────────────────────────────────────

  function starPath(cx, cy, outerR, spikes, innerRatio) {
    const step = Math.PI / spikes;
    let d = '';
    for (let i = 0; i < spikes * 2; i++) {
      const a = i * step - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : outerR * innerRatio;
      d += (i === 0 ? 'M' : 'L') +
           (cx + Math.cos(a) * r).toFixed(2) + ',' +
           (cy + Math.sin(a) * r).toFixed(2);
    }
    return d + 'Z';
  }

  function specHighlight(c, r, color) {
    const hx = (c - r * 0.28).toFixed(2);
    const hy = (c - r * 0.30).toFixed(2);
    return `<ellipse cx="${hx}" cy="${hy}" rx="${(r*0.22).toFixed(2)}" ry="${(r*0.13).toFixed(2)}"
      fill="${color.spec}" opacity="0.92" transform="rotate(-30,${hx},${hy})"/>`;
  }

  function buildSVG(size, color) {
    const t  = Math.random();
    const id = 'sp' + (Math.random() * 1e9 | 0);
    const s  = size * 2.6;
    const c  = s / 2;
    const r  = c * 0.88;

    if (t < 0.28) {
      // ── Glint cross — 4-ray Tinker Bell twinkle ──
      const long  = (r * 0.95).toFixed(2);
      const wide  = (r * 0.12).toFixed(2);
      const long2 = (r * 0.70).toFixed(2);
      const wide2 = (r * 0.09).toFixed(2);
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
        <defs>
          <radialGradient id="${id}" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="${color.spec}"/>
            <stop offset="40%"  stop-color="${color.fill}"/>
            <stop offset="100%" stop-color="${color.outer}" stop-opacity="0.3"/>
          </radialGradient>
        </defs>
        <ellipse cx="${c}" cy="${c}" rx="${long}"  ry="${wide}"  fill="url(#${id})" opacity="0.95"/>
        <ellipse cx="${c}" cy="${c}" rx="${wide}"  ry="${long}"  fill="url(#${id})" opacity="0.95"/>
        <ellipse cx="${c}" cy="${c}" rx="${long2}" ry="${wide2}" fill="${color.spec}" opacity="0.5" transform="rotate(45,${c},${c})"/>
        <ellipse cx="${c}" cy="${c}" rx="${wide2}" ry="${long2}" fill="${color.spec}" opacity="0.5" transform="rotate(45,${c},${c})"/>
        <circle  cx="${c}" cy="${c}" r="${(r*0.18).toFixed(2)}" fill="white" opacity="0.98"/>
      </svg>`;
    }

    if (t < 0.54) {
      // ── 4- or 5-pointed star ──
      const spikes = Math.random() < 0.5 ? 4 : 5;
      const inner  = spikes === 4 ? 0.32 : 0.40;
      const path   = starPath(c, c, r, spikes, inner);
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
        <defs>
          <radialGradient id="${id}" cx="40%" cy="38%" r="62%">
            <stop offset="0%"   stop-color="${color.spec}"/>
            <stop offset="45%"  stop-color="${color.fill}"/>
            <stop offset="100%" stop-color="${color.outer}"/>
          </radialGradient>
        </defs>
        <path d="${path}" fill="url(#${id})"/>
        <path d="${path}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
        ${specHighlight(c, r, color)}
      </svg>`;
    }

    if (t < 0.72) {
      // ── Diamond rhombus ──
      const h = (r * 1.05).toFixed(2);
      const w = (r * 0.52).toFixed(2);
      const dp = `M${c},${(c - r*1.05).toFixed(2)} L${(c + r*0.52).toFixed(2)},${c} L${c},${(c + r*1.05).toFixed(2)} L${(c - r*0.52).toFixed(2)},${c}Z`;
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
        <defs>
          <radialGradient id="${id}" cx="40%" cy="30%" r="70%">
            <stop offset="0%"   stop-color="${color.spec}"/>
            <stop offset="50%"  stop-color="${color.fill}"/>
            <stop offset="100%" stop-color="${color.outer}" stop-opacity="0.6"/>
          </radialGradient>
        </defs>
        <path d="${dp}" fill="url(#${id})"/>
        <path d="${dp}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
        ${specHighlight(c, r * 0.7, color)}
      </svg>`;
    }

    // ── Glowing orb ──
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
      <defs>
        <radialGradient id="${id}" cx="38%" cy="35%" r="65%">
          <stop offset="0%"   stop-color="${color.spec}"/>
          <stop offset="50%"  stop-color="${color.fill}"/>
          <stop offset="100%" stop-color="${color.outer}" stop-opacity="0.7"/>
        </radialGradient>
      </defs>
      <circle cx="${c}" cy="${c}" r="${r.toFixed(2)}" fill="url(#${id})"/>
      ${specHighlight(c, r * 0.9, color)}
    </svg>`;
  }

  // ── Tiny dust mote ────────────────────────────────────────────
  function createDust(x, y) {
    const color  = pick(getPalette());
    const size   = rand(1.5, 4);
    const life   = rand(300, 600);
    const driftX = rand(-16, 16);
    const driftY = rand(-28, -5);
    const s = size * 2.6;

    const el = document.createElement('div');
    // position:absolute inside portal — coordinates are viewport px (same as fixed)
    el.style.cssText =
      `position:absolute;pointer-events:none;mix-blend-mode:screen;` +
      `left:${x}px;top:${y}px;width:${size}px;height:${size}px;` +
      `margin-left:${-s/2}px;margin-top:${-s/2}px;` +
      `opacity:0;will-change:transform,opacity;transform-origin:center`;
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
      <circle cx="${s/2}" cy="${s/2}" r="${s*0.38}" fill="${color.fill}" opacity="0.85"/>
    </svg>`;
    portal.appendChild(el);

    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / life, 1);
      const op = t < 0.15 ? t / 0.15 * 0.65 : (1 - (t - 0.15) / 0.85) * 0.65;
      el.style.opacity   = op.toFixed(3);
      el.style.transform = `translate(${(driftX*t).toFixed(1)}px,${(driftY*t).toFixed(1)}px) scale(${(1-t*0.4).toFixed(3)})`;
      if (t < 1) requestAnimationFrame(frame); else el.remove();
    }
    requestAnimationFrame(frame);
    setTimeout(() => { if (el.parentNode) el.remove(); }, life + 80);
  }

  // ── Main sparkle particle ─────────────────────────────────────
  function createSparkle(x, y) {
    const color  = pick(getPalette());
    const size   = rand(6, 18);
    const life   = rand(700, 1100);
    const delay  = rand(0, 25);
    const driftX = rand(-22, 22);
    const driftY = rand(-65, -16);
    const spin   = rand(-200, 200);
    const wobAmp  = rand(3, 10);
    const wobFreq = rand(2.5, 4.5);
    const svgW   = size * 2.6;
    const glowR  = Math.max(4, size * 0.55);

    const el = document.createElement('div');
    // position:absolute inside the portal — left/top are viewport coordinates
    el.style.cssText =
      `position:absolute;pointer-events:none;mix-blend-mode:screen;` +
      `left:${x}px;top:${y}px;width:${size}px;height:${size}px;` +
      `margin-left:${-svgW/2}px;margin-top:${-svgW/2}px;` +
      `opacity:0;will-change:transform,opacity;transform-origin:center`;
    el.innerHTML = buildSVG(size, color);

    const svgEl = el.querySelector('svg');
    if (svgEl) {
      svgEl.style.filter =
        `drop-shadow(0 0 ${(glowR * 2.4).toFixed(1)}px ${color.glow}70) ` +
        `drop-shadow(0 0 ${(glowR * 0.7).toFixed(1)}px ${color.spec})`;
    }

    portal.appendChild(el);

    const startMs = performance.now() + delay;

    function frame(now) {
      if (now < startMs) { requestAnimationFrame(frame); return; }
      const elapsed = now - startMs;
      const t = Math.min(elapsed / life, 1);

      const sc = t < 0.20
        ? easeOutElastic(t / 0.20) * 1.05
        : 1.0 + Math.sin(t * Math.PI * wobFreq * 0.7) * 0.10 * (1 - t);

      const op = t < 0.12
        ? (t / 0.12) * 0.96
        : (1 - Math.pow((t - 0.12) / 0.88, 1.8)) * 0.96;

      const tx  = driftX * t + Math.sin(t * Math.PI * wobFreq) * wobAmp * (1 - t);
      const ty  = driftY * t * (1 - t * 0.20);
      const rot = spin * t;

      el.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) rotate(${rot.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
      el.style.opacity   = op.toFixed(3);

      if (t < 1) requestAnimationFrame(frame); else el.remove();
    }
    requestAnimationFrame(frame);
    setTimeout(() => { if (el.parentNode) el.remove(); }, life + delay + 120);

    if (Math.random() < 0.48) {
      setTimeout(() => createDust(x + rand(-6, 6), y + rand(-3, 3)), rand(0, 30));
    }
  }

  // ── Click burst ───────────────────────────────────────────────
  function burst(x, y, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => createSparkle(x + rand(-18, 18), y + rand(-18, 18)), i * 16);
    }
  }

  // ── Event listeners ───────────────────────────────────────────
  let lastTime = 0;

  function onMove(e) {
    const now = Date.now();
    if (now - lastTime < minInterval) return;
    lastTime = now;
    createSparkle(e.clientX, e.clientY);
    if (Math.random() < extraChance) {
      createSparkle(e.clientX + rand(-6, 6), e.clientY + rand(-6, 6));
    }
  }

  function onClick(e) { burst(e.clientX, e.clientY, clickBurst); }

  window.addEventListener('mousemove', onMove);
  window.addEventListener('click',     onClick);

  return () => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('click',     onClick);
    // Clean up portal if it's empty
    if (portal && portal.childElementCount === 0) portal.remove();
  };
}