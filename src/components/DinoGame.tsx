"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";

const W = 760;
const H = 220;
const GROUND_Y = 176;
const DINO_X = 64;
const GRAVITY = 0.68;
const JUMP_VY = -12.6;

const DINO_RUN_1 = [
  "..........########..",
  ".........##########.",
  ".........##.#######.",
  ".........##########.",
  ".........##########.",
  ".........#####......",
  ".........########...",
  "#.......#####.......",
  "#......#######......",
  "##....#########.##..",
  "###..##########..#..",
  "###############.....",
  "###############.....",
  ".#############......",
  "..###########.......",
  "...#########........",
  "....#######.........",
  ".....######.........",
  ".....###..##........",
  ".....##....##.......",
  ".....##.............",
  ".....###............",
];

const DINO_RUN_2 = [
  ...DINO_RUN_1.slice(0, 18),
  ".....##...###.......",
  "......##...##.......",
  "...........##.......",
  "...........###......",
];

const DINO_DUCK_1 = [
  "....................########..",
  "...................##########.",
  "...................##.#######.",
  "#.................###########.",
  "##......#####################.",
  "###....#################......",
  "########################......",
  ".######################.......",
  "..###################.........",
  "....################..........",
  "......###....##...............",
  "......##......##..............",
  "......###.....................",
];

const DINO_DUCK_2 = [
  ...DINO_DUCK_1.slice(0, 10),
  "......##.....###..............",
  ".......##.....##..............",
  "..............###.............",
];

const CACTUS_TALL = [
  "...##...",
  "...##...",
  "#..##...",
  "#..##..#",
  "#..##..#",
  "####..##",
  "...####.",
  "...##...",
  "...##...",
  "...##...",
  "...##...",
  "...##...",
];

const CACTUS_SMALL = [
  "..##..",
  "#.##..",
  "#.##.#",
  "####.#",
  "..####",
  "..##..",
  "..##..",
  "..##..",
];

const PTERO_1 = [
  "......##........",
  ".....####.......",
  "....######......",
  "..########......",
  "############....",
  ".....###########",
  ".......#####....",
];

const PTERO_2 = [
  "................",
  "....##..........",
  "..########......",
  "############....",
  ".....###########",
  "......######....",
  ".......####.....",
  "........##......",
];

function drawGrid(
  ctx: CanvasRenderingContext2D,
  grid: string[],
  x: number,
  y: number,
  px: number,
  color: string
) {
  ctx.fillStyle = color;
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c] === "#") {
        ctx.fillRect(Math.round(x + c * px), Math.round(y + r * px), px, px);
      }
    }
  }
}

interface Obstacle {
  kind: "cactus1" | "cactus2" | "cactus3" | "ptero";
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [muted, setMuted] = useState(false);

  const stateRef = useRef({
    status: "idle" as "idle" | "running" | "over",
    dinoY: 0,
    vy: 0,
    ducking: false,
    speed: 6.2,
    distance: 0,
    frame: 0,
    nextSpawn: 60,
    obstacles: [] as Obstacle[],
    clouds: [
      { x: 180, y: 42, s: 0.4 },
      { x: 460, y: 62, s: 0.3 },
      { x: 670, y: 36, s: 0.5 },
    ],
    groundOffset: 0,
    hi: 0,
    muted: false,
    lastMilestone: 0,
  });

  useEffect(() => {
    stateRef.current.muted = muted;
  }, [muted]);

  const playBeep = (freq: number, dur: number) => {
    if (stateRef.current.muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
      setTimeout(() => ctx.close().catch(() => {}), dur * 1000 + 80);
    } catch {}
  };

  const resetAndStart = () => {
    const s = stateRef.current;
    s.status = "running";
    s.dinoY = 0;
    s.vy = 0;
    s.ducking = false;
    s.speed = 6.2;
    s.distance = 0;
    s.frame = 0;
    s.nextSpawn = 45;
    s.obstacles = [];
    s.lastMilestone = 0;
    setScore(0);
    setStatus("running");
  };

