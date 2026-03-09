<template>
  <section
    class="relative border-b border-white/5 bg-[#0a0a0f] overflow-hidden"
    aria-labelledby="about-title"
  >
    <div class="px-12 py-16 sm:px-20 sm:py-20 relative z-10">
      <div class="grid gap-16 lg:grid-cols-2 lg:gap-12 items-start">
        <!-- Timeline -->
        <div>
          <h2
            id="about-title"
            class="text-2xl font-black tracking-tight text-[#00ff88] sm:text-3xl mb-10"
            style="
              letter-spacing: -0.03em;
              font-family: &quot;Syne&quot;, sans-serif;
            "
          >
            {{ $t("about.title") }}
          </h2>

          <div class="space-y-3 mb-10 max-w-lg">
            <p
              v-for="(p, i) in paragraphs"
              :key="i"
              class="text-sm leading-relaxed text-white/50"
            >
              {{ p }}
            </p>
          </div>

          <div class="relative">
            <div
              class="absolute left-1.25 top-1.5 bottom-1.5 w-px bg-linear-to-b from-[#00ff88]/50 via-[#00ff88]/20 to-transparent pointer-events-none"
            ></div>

            <div
              v-for="(edu, i) in education"
              :key="'edu' + i"
              class="relative flex gap-5 mb-8"
            >
              <div
                class="shrink-0 mt-1.25 w-2.75 h-2.75 rounded-full border-2 border-[#00ff88] bg-[#0a0a0f] shadow-[0_0_10px_#00ff8855] z-10"
              ></div>
              <div>
                <p
                  class="font-mono text-[10px] tracking-widest text-[#00ff88]/50 uppercase mb-0.5"
                >
                  {{ edu.year }}
                </p>
                <p class="text-sm font-bold text-white/80">{{ edu.label }}</p>
                <p class="text-xs text-white/35 mt-0.5">{{ edu.detail }}</p>
              </div>
            </div>

            <div
              v-for="(cert, i) in certifications"
              :key="'cert' + i"
              class="relative flex gap-5 mb-8"
            >
              <div
                class="shrink-0 mt-1.25 w-2.75 h-2.75 rounded-full border border-white/25 bg-[#0a0a0f] z-10"
              ></div>
              <div>
                <p
                  class="font-mono text-[10px] tracking-widest text-white/25 uppercase mb-0.5"
                >
                  Certification
                </p>
                <p class="text-sm font-bold text-white/60">{{ cert.label }}</p>
                <p class="text-xs text-white/30 mt-0.5">{{ cert.detail }}</p>
              </div>
            </div>

            <div class="relative flex gap-5">
              <div
                class="shrink-0 mt-1.25 w-2.75 h-2.75 rounded-full bg-[#00ff88]/15 border border-[#00ff88]/35 z-10"
              ></div>
              <div class="flex flex-wrap gap-2 mt-0.5">
                <span
                  v-for="tag in tags"
                  :key="tag"
                  class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/40"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Hex grid -->
        <div>
          <p
            class="font-mono text-[10px] tracking-widest text-white/25 uppercase mb-6"
          >
            {{ $t("about.hexTitle") }}
          </p>
          <div ref="hexContainer" class="relative w-full select-none">
            <svg
              ref="hexSvg"
              class="w-full overflow-visible"
              :viewBox="`0 0 ${svgW} ${svgH}`"
              :style="`height:${svgH}px`"
              @mousemove="onSvgMouseMove"
              @mouseleave="onSvgMouseLeave"
            >
              <defs>
                <filter
                  id="crack-glow"
                  x="-80%"
                  y="-80%"
                  width="260%"
                  height="260%"
                >
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter
                  id="shard-shadow"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feDropShadow
                    dx="1"
                    dy="2"
                    stdDeviation="4"
                    flood-color="rgba(0,0,0,0.7)"
                  />
                </filter>
                <radialGradient id="glass-sheen" cx="25%" cy="20%" r="60%">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.18)" />
                  <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
                </radialGradient>
                <!-- Clip paths per cell -->
                <clipPath
                  v-for="cell in hexCells"
                  :key="'clip' + cell.id"
                  :id="`clip-${cell.id}`"
                >
                  <polygon :points="cell.points" />
                </clipPath>
              </defs>

              <!-- Cells -->
              <g
                v-for="cell in hexCells"
                :key="cell.id"
                :style="`
                  transform-origin:${cell.cx}px ${cell.cy}px;
                  transform:translate(${cell.nudgeX}px,${cell.nudgeY}px) scale(${cell.scale});
                  transition:transform 0.28s cubic-bezier(0.34,1.4,0.64,1)
                `"
              >
                <!-- Intact hex -->
                <g
                  v-if="!cell.cracked"
                  class="cursor-pointer"
                  @mouseenter="onHexEnter(cell)"
                  @mouseleave="onHexLeave(cell)"
                  @click="onHexClick(cell)"
                >
                  <!-- Dark glass base -->
                  <polygon
                    :points="cell.points"
                    :fill="`rgba(12,12,22,${cell.hovered ? '0.92' : '0.72'})`"
                    stroke="none"
                  />
                  <!-- Color tint -->
                  <polygon
                    :points="cell.points"
                    :fill="cell.color + (cell.hovered ? '20' : '0c')"
                    stroke="none"
                    style="transition: fill 0.25s"
                  />
                  <!-- Glass sheen -->
                  <polygon
                    :points="hexPoints(cell.cx, cell.cy, HEX_R - 2)"
                    fill="url(#glass-sheen)"
                    stroke="none"
                    class="pointer-events-none"
                  />
                  <!-- Mouse spotlight -->
                  <g v-if="cell.hovered">
                    <defs>
                      <radialGradient
                        :id="`spot-${cell.id}`"
                        :cx="`${cell.lightX}%`"
                        :cy="`${cell.lightY}%`"
                        r="60%"
                        gradientUnits="objectBoundingBox"
                      >
                        <stop
                          offset="0%"
                          :stop-color="cell.color"
                          stop-opacity="0.30"
                        />
                        <stop
                          offset="100%"
                          stop-color="black"
                          stop-opacity="0"
                        />
                      </radialGradient>
                    </defs>
                    <polygon
                      :points="cell.points"
                      :fill="`url(#spot-${cell.id})`"
                      stroke="none"
                      class="pointer-events-none"
                    />
                  </g>
                  <!-- Outer border -->
                  <polygon
                    :points="cell.points"
                    fill="none"
                    :stroke="cell.color + (cell.hovered ? '90' : '2e')"
                    stroke-width="1.2"
                    style="transition: stroke 0.25s"
                  />
                  <!-- Inner ring -->
                  <polygon
                    :points="hexPoints(cell.cx, cell.cy, HEX_R - 5)"
                    fill="none"
                    :stroke="cell.color + (cell.hovered ? '28' : '07')"
                    stroke-width="0.8"
                  />

                  <!-- At rest: icon only -->
                  <foreignObject
                    v-if="!cell.hovered"
                    :x="cell.cx - HEX_R + 2"
                    :y="cell.cy - HEX_R + 2"
                    :width="(HEX_R - 2) * 2"
                    :height="(HEX_R - 2) * 2"
                    :clip-path="`url(#clip-${cell.id})`"
                    class="pointer-events-none"
                    style="overflow: visible"
                  >
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      style="
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <img
                        :src="`/assets/icones/${cell.slug}.svg`"
                        :width="cell.iconSize"
                        :height="cell.iconSize"
                        style="display: block; object-fit: contain"
                        :alt="cell.label"
                      />
                    </div>
                  </foreignObject>

                  <!-- On hover: text only -->
                  <text
                    v-if="cell.hovered"
                    :x="cell.cx"
                    :y="cell.cy + 1"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="#ffffff"
                    :font-size="cell.fontSize + 2"
                    font-family="'JetBrains Mono',monospace"
                    font-weight="700"
                    class="pointer-events-none select-none"
                  >
                    {{ cell.label }}
                  </text>
                </g>

                <!-- Cracked shards -->
                <g v-if="cell.cracked" class="pointer-events-none">
                  <!-- Clip paths for logo cracking -->
                  <defs>
                    <clipPath
                      v-for="(shard, si) in cell.shards"
                      :key="'sc' + cell.id + '-' + si"
                      :id="`sclip-${cell.id}-${si}`"
                    >
                      <polygon :points="shard.pts" />
                    </clipPath>
                  </defs>

                  <g
                    v-for="(shard, si) in cell.shards"
                    :key="si"
                    :style="`
                      transform-origin:${shard.ox}px ${shard.oy}px;
                      transform:translate(${shard.tx}px,${shard.ty}px) rotate(${shard.rot}deg);
                      transition:transform ${shard.dur}ms ${shard.ease}, opacity ${shard.dur}ms ease;
                      opacity:${shard.opacity};
                    `"
                  >
                    <!-- Glass base -->
                    <polygon
                      :points="shard.pts"
                      fill="rgba(10,10,20,0.92)"
                      stroke="none"
                      filter="url(#shard-shadow)"
                    />
                    <polygon
                      :points="shard.pts"
                      :fill="cell.color + '16'"
                      stroke="none"
                    />
                    <polygon
                      :points="shard.pts"
                      fill="url(#glass-sheen)"
                      stroke="none"
                    />

                    <!-- Logo -->
                    <foreignObject
                      :x="cell.cx - HEX_R + 2"
                      :y="cell.cy - HEX_R + 2"
                      :width="(HEX_R - 2) * 2"
                      :height="(HEX_R - 2) * 2"
                      :clip-path="`url(#sclip-${cell.id}-${si})`"
                      style="overflow: visible"
                    >
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style="
                          width: 100%;
                          height: 100%;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <img
                          :src="`/assets/icones/${cell.slug}.svg`"
                          :width="cell.iconSize"
                          :height="cell.iconSize"
                          style="
                            display: block;
                            object-fit: contain;
                            opacity: 0.7;
                          "
                          :alt="cell.label"
                        />
                      </div>
                    </foreignObject>

                    <!-- Crack edge -->
                    <polygon
                      :points="shard.pts"
                      fill="none"
                      :stroke="cell.color + '60'"
                      stroke-width="0.9"
                    />
                    <!-- Ice sparkle on crack edge -->
                    <polygon
                      :points="shard.pts"
                      fill="none"
                      stroke="rgba(255,255,255,0.18)"
                      stroke-width="1.8"
                      stroke-dasharray="2 6"
                    />
                  </g>
                  <!-- Shockwave ring -->
                  <circle
                    :cx="cell.cx"
                    :cy="cell.cy"
                    :r="cell.shockR"
                    fill="none"
                    :stroke="cell.color + '55'"
                    stroke-width="1.5"
                    :style="`opacity:${cell.shockOp};transition:none`"
                  />
                </g>
              </g>
            </svg>
            <p
              class="mt-3 font-mono text-[10px] text-white/15 text-center tracking-wide"
            >
              {{ $t("about.hexHint") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onBeforeUnmount, nextTick } from "vue";

const { tm, t } = useI18n();
const { toTextArray } = useI18nText();

const paragraphs = computed(() => toTextArray(tm("about.paragraphs") as any[]));
const tags = computed(() => t("about.tagline").split(" - "));
const education = computed(() =>
  (tm("about.education") as any[]).map((e: any) => ({
    year: e.year?.loc?.source || "",
    label: e.label?.loc?.source || "",
    detail: e.detail?.loc?.source || "",
  })),
);
const certifications = computed(() =>
  (tm("about.certifications") as any[]).map((c: any) => ({
    label: c.label?.loc?.source || "",
    detail: c.detail?.loc?.source || "",
  })),
);

const SKILLS = [
  { label: "Symfony", slug: "symfony", color: "#00ff88", iconSize: 24 },
  { label: "Nuxt", slug: "nuxt", color: "#41b883", iconSize: 24 },
  { label: "Vue", slug: "vue", color: "#42d392", iconSize: 24 },
  { label: "Next.js", slug: "nextjs", color: "#aaffcc", iconSize: 22 },
  { label: "TypeScript", slug: "typescript", color: "#5ba4f5", iconSize: 22 },
  { label: "React", slug: "react", color: "#61dafb", iconSize: 24 },
  { label: "Python", slug: "python", color: "#ffd43b", iconSize: 24 },
  { label: "PostgreSQL", slug: "postgresql", color: "#7daee0", iconSize: 22 },
  { label: "MySQL", slug: "mysql", color: "#f29111", iconSize: 22 },
  { label: "Docker", slug: "docker", color: "#2496ed", iconSize: 24 },
  { label: "Git", slug: "git", color: "#f05032", iconSize: 24 },
  { label: "CI/CD", slug: "cicd", color: "#aaffcc", iconSize: 20 },
];

/* ========
 * Hex grid
 * ========
 * Multiple interactive effects on hex grid:
 * - Hover: scale up + spotlight + push neighbors
 * - Click: crack + explode + reassemble
 */
const HEX_R = 54;
const HEX_GAP = 7;
const COLS = 4;
const colStep = HEX_R * Math.sqrt(3) + HEX_GAP;
const rowStep = HEX_R * 1.5 + HEX_GAP;
const ROWS = Math.ceil(SKILLS.length / COLS);

const svgW = computed(() => COLS * colStep + colStep * 0.5 + 10);
const svgH = computed(() => HEX_R + ROWS * rowStep + rowStep * 0.5 + 10);

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

// Sutherland-Hodgman polygon clipping against a half-plane ax+by <= c
function clipByHalfPlane(
  poly: [number, number][],
  ax: number,
  ay: number,
  c: number,
): [number, number][] {
  const inside = (p: [number, number]) => ax * p[0] + ay * p[1] <= c;
  const intersect = (
    a: [number, number],
    b: [number, number],
  ): [number, number] => {
    const da = ax * a[0] + ay * a[1] - c,
      db = ax * b[0] + ay * b[1] - c;
    const t = da / (da - db);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  };
  if (!poly.length) return [];
  const out: [number, number][] = [];
  for (let i = 0; i < poly.length; i++) {
    const curr = poly[i] as [number, number];
    let prev = poly[(i + poly.length - 1) % poly.length] as [number, number];
    const inC = inside(curr),
      inP = inside(prev);
    if (inC) {
      if (!inP) out.push(intersect(prev, curr));
      out.push(curr);
    } else if (inP) out.push(intersect(prev, curr));
  }
  return out;
}

// Build the parent hex polygon as a clip boundary
function hexPolygon(cx: number, cy: number, r: number): [number, number][] {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });
}

// Shard configs
const SHARD_CONFIGS = [
  // 4-shard configs
  [
    [-0.35, -0.35],
    [0.35, -0.35],
    [-0.35, 0.35],
    [0.35, 0.35],
  ],
  // 5-shard configs
  [
    [0, -0.4],
    [0.38, 0.1],
    [-0.38, 0.1],
    [0.2, 0.48],
    [-0.2, 0.48],
  ],
  // another 4
  [
    [-0.4, 0],
    [0.4, 0],
    [0, -0.4],
    [0, 0.4],
  ],
  // 4 diagonal
  [
    [-0.3, -0.45],
    [0.3, -0.45],
    [0.38, 0.28],
    [-0.38, 0.28],
  ],
];

function buildShards(cx: number, cy: number, r: number) {
  const ri = Math.floor(Math.random() * SHARD_CONFIGS.length);
  const offsets = SHARD_CONFIGS[ri];
  const shardR = r * 0.62; // mini-hex radius
  const parentPoly = hexPolygon(cx, cy, r * 0.97);

  return offsets?.map(([ox, oy]) => {
    // Center of this mini-hex in SVG coords
    const scx = cx + (ox ? ox * r : 0);
    const scy = cy + (oy ? oy * r : 0);

    // Full mini-hex polygon
    let poly: [number, number][] = hexPolygon(scx, scy, shardR);

    // Clip to parent hex using each of its 6 edges as half-planes
    for (let i = 0; i < parentPoly.length; i++) {
      const a = parentPoly[i]!;
      const b = parentPoly[(i + 1) % parentPoly.length]!;
      // Normal pointing inward: rotate edge vector 90° CW
      const ex = b[0] - a[0],
        ey = b[1] - a[1];
      const nx = ey,
        ny = -ex; // inward normal
      const c = nx * a[0] + ny * a[1];
      poly = clipByHalfPlane(poly, nx, ny, c);
      if (!poly.length) break;
    }

    if (poly.length < 3) {
      // Fallback: use mini-hex directly
      poly = hexPolygon(scx, scy, shardR * 0.8);
    }

    const pts = poly
      .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
      .join(" ");

    // Explosion direction from parent center to shard center
    const dx = ox!,
      dy = oy!;
    const d = Math.sqrt(dx * dx + dy * dy) || 0.01;

    return {
      pts,
      ox: scx, // transform-origin x
      oy: scy, // transform-origin y
      nx: dx / d, // explosion direction
      ny: dy / d,
    };
  });
}

function buildGrid() {
  return SKILLS.map((sk, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const cx = HEX_R + col * colStep + (row % 2 === 1 ? colStep / 2 : 0);
    const cy = HEX_R + row * rowStep;
    return reactive({
      id: i,
      label: sk.label,
      slug: sk.slug,
      color: sk.color,
      iconSize: sk.iconSize,
      fontSize: 8,
      cx,
      cy,
      points: hexPoints(cx, cy, HEX_R - HEX_GAP / 2),
      hovered: false,
      scale: 1,
      nudgeX: 0,
      nudgeY: 0,
      lightX: 50,
      lightY: 50,
      cracked: false,
      glowing: false,
      shards: [] as any[],
      shockR: 0,
      shockOp: 0,
    });
  });
}

const hexCells = reactive(buildGrid());
const hexSvg = ref<SVGSVGElement | null>(null);

// Mouse spotlight
let hoveredCell: any = null;

function onSvgMouseMove(e: MouseEvent) {
  if (!hoveredCell || !hexSvg.value) return;
  const svg = hexSvg.value;
  const rect = svg.getBoundingClientRect();
  const sx = svgW.value / rect.width;
  const sy = svgH.value / rect.height;
  const mx = (e.clientX - rect.left) * sx;
  const my = (e.clientY - rect.top) * sy;

  const bw = HEX_R * 2;
  hoveredCell.lightX = Math.max(
    0,
    Math.min(100, Math.round(((mx - (hoveredCell.cx - HEX_R)) / bw) * 100)),
  );
  hoveredCell.lightY = Math.max(
    0,
    Math.min(100, Math.round(((my - (hoveredCell.cy - HEX_R)) / bw) * 100)),
  );
}
function onSvgMouseLeave() {
  if (hoveredCell) {
    hoveredCell.lightX = 50;
    hoveredCell.lightY = 50;
  }
}

// Hover: scale + push neighbors
const PUSH_DIST = 9;
const PUSH_RANGE = HEX_R * 2.5;

function onHexEnter(cell: any) {
  cell.hovered = true;
  cell.scale = 1.15;
  cell.lightX = 50;
  cell.lightY = 50;
  hoveredCell = cell;

  for (const other of hexCells) {
    if (other.id === cell.id || other.cracked) continue;
    const dx = other.cx - cell.cx;
    const dy = other.cy - cell.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < PUSH_RANGE && dist > 0.1) {
      const s = (1 - dist / PUSH_RANGE) * PUSH_DIST;
      other.nudgeX = (dx / dist) * s;
      other.nudgeY = (dy / dist) * s;
    }
  }
}
function onHexLeave(cell: any) {
  cell.hovered = false;
  cell.scale = 1;
  cell.lightX = 50;
  cell.lightY = 50;
  hoveredCell = null;
  for (const other of hexCells) {
    other.nudgeX = 0;
    other.nudgeY = 0;
  }
}

