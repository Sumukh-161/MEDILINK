import { useEffect, useRef, useCallback } from 'react';

const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
const PAUSE_DELAY  = 400;            // ms before a "pause" circle appears
const MIN_R = 3;
const MAX_R = 30;

export function useMouseTracker({ onImageReady, width = 1440, height = 900 } = {}) {
  const canvasRef  = useRef(null);
  const stateRef   = useRef({
    trail:     [],
    pauses:    [],
    lastPos:   null,
    lastTime:  0,
    hue:       140,
    segId:     0,
    pauseTimer: null,
  });

  // ---------- helpers ----------
  const getCanvas = useCallback(() => {
    if (!canvasRef.current) {
      const c = document.createElement('canvas');
      c.width  = width;
      c.height = height;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      canvasRef.current = c;
    }
    return canvasRef.current;
  }, [width, height]);

  const getCtx = useCallback(() => getCanvas().getContext('2d'), [getCanvas]);

  // ---------- mouse handler ----------
  useEffect(() => {
    const s = stateRef.current;

    function handleMove(e) {
      const x = (e.clientX / window.innerWidth)  * width;
      const y = (e.clientY / window.innerHeight) * height;
      const now = Date.now();
      const ctx = getCtx();

      if (s.lastPos) {
        const dx = x - s.lastPos.x;
        const dy = y - s.lastPos.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        const speed = d / Math.max(1, now - s.lastTime);

        s.hue = (s.hue + 0.4) % 360;
        const sat = Math.min(100, 80 + speed * 200);
        const lit = Math.min(75,  55 + speed * 100);
        const color = `hsla(${s.hue},${sat}%,${lit}%,0.85)`;

        s.trail.push({ x, y, color, seg: s.segId });

        ctx.beginPath();
        ctx.moveTo(s.lastPos.x, s.lastPos.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = color;
        ctx.lineWidth   = 1;
        ctx.stroke();
      } else {
        s.segId++;
        s.trail.push({ x, y, color: '#00ff88', seg: s.segId });
      }

      // pause circle logic
      if (s.pauseTimer) clearTimeout(s.pauseTimer);
      s.pauseTimer = setTimeout(() => {
        const p = { x, y, r: MIN_R, color: `hsl(${s.hue},90%,65%)`, start: Date.now() };
        s.pauses.push(p);
        drawGrowingCircle(p);
      }, PAUSE_DELAY);

      s.lastPos  = { x, y };
      s.lastTime = now;
    }

    function handleLeave() {
      s.lastPos = null;
      s.segId++;
      if (s.pauseTimer) clearTimeout(s.pauseTimer);
    }

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      if (s.pauseTimer) clearTimeout(s.pauseTimer);
    };
  }, [getCtx, width, height]);

  // ---------- animated pause circles ----------
  function drawGrowingCircle(p) {
    const elapsed = (Date.now() - p.start) / 1000;
    p.r = Math.min(MAX_R, MIN_R + elapsed * 8);

    const ctx = getCtx();
    // erase old circle area
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.arc(p.x, p.y, MAX_R + 2, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.restore();

    // redraw nearby trail (simple approach: just redraw the circle)
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const dotR = p.r > 6 ? p.r * 0.35 : 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.r < MAX_R) requestAnimationFrame(() => drawGrowingCircle(p));
  }

  // ---------- 10-min interval snapshot ----------
  const callbackRef = useRef(onImageReady);
  useEffect(() => {
    callbackRef.current = onImageReady;
  }, [onImageReady]);

  useEffect(() => {
    const id = setInterval(() => {
      const canvas = getCanvas();
      const dataURL = canvas.toDataURL('image/png');
      if (callbackRef.current) {
        callbackRef.current(dataURL);
      }

      // reset canvas for next session
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const s = stateRef.current;
      s.trail   = [];
      s.pauses  = [];
      s.lastPos = null;
      s.segId   = 0;
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [getCanvas]);

  // expose manual snapshot for testing
  const snapshot = useCallback(() => {
    return getCanvas().toDataURL('image/png');
  }, [getCanvas]);

  return { snapshot };
}
