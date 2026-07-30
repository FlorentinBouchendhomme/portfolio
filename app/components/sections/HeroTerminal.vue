<template>
  <div>
    <div
      class="rounded-xl border border-[#38302A] bg-[#201A16] overflow-hidden shadow-[0_32px_70px_rgba(32,26,22,0.35)] cursor-text"
      role="region"
      aria-label="Terminal interactif"
      @click="activate"
    >
      <!-- Titlebar -->
      <div
        class="flex items-center gap-2 border-b border-[#38302A] px-4 py-3.5"
      >
        <span class="h-2.75 w-2.75 rounded-full bg-[#4A403A]"></span>
        <span class="h-2.75 w-2.75 rounded-full bg-[#4A403A]"></span>
        <span class="h-2.75 w-2.75 rounded-full bg-[#4A403A]"></span>
        <span class="ml-2 font-mono text-xs text-[#9A938A]"
          >florentin@portfolio ~</span
        >
        <span class="ml-auto font-mono text-[11px] text-[#6B6259]">{{
          $t("terminal.hint")
        }}</span>
      </div>

      <!-- Body -->
      <div
        ref="termBody"
        class="p-5.5 font-mono text-sm leading-loose h-65.5 overflow-y-auto"
      >
        <div
          v-for="(ln, i) in lines"
          :key="i"
          class="whitespace-pre-wrap"
          :style="{ color: roleColor(ln.role) }"
        >
          {{ ln.text }}
        </div>

        <pre
          v-if="parrotOn"
          class="my-2 text-[10px] leading-tight font-mono"
          :style="{
            color: parrotColor,
            transform: `translateX(${parrotShift}px)`,
          }"
          >{{ parrotFrame }}</pre
        >
        <div v-if="parrotOn" class="text-[#6B6259] italic text-xs">
          {{ $t("terminal.stop") }}
        </div>

        <div class="flex items-center text-[#9A938A]">
          <span>$&nbsp;</span>
          <span class="text-[#F3EFE9]">{{ typedDemo }}</span>
          <input
            v-if="interactive"
            ref="inputEl"
            v-model="typed"
            spellcheck="false"
            autocomplete="off"
            class="flex-1 bg-transparent outline-none border-none text-[#F3EFE9] font-mono text-sm caret-[#E8A87C]"
            @keydown.enter="onEnter"
          />
          <span
            v-else
            class="inline-block w-2 h-4.25 bg-[#E8A87C] terminal-caret"
          ></span>
        </div>
      </div>
    </div>
    <p class="mt-3 text-center font-mono text-xs text-[#78716C]">
      {{ $t("terminal.write") }}
      <span class="text-[#A8442A]">help</span>
      {{ $t("terminal.toStart") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";

const { t } = useI18n();

type Role = "cmd" | "out" | "ok";
type Line = { text: string; role: Role };

const ROLE_COLORS: Record<Role, string> = {
  cmd: "#9A938A",
  out: "#F3EFE9",
  ok: "#E8A87C",
};
function roleColor(r: Role) {
  return ROLE_COLORS[r];
}

const termBody = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);
const lines = ref<Line[]>([]);
const typed = ref("");
const typedDemo = ref("");
const interactive = ref(false);
let mounted = false;
let demoTimer: ReturnType<typeof setTimeout> | undefined;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    demoTimer = setTimeout(resolve, ms);
  });
}

async function scrollToBottom() {
  await nextTick();
  if (termBody.value) termBody.value.scrollTop = termBody.value.scrollHeight;
}

/* =============
 * Party parrot
 * ============= */
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