  const triggerJump = () => {
    const s = stateRef.current;
    if (s.status === "idle" || s.status === "over") {
      resetAndStart();
      s.vy = JUMP_VY;
      playBeep(520, 0.06);
      return;
    }
    if (s.dinoY === 0) {
      s.vy = JUMP_VY;
      playBeep(520, 0.06);
    }
  };

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("mydxx_dino_hi") || "0");
      if (Number.isFinite(saved) && saved > 0) {
        stateRef.current.hi = saved;
        setHighScore(saved);
      }
    } catch {}

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        triggerJump();
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        stateRef.current.ducking = true;
        if (stateRef.current.dinoY < 0) stateRef.current.vy += 3.5;
      } else if (e.code === "Enter" && stateRef.current.status === "over") {
        e.preventDefault();
        resetAndStart();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        stateRef.current.ducking = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let rafId = 0;
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;

      const dark = document.documentElement.classList.contains("dark");
      const bg = dark ? "#111613" : "#fdfcf9";
      const fg = dark ? "#dce2da" : "#535353";
      const accent = dark ? "#3ddc97" : "#047857";
      const muted = dark ? "#6f7a71" : "#9a9f98";
      const cloudColor = dark ? "#232c27" : "#e3e0d6";
      const groundColor = dark ? "#313b35" : "#a0a09a";

      const s = stateRef.current;

      // Physics update
      if (s.status === "running") {
        s.frame++;
        s.speed = Math.min(13.5, 6.2 + s.distance * 0.00045);
        s.distance += s.speed * 0.16;
        s.groundOffset = (s.groundOffset + s.speed) % 40;

        const curScore = Math.floor(s.distance);
        if (curScore !== s.lastMilestone && curScore > 0 && curScore % 100 === 0) {
          s.lastMilestone = curScore;
          playBeep(780, 0.09);
        }
        if (s.frame % 3 === 0) setScore(curScore);

        // Dino jump physics
        if (s.dinoY < 0 || s.vy < 0) {
          s.dinoY += s.vy;
          s.vy += GRAVITY;
          if (s.dinoY >= 0) {
            s.dinoY = 0;
            s.vy = 0;
          }
        }

        // Clouds
        for (const c of s.clouds) {
          c.x -= c.s;
          if (c.x < -50) c.x = W + 40;
        }

        // Spawn obstacles
        s.nextSpawn -= 1;
        if (s.nextSpawn <= 0) {
          const allowPtero = curScore > 250 && Math.random() < 0.25;
          if (allowPtero) {
            const high = Math.random() < 0.55;
            s.obstacles.push({
              kind: "ptero",
              x: W + 20,
              y: high ? GROUND_Y - 56 : GROUND_Y - 30,
              w: 44,
              h: 22,
            });
          } else {
            const roll = Math.random();
            if (roll < 0.45) {
              s.obstacles.push({ kind: "cactus1", x: W + 20, y: GROUND_Y - 36, w: 22, h: 36 });
            } else if (roll < 0.78) {
              s.obstacles.push({ kind: "cactus2", x: W + 20, y: GROUND_Y - 36, w: 42, h: 36 });
            } else {
              s.obstacles.push({ kind: "cactus3", x: W + 20, y: GROUND_Y - 36, w: 60, h: 36 });
            }
          }
          const minGap = Math.max(38, Math.floor(72 - s.speed * 2.2));
          s.nextSpawn = minGap + Math.floor(Math.random() * 44);
        }

        // Move & collide
        const isDuck = s.ducking && s.dinoY === 0;
        const dinoBox = isDuck
          ? { x: DINO_X + 6, y: GROUND_Y - 24, w: 50, h: 22 }
          : { x: DINO_X + 8, y: GROUND_Y - 42 + s.dinoY, w: 28, h: 38 };

        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const ob = s.obstacles[i];
          ob.x -= s.speed;
          if (ob.x + ob.w < -40) {
            s.obstacles.splice(i, 1);
            continue;
          }
          const pad = 4;
          if (
            dinoBox.x < ob.x + ob.w - pad &&
            dinoBox.x + dinoBox.w > ob.x + pad &&
            dinoBox.y < ob.y + ob.h - pad &&
            dinoBox.y + dinoBox.h > ob.y + pad
          ) {
            s.status = "over";
            setStatus("over");
            setScore(curScore);
            playBeep(190, 0.16);
            if (curScore > s.hi) {
              s.hi = curScore;
              setHighScore(curScore);
              try { localStorage.setItem("mydxx_dino_hi", String(curScore)); } catch {}
            }
          }
        }
      }

      // Draw background
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Draw clouds
      ctx.fillStyle = cloudColor;
      for (const c of s.clouds) {
        ctx.fillRect(c.x + 8, c.y, 20, 4);
        ctx.fillRect(c.x + 4, c.y + 4, 28, 4);
        ctx.fillRect(c.x, c.y + 8, 36, 4);
      }

      // Draw ground horizon & pebbles
      ctx.fillStyle = groundColor;
      ctx.fillRect(0, GROUND_Y, W, 1.5);
      for (let gx = -s.groundOffset; gx < W + 40; gx += 40) {
        ctx.fillRect(gx + 6, GROUND_Y + 5, 10, 2);
        ctx.fillRect(gx + 24, GROUND_Y + 9, 4, 2);
      }

      // Draw obstacles
      for (const ob of s.obstacles) {
        if (ob.kind === "ptero") {
          const grid = Math.floor(s.frame / 10) % 2 === 0 ? PTERO_1 : PTERO_2;
          drawGrid(ctx, grid, ob.x, ob.y, 2.7, fg);
        } else if (ob.kind === "cactus1") {
          drawGrid(ctx, CACTUS_TALL, ob.x, ob.y, 3, accent);
        } else if (ob.kind === "cactus2") {
          drawGrid(ctx, CACTUS_TALL, ob.x, ob.y, 3, accent);
          drawGrid(ctx, CACTUS_SMALL, ob.x + 24, GROUND_Y - 24, 3, fg);
        } else {
          drawGrid(ctx, CACTUS_TALL, ob.x, ob.y + 2, 2.8, fg);
          drawGrid(ctx, CACTUS_SMALL, ob.x + 22, GROUND_Y - 22, 2.7, accent);
          drawGrid(ctx, CACTUS_TALL, ob.x + 38, ob.y, 3, fg);
        }
      }

      // Draw Dino
      const stepFrame = Math.floor(s.frame / 6) % 2 === 0;
      if (s.ducking && s.dinoY === 0 && s.status === "running") {
        drawGrid(ctx, stepFrame ? DINO_DUCK_1 : DINO_DUCK_2, DINO_X, GROUND_Y - 26, 2, fg);
      } else {
        const grid = s.status === "running" && s.dinoY === 0 ? (stepFrame ? DINO_RUN_1 : DINO_RUN_2) : DINO_RUN_1;
        drawGrid(ctx, grid, DINO_X, GROUND_Y - 44 + s.dinoY, 2, fg);
      }

      // Draw HUD scores
      ctx.font = "600 14px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "right";
      ctx.fillStyle = muted;
      const hiStr = String(s.hi).padStart(5, "0");
      const scStr = String(Math.floor(s.distance)).padStart(5, "0");
      ctx.fillText(`HI ${hiStr}`, W - 82, 28);
      ctx.fillStyle = fg;
      ctx.fillText(scStr, W - 20, 28);

      // Overlays
      ctx.textAlign = "center";
      if (s.status === "idle") {
        ctx.fillStyle = muted;
        ctx.font = "500 13px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText("按 空格键 / ↑ / 点击画面 开始游戏", W / 2, 92);
      } else if (s.status === "over") {
        ctx.fillStyle = fg;
        ctx.font = "700 18px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText("G A M E   O V E R", W / 2, 86);
        ctx.fillStyle = accent;
        ctx.font = "500 12px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText("按 空格键 或 点击重来", W / 2, 114);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-line/80 font-mono text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${status === "running" ? "bg-term animate-pulse" : "bg-muted/50"}`} />
            <span>dino-runner.exe</span>
            <span className="opacity-50">·</span>
            <span>HI {String(highScore).padStart(5, "0")}</span>
            <span className="opacity-50">·</span>
            <span className="text-ink">{String(score).padStart(5, "0")}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMuted((m) => !m)}
              className="p-1 rounded hover:text-term transition-colors"
              aria-label={muted ? "开启音效" : "静音"}
              title={muted ? "开启音效" : "静音"}
            >
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={resetAndStart}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-line hover:border-term hover:text-term transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              重开
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          onClick={triggerJump}
          onTouchStart={(e) => {
            e.preventDefault();
            triggerJump();
          }}
          style={{ width: "100%", height: "auto", aspectRatio: `${W} / ${H}` }}
          className="block cursor-pointer select-none touch-manipulation"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
        <span>操作：<kbd className="px-1.5 py-0.5 rounded border border-line bg-surface text-ink">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded border border-line bg-surface text-ink">↑</kbd> 跳跃 · <kbd className="px-1.5 py-0.5 rounded border border-line bg-surface text-ink">↓</kbd> 下蹲躲飞龙</span>
        <span>250 分后解锁飞龙 · 最高分自动存本地</span>
      </div>
    </div>
  );
}
