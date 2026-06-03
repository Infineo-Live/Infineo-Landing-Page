// Disney / Pixar-style golden stardust cursor trail — refined edition
// Call initCursorSparkles() once on mount. No CSS required.

export default function initCursorSparkles({
  container   = document.body,
  minInterval = 30,
  extraChance = 0.32,
  clickBurst  = 12,
} = {}) {
  if (typeof window === 'undefined') return;
  if ('ontouchstart' in window) return;

  // palette: gold + pearl + silver shimmer 
  const COLORS = [
    { fill: '#6e5e00ff', outer: '#FFA500',  spec: 'rgba(255,255,220,0.9)' },  // pure gold
    { fill: '#FFF4B0', outer: '#FFD700',  spec: 'rgba(255,255,255,0.95)' }, // pale champagne
    { fill: '#FFFFFF', outer: '#FFE878',  spec: 'rgba(255,255,255,1)'    }, // white-gold
    { fill: '#FFE040', outer: '#FF9500',  spec: 'rgba(255,245,180,0.85)' }, // deep amber
    { fill: '#F8F0FF', outer: '#D4AAFF',  spec: 'rgba(255,255,255,0.95)' }, // silver-pearl
    { fill: '#E8F4FF', outer: '#90C8FF',  spec: 'rgba(255,255,255,0.95)' }, // ice shimmer
  ];

  function rand(a, b)  { return Math.random() * (b - a) + a; }
  function pick(arr)   { return arr[Math.floor(Math.random() * arr.length)]; }
  function easeOutElastic(t) {
    // gentle overshoot on scale-in
    return t === 0 ? 0 : t === 1 ? 1
      : Math.pow(2, -8 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
  }

  function starPath(cx, cy, outerR, spikes, innerRatio) {
    const step = Math.PI / spikes;
    let d = '';
    for (let i = 0; i < spikes * 2; i++) {
      const a = i * step - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : outerR * innerRatio;
      d += (i === 0 ? 'M' : 'L') + (cx + Math.cos(a) * r).toFixed(2) + ',' + (cy + Math.sin(a) * r).toFixed(2);
    }
    return d + 'Z';
  }

  // Specular highlight ellipse — gives each particle a jewel-like sheen
  function specHighlight(c, r, color) {
    const hx = (c - r * 0.28).toFixed(2);
    const hy = (c - r * 0.30).toFixed(2);
    return `<ellipse cx="${hx}" cy="${hy}" rx="${(r*0.22).toFixed(2)}" ry="${(r*0.13).toFixed(2)}"
      fill="${color.spec}" opacity="0.92" transform="rotate(-30,${hx},${hy})"/>`;
  }

  function buildSVG(size, color) {
    const t  = Math.random();
    const id = 'g' + (Math.random() * 1e9 | 0);
    const s  = size * 2.6;
    const c  = s / 2;
    const r  = c * 0.88;

    if (t < 0.42) {
      // ── 4- or 5-pointed star with gradient + specular ──
      const spikes = Math.random() < 0.55 ? 4 : 5;
      const inner  = spikes === 4 ? 0.34 : 0.40;
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
        <path d="${path}" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="0.6"/>
        ${specHighlight(c, r, color)}
      </svg>`;
    }
    if (t < 0.68) {
      // ── 4-ray Tinker Bell cross with glowing center ──
      const rx1 = (r * 0.92).toFixed(2), ry1 = (r * 0.16).toFixed(2);
      const rx2 = (r * 0.16).toFixed(2), ry2 = (r * 0.92).toFixed(2);
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
        <defs>
          <radialGradient id="${id}a" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="${color.spec}"/>
            <stop offset="100%" stop-color="${color.fill}" stop-opacity="0.6"/>
          </radialGradient>
          <radialGradient id="${id}b" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="${color.spec}"/>
            <stop offset="100%" stop-color="${color.outer}" stop-opacity="0.7"/>
          </radialGradient>
        </defs>
        <ellipse cx="${c}" cy="${c}" rx="${rx1}" ry="${ry1}" fill="url(#${id}a)" opacity="0.95"/>
        <ellipse cx="${c}" cy="${c}" rx="${rx2}" ry="${ry2}" fill="url(#${id}b)" opacity="0.95"/>
        <circle  cx="${c}" cy="${c}" r="${(r*0.2).toFixed(2)}" fill="white" opacity="0.98"/>
        <ellipse cx="${(c - r*0.08).toFixed(2)}" cy="${(c - r*0.08).toFixed(2)}"
                 rx="${(r*0.07).toFixed(2)}" ry="${(r*0.045).toFixed(2)}"
                 fill="white" opacity="0.9"/>
      </svg>`;
    }
    // ── glowing orb with inner highlight ──
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

  // tiny dust mote 
  function createDust(x, y) {
    const color = pick(COLORS);
    const size  = rand(2, 5);
    const life  = rand(400, 700);
    const driftX = rand(-20, 20);
    const driftY = rand(-35, -8);
    const s = size * 2.6;

    const el = document.createElement('div');
    el.style.cssText = `position:fixed;pointer-events:none;z-index:998;left:${x}px;top:${y}px;` +
      `width:${size}px;height:${size}px;margin-left:${-s/2}px;margin-top:${-s/2}px;` +
      `opacity:0;will-change:transform,opacity;transform-origin:center`;
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
      <circle cx="${s/2}" cy="${s/2}" r="${s*0.38}" fill="${color.fill}" opacity="0.85"/>
    </svg>`;
    container.appendChild(el);

    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / life, 1);
      const op = t < 0.15 ? t / 0.15 * 0.7 : (1 - (t - 0.15) / 0.85) * 0.7;
      el.style.opacity   = op.toFixed(3);
      el.style.transform = `translate(${(driftX*t).toFixed(1)}px,${(driftY*t).toFixed(1)}px) scale(${(1-t*0.4).toFixed(3)})`;
      if (t < 1) requestAnimationFrame(frame); else el.remove();
    }
    requestAnimationFrame(frame);
    setTimeout(() => { if (el.parentNode) el.remove(); }, life + 80);
  }

  // main particle 
  function createSparkle(x, y) {
    const color  = pick(COLORS);
    const size   = rand(7, 20);
    const life   = rand(800, 1200);
    const delay  = rand(0, 40);
    const driftX = rand(-28, 28);
    const driftY = rand(-80, -22);
    const spin   = rand(-180, 180);
    const wobbleAmp   = rand(4, 12);   // lateral sine float
    const wobbleFreq  = rand(2.5, 4);  // cycles over lifetime
    const svgW   = size * 2.6;
    const glowR  = Math.max(5, size * 0.55);

    const el = document.createElement('div');
    el.className = 'cursor-sparkle';
    el.style.cssText = `position:fixed;pointer-events:none;z-index:999;` +
      `left:${x}px;top:${y}px;width:${size}px;height:${size}px;` +
      `margin-left:${-svgW/2}px;margin-top:${-svgW/2}px;` +
      `opacity:0;will-change:transform,opacity;transform-origin:center`;
    el.innerHTML = buildSVG(size, color);

    const svgEl = el.querySelector('svg');
    if (svgEl) {
      // Double glow: wide soft halo + tight bright core
      svgEl.style.filter =
        `drop-shadow(0 0 ${glowR * 1.8}px ${color.outer}88) ` +
        `drop-shadow(0 0 ${glowR * 0.6}px ${color.spec})`;
    }

    container.appendChild(el);

    const startMs = performance.now() + delay;

    function frame(now) {
      if (now < startMs) { requestAnimationFrame(frame); return; }
      const elapsed = now - startMs;
      const t = Math.min(elapsed / life, 1);

      // elastic pop-in for first 18% of life
      const sc = t < 0.18
        ? easeOutElastic(t / 0.18) * 1.05
        : 1.0 + Math.sin(t * Math.PI * wobbleFreq * 0.6) * 0.08 * (1 - t); // gentle twinkle pulse

      // opacity: quick fade-in, long graceful fade-out
      const op = t < 0.14
        ? (t / 0.14) * 0.97
        : (1 - Math.pow((t - 0.14) / 0.86, 1.7)) * 0.97;

      const tx = driftX * t + Math.sin(t * Math.PI * wobbleFreq) * wobbleAmp * (1 - t);
      const ty = driftY * t * (1 - t * 0.22);
      const rot = spin * t;

      el.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) rotate(${rot.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
      el.style.opacity   = op.toFixed(3);

      if (t < 1) requestAnimationFrame(frame); else el.remove();
    }
    requestAnimationFrame(frame);

    setTimeout(() => { if (el.parentNode) el.remove(); }, life + delay + 120);

    // tiny dust mote trailing behind
    if (Math.random() < 0.55) {
      setTimeout(() => createDust(x + rand(-8, 8), y + rand(-4, 4)), rand(0, 40));
    }
  }

  // burst (click) 
  function burst(x, y, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => createSparkle(x + rand(-16, 16), y + rand(-16, 16)), i * 20);
    }
  }

  // events 
  let lastTime = 0;

  function onMove(e) {
    const now = Date.now();
    if (now - lastTime < minInterval) return;
    lastTime = now;
    createSparkle(e.clientX, e.clientY);
    if (Math.random() < extraChance) {
      createSparkle(e.clientX + rand(-7, 7), e.clientY + rand(-7, 7));
    }
  }

  function onClick(e) { burst(e.clientX, e.clientY, clickBurst); }

  window.addEventListener('mousemove', onMove);
  window.addEventListener('click',     onClick);

  return () => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('click',     onClick);
  };
}

/*
  ── USAGE ─────────────────────────────────────────────────────────────────────

  React (useEffect):
    useEffect(() => initCursorSparkles(), []);

  Next.js app router:
    'use client';
    export default function SparkleProvider() {
      useEffect(() => initCursorSparkles(), []);
      return null;
    }

  Options:
    initCursorSparkles({
      minInterval : 30,    // ms between trail bursts
      extraChance : 0.32,  // bonus particle probability per move
      clickBurst  : 12,    // particles on click
      container   : document.getElementById('canvas'),
    });

  No CSS required — fully self-contained.
  ─────────────────────────────────────────────────────────────────────────────
*/