// Crack + reassemble
const timers = new Map<number, any>();
const EXPLODE_D = HEX_R * 1.35;

function onHexClick(cell: any) {
  if (cell.cracked) return;

  const shardDefs = buildShards(cell.cx, cell.cy, HEX_R - HEX_GAP / 2);

  // Set initial state
  cell.shards = shardDefs?.map((s) => ({
    ...s,
    tx: 0,
    ty: 0,
    rot: 0,
    opacity: 1,
    dur: 420,
    ease: "cubic-bezier(0.22,1,0.36,1)",
  }));

  cell.cracked = true;
  cell.hovered = false;
  cell.scale = 1;
  hoveredCell = null;
  cell.shockR = 0;
  cell.shockOp = 1;

  // Reset neighbors
  for (const other of hexCells) {
    other.nudgeX = 0;
    other.nudgeY = 0;
  }

  // Animate shockwave
  const t0 = performance.now();
  (function shock(now: number) {
    const p = Math.min((now - t0) / 420, 1);
    cell.shockR = HEX_R * 1.8 * p;
    cell.shockOp = 1 - p;
    if (p < 1) requestAnimationFrame(shock);
    else {
      cell.shockR = 0;
      cell.shockOp = 0;
    }
  })(performance.now());

  // Render shards at origin then trigger the CSS transition
  nextTick(() =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        cell.shards.forEach((s: any) => {
          s.tx = s.nx * EXPLODE_D;
          s.ty = s.ny * EXPLODE_D;
          s.rot = s.nx * 40 + s.ny * 25 + (Math.random() - 0.5) * 15;
        });
        // Fade shards after they land
        setTimeout(() => {
          cell.shards.forEach((s: any) => {
            s.opacity = 0.18;
          });
        }, 300);
      }),
    ),
  );

  // Reassemble after (min .4, max 1.2)
  if (timers.has(cell.id)) clearTimeout(timers.get(cell.id));
  timers.set(
    cell.id,
    setTimeout(
      () => {
        // Simultaneously: fade in + fly back to origin in one transition
        cell.shards.forEach((s: any) => {
          s.tx = 0;
          s.ty = 0;
          s.rot = 0;
          s.opacity = 1;
          s.dur = 700;
          s.ease = "cubic-bezier(0.34,1.1,0.64,1)";
        });
        // Remove cracked state once transition completes
        setTimeout(() => {
          cell.cracked = false;
          cell.shards = [];
        }, 720);
      },
      Math.random() * 800 + 400,
    ),
  );
}

onBeforeUnmount(() => timers.forEach((t) => clearTimeout(t)));
</script>

<style scoped>
section {
  min-height: 480px;
}
</style>
