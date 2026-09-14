import { useEffect, useRef } from "react";
import { mixHex, rgba } from "./color";

// PS3-menu-style background on one fixed canvas: translucent ribbons made of many
// sine lines that slowly fold and drift, over a ground colour that cross-fades
// through the palettes. Same palette shape as BarField:
// [{ bg, bars: [primary, ...accents], alpha }]. `additive` brightens overlaps (dark themes).
// `onGround(hex)` reports the current ground colour so the nav can match it.

const HOLD = 14000;
const FADE = 5000;
const STEP = 10; // px between sampled points along each line

const smooth = (t) => t * t * (3 - 2 * t);

// center/tilt/amp/spread are fractions of the viewport height; k = waves across the
// width; speed in radians per second; slot picks the palette colour.
const RIBBONS = [
  { lines: 22, center: 0.58, tilt: 0.12, amp: 0.08, spread: 0.05, k: [1.4, 2.9], speed: [0.16, -0.11], slot: 0, strength: 1 },
  { lines: 12, center: 0.64, tilt: -0.05, amp: 0.06, spread: 0.028, k: [2.1, 3.8], speed: [-0.12, 0.08], slot: 2, strength: 0.7 },
];

export default function WaveField({ palettes, additive = false, onGround }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = 0;
    let H = 0;
    let clock = 0;
    let last = 0;
    let frame = 0;
    let lastGround = "";

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lineY = (r, u, p, t) => {
      const a = u * r.k[0] * Math.PI + t * r.speed[0] + p * 1.2;
      const b = u * r.k[1] * Math.PI + t * r.speed[1] - p * 0.8;
      // Spread varies along the width, so the ribbon pinches and opens like a fold.
      const spread = r.spread * (1 + 0.8 * Math.sin(u * Math.PI * 1.3 + t * 0.07));
      return H * (r.center + r.tilt * (u - 0.5) + r.amp * (0.65 * Math.sin(a) + 0.35 * Math.sin(b)) + p * spread);
    };

    const draw = (dt) => {
      clock += dt;
      const cycle = HOLD + FADE;
      const cur = Math.floor(clock / cycle) % palettes.length;
      const into = clock % cycle;
      const f = into > HOLD ? smooth((into - HOLD) / FADE) : 0;
      const from = palettes[cur];
      const to = palettes[(cur + 1) % palettes.length];
      const color = (slot) => mixHex(from.bars[slot % from.bars.length], to.bars[slot % to.bars.length], f);
      const alpha = from.alpha + (to.alpha - from.alpha) * f;

      const ground = mixHex(from.bg, to.bg, Math.round(f * 32) / 32);
      if (ground !== lastGround) {
        lastGround = ground;
        onGround?.(ground);
      }

      const t = clock / 1000;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = ground;
      ctx.fillRect(0, 0, W, H);

      // Soft glow behind the ribbon.
      const glow = ctx.createRadialGradient(W * 0.6, H * 0.58, 0, W * 0.6, H * 0.58, Math.max(W, H) * 0.6);
      glow.addColorStop(0, rgba(color(0), alpha * 0.45));
      glow.addColorStop(1, rgba(color(0), 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      if (additive) ctx.globalCompositeOperation = "lighter";
      const cols = Math.ceil(W / STEP) + 1;
      for (const r of RIBBONS) {
        const c = color(r.slot);
        const rows = [];
        for (let i = 0; i < r.lines; i++) {
          const p = i / (r.lines - 1) - 0.5;
          const pts = new Float32Array(cols);
          for (let j = 0; j < cols; j++) pts[j] = lineY(r, (j * STEP) / W, p, t);
          rows.push(pts);
        }

        // Faint sheet between the outer lines.
        const top = rows[0];
        const bottom = rows[rows.length - 1];
        ctx.beginPath();
        ctx.moveTo(0, top[0]);
        for (let j = 1; j < cols; j++) ctx.lineTo(j * STEP, top[j]);
        for (let j = cols - 1; j >= 0; j--) ctx.lineTo(j * STEP, bottom[j]);
        ctx.closePath();
        ctx.fillStyle = rgba(c, alpha * 0.28 * r.strength);
        ctx.fill();

        ctx.lineWidth = 1;
        rows.forEach((pts, i) => {
          const edge = i === 0 || i === rows.length - 1;
          ctx.strokeStyle = rgba(c, alpha * (edge ? 1.3 : 0.5) * r.strength);
          ctx.beginPath();
          ctx.moveTo(0, pts[0]);
          for (let j = 1; j < cols; j++) ctx.lineTo(j * STEP, pts[j]);
          ctx.stroke();
        });
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now) => {
      draw(last ? Math.min(now - last, 64) : 0);
      last = now;
      frame = requestAnimationFrame(loop);
    };
    const onResize = () => {
      layout();
      draw(0);
    };

    layout();
    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [palettes, additive, onGround]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
