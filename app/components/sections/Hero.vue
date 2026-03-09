<template>
  <section
    class="relative min-h-screen overflow-hidden bg-[#0a0a0f] flex flex-col"
    aria-labelledby="hero-title"
  >
    <!-- Grain -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.035]"
      aria-hidden="true"
      style="
        background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E&quot;);
        background-size: 600px 600px;
      "
    ></div>
    <!-- Orbs -->
    <div
      class="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    <!-- Grid -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.04]"
      aria-hidden="true"
      style="
        background-image:
          linear-gradient(#00ff88 1px, transparent 1px),
          linear-gradient(to right, #00ff88 1px, transparent 1px);
        background-size: 60px 60px;
      "
    ></div>

    <!-- Content -->
    <div
      class="relative z-10 flex flex-1 flex-col justify-center px-8 pt-24 pb-16 sm:px-16 sm:pt-28"
    >
      <div
        class="grid items-center gap-12 lg:grid-cols-2 max-w-6xl mx-auto w-full"
      >
        <!-- Left -->
        <div>
          <div
            class="inline-flex items-center gap-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 px-4 py-1.5 mb-6"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75"
              ></span>
              <span
                class="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]"
              ></span>
            </span>
            <span
              class="font-mono text-xs font-semibold text-[#00ff88] tracking-widest uppercase"
              >{{ $t("hero.badge") }}</span
            >
          </div>

          <h1
            id="hero-title"
            class="font-display font-black text-white leading-none tracking-tight"
            style="font-size: clamp(2.8rem, 6vw, 5rem); letter-spacing: -0.04em"
          >
            <span class="block">{{ $t("hero.headline1") }}</span>
            <span class="block text-[#00ff88]">{{ $t("hero.headline2") }}</span>
            <span class="block">{{ $t("hero.headline3") }}</span>
          </h1>

          <p
            class="mt-5 font-mono text-xs tracking-widest text-white/30 uppercase"
          >
            {{ $t("hero.kicker") }}
          </p>
          <p class="mt-4 text-base leading-relaxed text-white/50 max-w-md">
            {{ $t("hero.subtitle") }}
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              class="cta-shimmer relative overflow-hidden inline-flex items-center gap-2 rounded-lg bg-[#00ff88] px-6 py-3 text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
            >
              <span class="relative z-10">{{ $t("hero.primaryCta") }}</span>
              <span class="relative z-10" aria-hidden="true">=></span>
              <span class="shimmer-sweep" aria-hidden="true"></span>
            </a>
            <a
              href="#offers"
              class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {{ $t("hero.secondaryCta") }}
            </a>
          </div>
        </div>

        <!-- Terminal -->
        <div class="relative">
          <div
            class="rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl shadow-black/60 overflow-hidden font-mono text-sm"
            role="region"
            aria-label="Terminal interactif"
          >
            <!-- Titlebar -->
            <div
              class="flex items-center gap-2 border-b border-white/5 bg-white/3 px-4 py-3"
            >
              <span class="h-3 w-3 rounded-full bg-red-500/70"></span>
              <span class="h-3 w-3 rounded-full bg-yellow-500/70"></span>
              <span class="h-3 w-3 rounded-full bg-[#00ff88]/70"></span>
              <span class="ml-3 text-xs text-white/20 tracking-wide"
                >florentin@portfolio ~
              </span>
            </div>

            <!-- Body -->
            <div
              ref="terminalBody"
              class="h-80 overflow-y-auto p-5 space-y-1"
              style="
                scrollbar-width: thin;
                scrollbar-color: #00ff8820 transparent;
              "
            >
              <template v-for="(line, i) in terminalLines" :key="i">
                <div
                  v-if="line.type === 'input'"
                  class="flex items-start gap-2"
                >
                  <span class="text-[#00ff88] shrink-0">&gt;</span>
                  <span class="text-white/80">{{ line.text }}</span>
                </div>
                <div
                  v-else-if="line.type === 'output'"
                  class="pl-5 text-white/40 leading-relaxed whitespace-pre text-xs"
                  v-html="line.text"
                ></div>
                <div
                  v-else-if="line.type === 'error'"
                  class="pl-5 text-red-400/70 text-xs"
                >
                  {{ line.text }}
                </div>
                <!-- Parrot : bloc réactif — chaque ligne = un div, white-space:pre dans parrotHtml -->
                <div
                  v-else-if="line.type === 'parrot'"
                  class="pl-2"
                  style="
                    font-size: 11px;
                    line-height: 1.15;
                    font-family: inherit;
                  "
                  v-html="parrotHtml"
                ></div>
                <div v-else class="h-2"></div>
              </template>
              <!-- Typing dots -->
              <div v-if="typing" class="flex items-center gap-1.5 pl-5">
                <span
                  class="dot h-1.5 w-1.5 rounded-full bg-[#00ff88]/60"
                  style="animation-delay: 0ms"
                ></span>
                <span
                  class="dot h-1.5 w-1.5 rounded-full bg-[#00ff88]/60"
                  style="animation-delay: 200ms"
                ></span>
                <span
                  class="dot h-1.5 w-1.5 rounded-full bg-[#00ff88]/60"
                  style="animation-delay: 400ms"
                ></span>
              </div>
            </div>

            <!-- Input -->
            <div
              class="border-t border-white/5 bg-white/2 px-5 py-3 flex items-center gap-2"
            >
              <span class="text-[#00ff88] shrink-0">&gt;</span>
              <input
                v-model="currentInput"
                type="text"
                class="flex-1 bg-transparent text-white/80 outline-none placeholder-white/20 text-sm font-mono"
                placeholder="essayez : help"
                aria-label="Commande terminal"
                @keydown.enter="runCommand"
                @keydown.up.prevent="historyUp"
                @keydown.down.prevent="historyDown"
                @keydown.tab.prevent="autocomplete"
              />
              <span class="text-white/20 text-xs">enter</span>
            </div>
          </div>
          <p class="mt-3 text-center font-mono text-xs text-white/20">
            {{ $t("terminal.write") }} <span class="text-[#00ff88]">help</span> {{ $t("terminal.toStart") }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0a0a0f] to-transparent"
      aria-hidden="true"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount, computed } from "vue";

const { t } = useI18n();

type TerminalLine = {
  type: "input" | "output" | "error" | "spacer" | "parrot";
  text: string;
};

const terminalBody = ref<HTMLElement | null>(null);
const currentInput = ref("");
const typing = ref(false);
const history = ref<string[]>([]);
const historyIndex = ref(-1);
const terminalLines = ref<TerminalLine[]>([]);

/* ============
 * PARTY PARROT
 * ============
 * Frames and logic loaded from hugomd/parrot.live
 */
import frame0 from "~/assets/frames/frame0.txt?raw";
import frame1 from "~/assets/frames/frame1.txt?raw";
import frame2 from "~/assets/frames/frame2.txt?raw";
import frame3 from "~/assets/frames/frame3.txt?raw";
import frame4 from "~/assets/frames/frame4.txt?raw";
import frame5 from "~/assets/frames/frame5.txt?raw";
import frame6 from "~/assets/frames/frame6.txt?raw";
import frame7 from "~/assets/frames/frame7.txt?raw";
import frame8 from "~/assets/frames/frame8.txt?raw";
import frame9 from "~/assets/frames/frame9.txt?raw";

const framesRaw = [
  frame0,
  frame1,
  frame2,
  frame3,
  frame4,
  frame5,
  frame6,
  frame7,
  frame8,
  frame9,
];
const framesLoaded = true;

const PARROT_COLORS = [
  "red",
  "yellow",
  "green",
  "blue",
  "magenta",
  "cyan",
  "white",
] as const;
type ParrotColor = (typeof PARROT_COLORS)[number];

const COLOR_MAP: Record<ParrotColor, string> = {
  red: "#FF4444",
  yellow: "#FFE600",
  green: "#44FF88",
  blue: "#44AAFF",
  magenta: "#FF44CC",
  cyan: "#44FFEE",
  white: "#FFFFFF",
};

const parrotFrameIdx = ref(0);
const parrotColorIdx = ref(0);
let parrotInterval: ReturnType<typeof setInterval> | null = null;

const parrotHtml = computed(() => {
  if (!framesLoaded || !framesRaw.length) return "";
  const frame = framesRaw[parrotFrameIdx.value];
  const color = COLOR_MAP[PARROT_COLORS[parrotColorIdx.value]];
  return frame!
    .split("\n")
    .map((line) => {
      const escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<div style="color:${color};font-weight:500;white-space:pre">${escaped || " "}</div>`;
    })
    .join("");
});

function startParrot() {
  if (parrotInterval) return;
  parrotInterval = setInterval(() => {
    parrotFrameIdx.value = (parrotFrameIdx.value + 1) % framesRaw.length;
    // Couleur aléatoire différente de la précédente — identique au selectColor() original
    let next: number;
    do {
      next = Math.floor(Math.random() * PARROT_COLORS.length);
    } while (next === parrotColorIdx.value);
    parrotColorIdx.value = next;
  }, 70);
}

function stopParrot() {
  if (parrotInterval) {
    clearInterval(parrotInterval);
    parrotInterval = null;
  }
}

/* =========
 * COMMANDES
 * =========
 * 
 */
type CmdFn = (args: string) => string[];

const COMMANDS: Record<string, CmdFn> = {
  help: () => [
    `<span class="text-[#00ff88]/80">${t("terminal.helpTitle")}</span>`,
    `  <span class="text-white/60">whoami</span>       ${t("terminal.helpWhoami")}`,
    `  <span class="text-white/60">skills</span>       ${t("terminal.helpSkills")}`,
    `  <span class="text-white/60">projects</span>     ${t("terminal.helpProjects")}`,
    `  <span class="text-white/60">contact</span>      ${t("terminal.helpContact")}`,
    `  <span class="text-white/60">availability</span> ${t("terminal.helpAvailability")}`,
    `  <span class="text-white/60">echo [texte]</span> ${t("terminal.helpEcho")}`,
    `  <span class="text-white/60">clear</span>        ${t("terminal.helpClear")}`,
    `  <span class="text-white/40 italic">${t("terminal.helpHidden")}</span>`,
  ],
  whoami: () => [
    `<span class="text-[#00ff88]/80">${t("terminal.whoamiName")}</span>`,
    t("const.job"),
    t("about.tagline"),
  ],
  skills: () => [
    `<span class="text-[#00ff88]/80">${t("terminal.skillsTitle")}</span>`,
    `  Back   <span class="text-white/70">Symfony - Python</span>`,
    `  Front  <span class="text-white/70">Vue - Nuxt - React - Next.js - TypeScript</span>`,
    `  DB     <span class="text-white/70">PostgreSQL - MySQL</span>`,
    `  Tools  <span class="text-white/70">Git - Docker - CI/CD</span>`,
  ],
  projects: () => [
    `<span class="text-[#00ff88]/80">${t("terminal.projectsWip")}</span>`,
    `  Dracula vs Van Helsing  <span class="text-white/50">${t("terminal.projectDracula")}</span>`,
    `  Mots fleches            <span class="text-white/50">${t("terminal.projectWordgrid")}</span>`,
    ``,
    `<span class="text-[#00ff88]/80">${t("terminal.projectsDone")}</span>`,
    `  + ${t("proof.items[0].title")}`,
    `  + ${t("proof.items[1].title")}`,
  ],
  contact: () => [
    `<span class="text-[#00ff88]/80">${t("terminal.contactTitle")}</span>`,
    `  ${t("terminal.contactForm")}`,
    `  ${t("terminal.contactEmail")}`,
    ``,
    `<span class="text-white/30">${t("terminal.contactDelay")}</span>`,
  ],
  availability: () => [
    `<span class="text-[#00ff88]/80">${t("terminal.availTitle")}</span>`,
    `  Status   <span class="text-[#00ff88]">disponible</span>`,
    `  ${t("footer.availability")}`,
    `  ${t("terminal.availFormat")}`,
    `  ${t("terminal.availLanguages")}`,
  ],
  echo: (args: string) => {
    if (!args.trim())
      return [`<span class="text-white/30">usage : echo [votre texte]</span>`];
    const safe = args
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return [`<span class="text-[#00ff88]">${safe}</span>`];
  },
  food: () => [``, `  Carbonnade flamande`, `  Riz chipo`, `  Sushi`, ``],
  easteregg: () => [],
  clear: () => [],
};

const AVAILABLE_COMMANDS = Object.keys(COMMANDS);

async function scrollToBottom() {
  await nextTick();
  if (terminalBody.value)
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
}

async function runCommand() {
  const raw = currentInput.value.trim();
  if (!raw) return;

  const spaceIdx = raw.indexOf(" ");
  const cmd = (spaceIdx === -1 ? raw : raw.slice(0, spaceIdx)).toLowerCase();
  const args = spaceIdx === -1 ? "" : raw.slice(spaceIdx + 1);

  history.value.unshift(raw);
  historyIndex.value = -1;
  terminalLines.value.push({ type: "input", text: raw });
  currentInput.value = "";
  await scrollToBottom();

  if (cmd === "clear") {
    await new Promise((r) => setTimeout(r, 100));
    terminalLines.value = [];
    stopParrot();
    return;
  }

  if (cmd === "easteregg") {
    typing.value = true;
    await scrollToBottom();
    await new Promise((r) => setTimeout(r, 300));
    typing.value = false;
    terminalLines.value.push({ type: "parrot", text: "" });
    terminalLines.value.push({
      type: "output",
      text: `<span class="text-white/30 italic">${t("terminal.stop")}</span>`,
    });
    terminalLines.value.push({ type: "spacer", text: "" });
    startParrot();
    await scrollToBottom();
    return;
  }

  typing.value = true;
  await scrollToBottom();
  await new Promise((r) => setTimeout(r, 200 + Math.random() * 150));
  typing.value = false;

  const handler = COMMANDS[cmd];
  if (handler) {
    for (const line of handler(args))
      terminalLines.value.push({ type: "output", text: line });
    terminalLines.value.push({ type: "spacer", text: "" });
  } else {
    terminalLines.value.push({
      type: "error",
      text: `${t("terminal.unknownCommand")} : '${cmd}' — ${t("terminal.write")} 'help'`,
    });
    terminalLines.value.push({ type: "spacer", text: "" });
  }

  await scrollToBottom();
}

function historyUp() {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++;
    currentInput.value = history.value[historyIndex.value] as string;
  }
}
function historyDown() {
  if (historyIndex.value > 0) {
    historyIndex.value--;
    currentInput.value = history.value[historyIndex.value] as string;
  } else {
    historyIndex.value = -1;
    currentInput.value = "";
  }
}
function autocomplete() {
  const partial = currentInput.value.toLowerCase();
  const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(partial));
  if (match) currentInput.value = match;
}

onMounted(async () => {
  const boot: TerminalLine[] = [
    {
      type: "output",
      text: `<span class="text-[#00ff88]/60">${t("const.portfolioVersion") || "florentin-portfolio v1.0.0"}</span>`,
    },
    {
      type: "output",
      text: `<span class="text-white/20">------------------------------------------</span>`,
    },
    {
      type: "output",
      text: `${t("terminal.bootWelcome")}`,
    },
    { type: "spacer", text: "" },
  ];
  for (const line of boot) {
    await new Promise((r) => setTimeout(r, 80));
    terminalLines.value.push(line);
    await scrollToBottom();
  }
});

onBeforeUnmount(() => stopParrot());
</script>

<style scoped>
.orb {
  position: absolute;
  border-radius: 58%;
  filter: blur(80px);
}
.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #00ff88b7 0%, transparent 20%);
  top: -150px;
  left: -150px;
  animation: drift-1 16s ease-in-out infinite;
}
.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #0066ffb7 0%, transparent 40%);
  bottom: -80px;
  right: -80px;
  animation: drift-2 20s ease-in-out infinite;
}
.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #00ff88b7 0%, transparent 40%);
  top: 40%;
  left: 45%;
  animation: drift-3 9s ease-in-out infinite;
}

@keyframes drift-1 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(80px, -60px) scale(1.08);
  }
  50% {
    transform: translate(120px, 40px) scale(0.96);
  }
  75% {
    transform: translate(40px, 90px) scale(1.04);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
@keyframes drift-2 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  30% {
    transform: translate(-90px, -70px) scale(1.06);
  }
  60% {
    transform: translate(-50px, 60px) scale(0.93);
  }
  80% {
    transform: translate(-130px, 20px) scale(1.02);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
@keyframes drift-3 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-70px, -80px) scale(1.1);
  }
  66% {
    transform: translate(60px, 50px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

.cta-shimmer {
  isolation: isolate;
  transition: filter 0.2s;
}
.cta-shimmer:hover {
  filter: brightness(1.05);
}
.shimmer-sweep {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(
    108deg,
    transparent 0%,
    transparent 38%,
    rgba(255, 255, 255, 0) 44%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 56%,
    transparent 62%,
    transparent 100%
  );
  background-size: 300% 100%;
  background-position: 200% center;
  animation: shimmer-ltr 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes shimmer-ltr {
  0% {
    background-position: 200% center;
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  48% {
    background-position: -80% center;
    opacity: 1;
  }
  55%,
  100% {
    background-position: -80% center;
    opacity: 0;
  }
}

.dot {
  animation: blink 1.2s ease-in-out infinite;
}
@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.2;
  }
  40% {
    opacity: 1;
  }
}
</style>