const FRAMES = [
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
const PARROT_COLORS = [
  "#E8A87C",
  "#5EE38C",
  "#7FB4F0",
  "#E97FD0",
  "#F2E86B",
  "#F08C7F",
];

const parrotOn = ref(false);
const parrotFrame = ref(FRAMES[0]);
const parrotColor = ref(PARROT_COLORS[0]);
const parrotShift = ref(0);
let parrotIdx = 0;
let parrotInterval: ReturnType<typeof setInterval> | null = null;

function startParrot() {
  if (parrotOn.value) return;
  parrotOn.value = true;
  parrotInterval = setInterval(() => {
    parrotIdx = (parrotIdx + 1) % FRAMES.length;
    parrotFrame.value = FRAMES[parrotIdx] as string;
    parrotColor.value = PARROT_COLORS[
      parrotIdx % PARROT_COLORS.length
    ] as string;
    parrotShift.value = (parrotIdx % 2 === 0 ? 1 : -1) * (parrotIdx % 5);
  }, 90);
  scrollToBottom();
}
function stopParrot() {
  if (parrotInterval) {
    clearInterval(parrotInterval);
    parrotInterval = null;
  }
  parrotOn.value = false;
}

/* =========
 * Commands
 * ========= */
function push(text: string, role: Role = "out") {
  lines.value.push({ text, role });
}

function exec(raw: string) {
  const cmd = raw.trim().toLowerCase();
  push("$ " + raw, "cmd");

  if (cmd === "") {
    typed.value = "";
    return;
  }
  if (cmd === "clear") {
    lines.value = [];
    stopParrot();
    typed.value = "";
    return;
  }
  if (cmd === "parrot" || cmd === "easteregg") {
    startParrot();
    typed.value = "";
    scrollToBottom();
    return;
  }

  if (cmd === "help") {
    push(t("terminal.helpTitle"));
    push(`  stack      ${t("terminal.helpStack")}`);
    push(`  offres      ${t("terminal.helpOffers")}`);
    push(`  dispo      ${t("terminal.helpDispo")}`);
    push(`  projets    ${t("terminal.helpProjects")}`);
    push(`  contact    ${t("terminal.helpContact")}`);
    push(`  clear      ${t("terminal.helpClear")}`);
  } else if (cmd === "stack") {
    push(`${t("terminal.stackBack")}   Symfony / Python`);
    push(`${t("terminal.stackFront")}  Nuxt / Next / Vue / React / TypeScript`);
    push(`${t("terminal.stackData")}   PostgreSQL / MySQL`);
    push(`${t("terminal.stackOps")}    Docker / CI/CD / Git`);
  } else if (cmd === "offres") {
    push(`${t("offers.retainer10.name")} .......... ${t("offers.retainer10.price")}`);
    push(`${t("offers.retainer20.name")} .......... ${t("offers.retainer20.price")}`);
    push(`${t("offers.sprint.name")} .......... ${t("offers.sprint.price")}`);
    push(`${t("offers.fromScratch.name")} .......... ${t("offers.fromScratch.price")}`);
  } else if (cmd === "dispo") {
    push(`${t("terminal.dispoLine")}`, "ok");
  } else if (cmd === "projets") {
    push("-> opporta - Symfony / Vue / MySQL");
    push("-> lagencedarchitecture - WordPress sur-mesure");
    push("-> lamobapapa - Nuxt / Symfony / MySQL");
    push(t("terminal.projectsSideLabel"));
  } else if (cmd === "contact") {
    push(`${EMAIL}`, "ok");
    push(`${PHONE}`, "ok");
    push(t("terminal.contactDelay"), "ok");
  } else {
    push(`${t("terminal.unknownCommand")} : '${cmd}' - ${t("terminal.write")} help`);
  }

  typed.value = "";
  scrollToBottom();
}

function onEnter() {
  exec(typed.value);
}

const EMAIL = "contact@florentinbouchendhomme.dev";
const PHONE = "+33 6 00 00 00 00";

function activate() {
  if (!interactive.value) {
    interactive.value = true;
    typedDemo.value = "";
    push(t("terminal.modeInteractive"), "ok");
    scrollToBottom();
    nextTick(() => inputEl.value?.focus());
  } else {
    inputEl.value?.focus();
  }
}

/* =============
 * Demo sequence
 * ============= */
async function runDemo() {
  const cmds = [
    {
      cmd: "florentin --stack",
      out: [
        { text: "symfony / nuxt / vue / next / react", role: "out" as Role },
        { text: "typescript / postgresql / docker / ci/cd", role: "out" as Role },
      ],
    },
    {
      cmd: "florentin --dispo",
      out: [{ text: `${t("terminal.dispoLine")}`, role: "ok" as Role }],
    },
    {
      cmd: "florentin --methode",
      out: [
        { text: "PR propres / reviews / livraisons régulières", role: "ok" as Role },
      ],
    },
  ];

  await wait(700);
  for (const c of cmds) {
    if (!mounted || interactive.value) return;
    for (let i = 1; i <= c.cmd.length; i++) {
      if (!mounted || interactive.value) return;
      typedDemo.value = c.cmd.slice(0, i);
      await wait(40);
    }
    await wait(350);
    if (!mounted || interactive.value) return;
    push("$ " + c.cmd, "cmd");
    for (const o of c.out) push(o.text, o.role);
    typedDemo.value = "";
    await scrollToBottom();
    await wait(1400);
  }
  if (mounted && !interactive.value) {
    push(t("terminal.typeHelpHint"), "cmd");
    await scrollToBottom();
  }
}

onMounted(() => {
  mounted = true;
  runDemo();
});
onBeforeUnmount(() => {
  mounted = false;
  clearTimeout(demoTimer);
  stopParrot();
});
</script>

<style scoped>
.terminal-caret {
  animation: term-blink 1s step-end infinite;
}
@keyframes term-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
</style>
