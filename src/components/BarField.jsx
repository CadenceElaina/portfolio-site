import { useEffect, useRef } from "react";

// Animated page background on one fixed canvas.
// Thin and thick bars drift across the screen in the current palette's colours.
// After HOLD ms a ragged front of lanes sweeps through: each lane is pushed by a
// coloured bar and leaves the next palette's ground behind it, so the whole
// background hands over to the next palette, then the cycle repeats.
// `angle` rotates everything (0 = horizontal, negative = rising diagonal).
// Palettes: [{ bg, bars: [primary, ...accents], alpha, capAlpha }].

const HOLD = 12000;
const SWEEP = 9000;

const rand = (a, b) => a + Math.random() * (b - a);
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

// Bar that fades in from its tail, so it reads as a soft streak rather than a block.
function streak(ctx, color, x, y, len, h) {
  const g = ctx.createLinearGradient(x, 0, x + len, 0);
  g.addColorStop(0, rgba(color, 0));
  g.addColorStop(0.75, rgba(color, 1));
  g.addColorStop(1, rgba(color, 1));
  ctx.fillStyle = g;
  ctx.fillRect(x, y, len, h);
}

export default function BarField({ palettes, angle = 0, paused = false }) {
  const canvasRef = useRef(null);
  const pausedRef = useRef(paused);
  const api = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rad = (angle * Math.PI) / 180;
    let W = 0;
    let H = 0;
    let FW = 0; // frame size: the rotated rectangle that still covers the viewport
    let FH = 0;
    let lanes = [];
    let bars = [];
    let cur = 0;
    let clock = 0; // ms of animation time, frozen while paused
    let phaseStart = 0;
    let last = 0;
    let frame = 0;

    const spawn = (anywhere) => {
      const thick = Math.random() < 0.12;
      const len = rand(120, thick ? 560 : 360);
      return {
        y: rand(0, FH),
        h: thick ? rand(8, 20) : rand(2, 6),
        len,
        x: anywhere ? rand(-len, FW) : -len - rand(0, FW * 0.3),
        speed: rand(12, 45),
        slot: Math.floor(Math.random() * 6),
      };
    };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const c = Math.abs(Math.cos(rad));
      const s = Math.abs(Math.sin(rad));
      FW = W * c + H * s;
      FH = W * s + H * c;
      lanes = [];
      for (let y = 0; y < FH; ) {
        const h = rand(14, 70);
        lanes.push({ y, h, lag: rand(0, 0.35) * FW, cap: rand(40, 220), slot: Math.floor(Math.random() * 6) });
        y += h;
      }
      bars = Array.from({ length: Math.round(FH / 26) }, () => spawn(true));
    };

    const laneAt = (y) => lanes.find((l) => y < l.y + l.h) ?? lanes[lanes.length - 1];

    const draw = (dt) => {
      clock += dt;
      let t = clock - phaseStart;
      if (t >= HOLD + SWEEP) {
        cur = (cur + 1) % palettes.length;
        phaseStart = clock;
        t = 0;
      }
      const from = palettes[cur];
      const to = palettes[(cur + 1) % palettes.length];
      const sweeping = t > HOLD;
      // Front travels far enough that the most-lagged lane and its cap clear the frame.
      const front = sweeping ? ease((t - HOLD) / SWEEP) * (FW * 1.35 + 240) : -Infinity;

      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = from.bg;
      ctx.fillRect(0, 0, W, H);
      ctx.translate(W / 2, H / 2);
      ctx.rotate(rad);
      ctx.translate(-FW / 2, -FH / 2);

      if (sweeping) {
        for (const l of lanes) {
          const edge = front - l.lag;
          if (edge <= 0) continue;
          ctx.globalAlpha = 1;
          ctx.fillStyle = to.bg;
          ctx.fillRect(0, l.y, Math.min(edge, FW), l.h + 0.5);
          // Thin streak centred in the lane rides the front, so it reads as a bar, not a block.
          const capH = Math.max(2, l.h * 0.3);
          ctx.globalAlpha = to.capAlpha;
          streak(ctx, to.bars[l.slot % to.bars.length], edge - l.cap, l.y + (l.h - capH) / 2, l.cap, capH);
        }
      }

      for (const b of bars) {
        b.x += (b.speed * dt) / 1000;
        if (b.x > FW) Object.assign(b, spawn(false));
        const edge = sweeping ? front - laneAt(b.y).lag : -Infinity;
        const pal = b.x + b.len < edge ? to : from;
        ctx.globalAlpha = pal.alpha;
        streak(ctx, pal.bars[b.slot % pal.bars.length], b.x, b.y, b.len, b.h);
      }
      ctx.restore();
    };

    const loop = (now) => {
      draw(last ? Math.min(now - last, 64) : 0);
      last = now;
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const onResize = () => {
      layout();
      draw(0);
    };

    layout();
    draw(0);
    api.current = { start, stop };
    if (!pausedRef.current) start();
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
    };
  }, [palettes, angle]);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) api.current?.stop();
    else api.current?.start();
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
