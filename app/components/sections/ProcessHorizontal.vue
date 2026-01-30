<template>
  <section
    class="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6"
  >
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p class="text-sm font-semibold text-emerald-900">
          {{ $t("process.title") }}
        </p>
        <p class="mt-1 text-sm text-emerald-900/80">
          {{ $t("process.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Reduced motion fallback -->
    <ol v-if="reduceMotion" class="mt-6 grid gap-2 sm:grid-cols-2">
      <li
        v-for="(s, i) in steps"
        :key="i"
        class="rounded-xl border border-emerald-100 bg-white/70 px-4 py-3 text-sm text-slate-800"
      >
        <span
          class="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold"
        >
          {{ i + 1 }}
        </span>
        {{ s.text }}
      </li>
    </ol>

    <!-- Horizontal scroll section -->
    <div v-else class="mt-6">
      <div
        ref="pinEl"
        class="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/60"
        :aria-label="$t('process.aria.scrollerLabel')"
      >
        <!-- Progress bar -->
        <div
          class="pointer-events-none absolute left-0 top-0 h-1 w-full bg-emerald-100"
        >
          <div ref="progressEl" class="h-full w-0 bg-emerald-600"></div>
        </div>

        <div class="flex min-h-[70vh] items-center">
          <div
            ref="trackEl"
            class="flex gap-6 px-6 py-10 will-change-transform"
          >
            <article
              v-for="(s, i) in steps"
              :key="i"
              class="process-card relative w-[90vw] max-w-205 shrink-0 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl"
              :aria-label="`${stepWord} ${i + 1}: ${s.title}`"
            >
              <div
                class="absolute inset-0 bg-linear-to-br from-emerald-50 via-white to-slate-50"
                aria-hidden="true"
              ></div>

              <div class="relative p-8 sm:p-10">
                <div class="flex items-center justify-between gap-6">
                  <div class="flex items-center gap-4">
                    <span
                      class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-xl font-extrabold text-white shadow-sm"
                      aria-hidden="true"
                    >
                      {{ i + 1 }}
                    </span>

                    <div>
                      <p class="text-sm font-semibold text-emerald-800">
                        {{ $t("process.title") }}
                      </p>
                      <h3
                        class="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
                      >
                        {{ s.title }}
                      </h3>
                    </div>
                  </div>

                  <span
                    class="hidden sm:inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900"
                  >
                    {{ durationBadge }}
                  </span>
                </div>

                <p
                  class="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg"
                >
                  {{ s.text }}
                </p>

                <div class="mt-8 grid gap-4 sm:grid-cols-2">
                  <div
                    class="rounded-2xl border border-slate-200 bg-white/70 p-4"
                  >
                    <p class="text-sm font-semibold text-slate-900">
                      {{ whatYouGetTitle }}
                    </p>
                    <p class="mt-1 text-sm text-slate-600">
                      {{ whatYouGetText }}
                    </p>
                  </div>

                  <div
                    class="rounded-2xl border border-slate-200 bg-white/70 p-4"
                  >
                    <p class="text-sm font-semibold text-slate-900">
                      {{ outputTitle }}
                    </p>
                    <p class="mt-1 text-sm text-slate-600">
                      {{ outputText }}
                    </p>
                  </div>
                </div>

                <div class="mt-8 flex items-center gap-3">
                  <p class="text-xs text-slate-500">
                    {{ hint }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pinEl = ref<HTMLElement | null>(null);
const trackEl = ref<HTMLElement | null>(null);
const progressEl = ref<HTMLElement | null>(null);

const { tm, t } = useI18n();
const { toText } = useI18nText();

type StepRaw = { title: any; text: any };
type Step = { title: string; text: string };

const steps = computed<Step[]>(() => {
  const raw = (tm("process.steps") as StepRaw[]) ?? [];
  return raw.map((s) => ({
    title: toText(s.title),
    text: toText(s.text),
  }));
});

const stepWord = computed(() => t("process.aria.stepWord"));
const durationBadge = computed(() => t("process.durationBadge"));

const whatYouGetTitle = computed(() => t("process.cards.whatYouGetTitle"));
const whatYouGetText = computed(() => t("process.cards.whatYouGetText"));
const outputTitle = computed(() => t("process.cards.outputTitle"));
const outputText = computed(() => t("process.cards.outputText"));
const hint = computed(() => t("process.hint"));

const reduceMotion = ref(false);

let st: ScrollTrigger | null = null;
let tween: gsap.core.Tween | null = null;

function cleanup() {
  st?.kill();
  st = null;
  tween?.kill();
  tween = null;
}

function setupHorizontal() {
  const pin = pinEl.value;
  const track = trackEl.value;
  const progress = progressEl.value;
  if (!pin || !track) return;

  const cards = Array.from(
    track.querySelectorAll<HTMLElement>(".process-card")
  );
  const distance = Math.max(0, track.scrollWidth - pin.clientWidth);

  cleanup();

  tween = gsap.to(track, {
    x: -distance,
    ease: "none",
    scrollTrigger: {
      id: "process-horizontal",
      trigger: pin,
      start: "center center",
      end: `+=${Math.max(700, distance)}`,
      scrub: 0.9,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      snap: {
        snapTo: (value) => {
          const n = Math.max(1, cards.length - 1);
          return Math.round(value * n) / n;
        },
        duration: { min: 0.15, max: 0.35 },
        ease: "power2.out",
      },
      onUpdate: (self) => {
        if (progress)
          progress.style.width = `${Math.round(self.progress * 100)}%`;
      },
    },
  });

  st = tween.scrollTrigger ?? null;
  ScrollTrigger.refresh();
}

onMounted(async () => {
  reduceMotion.value =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  if (reduceMotion.value) return;

  await nextTick();
  setupHorizontal();

  const onResize = () => setupHorizontal();
  window.addEventListener("resize", onResize);
  onBeforeUnmount(() => window.removeEventListener("resize", onResize));
});

onBeforeUnmount(() => cleanup());
</script>
