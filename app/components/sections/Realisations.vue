<template>
  <section class="wrap" aria-labelledby="realisations-title">
    <div v-reveal class="border-t-2 border-ink pt-10 pb-20 lg:pb-28">
      <!-- Header: title + tabs -->
      <div class="grid-swiss gap-y-6 items-end mb-10 lg:mb-14">
        <div class="sm:col-span-6 lg:col-span-7">
          <div class="eyebrow text-ink/55 mb-4">
            02 / {{ $t("const.projects") }}
          </div>
          <h2 id="realisations-title" class="display-2">
            {{ $t("projects.title") }}
          </h2>
        </div>
        <div class="sm:col-span-6 lg:col-span-5 flex lg:justify-end min-w-0">
          <div
            class="scroll-x flex border-2 border-ink max-w-full"
            role="tablist"
            :aria-label="$t('projects.tabsLabel')"
            @keydown="onTabKeydown"
          >
            <button
              v-for="(p, i) in items"
              :id="`tab-${p.key}`"
              :key="p.key"
              :ref="(el) => (tabRefs[i] = el as HTMLButtonElement)"
              type="button"
              role="tab"
              class="shrink-0 whitespace-nowrap min-h-11 px-4 py-3 text-sm font-bold transition-colors"
              :class="[
                i > 0 && 'border-l-2 border-ink',
                active === i ? 'bg-ink text-paper' : 'hover:bg-ink/5',
              ]"
              :aria-selected="active === i"
              :aria-controls="`panel-${p.key}`"
              :tabindex="active === i ? 0 : -1"
              @click="active = i"
            >
              {{ p.tab }}
            </button>
          </div>
        </div>
      </div>

      <!-- Active project -->
      <div
        v-if="current"
        :id="`panel-${current.key}`"
        role="tabpanel"
        :aria-labelledby="`tab-${current.key}`"
      >
        <div class="grid-swiss gap-y-8">
          <div class="sm:col-span-6 lg:col-span-7">
            <div class="aspect-16/10 border-2 border-ink overflow-hidden hatch">
              <img
                :src="current.image.src"
                :width="current.image.width"
                :height="current.image.height"
                :alt="current.title"
                class="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div class="sm:col-span-6 lg:col-span-5 flex flex-col gap-5">
            <ul
              class="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink/70"
            >
              <li v-for="tag in current.tags" :key="tag">{{ tag }}</li>
            </ul>
            <h3
              class="text-[26px] lg:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]"
            >
              {{ current.title }}
            </h3>
            <p class="text-ink/70 leading-relaxed">{{ current.description }}</p>

            <dl
              v-if="current.metrics.length"
              class="grid grid-cols-3 gap-4 border-t-2 border-ink pt-4"
            >
              <div
                v-for="(m, i) in current.metrics"
                :key="i"
                class="flex flex-col-reverse justify-end gap-2"
              >
                <dt class="text-xs leading-snug text-ink/70">{{ m.label }}</dt>
                <dd
                  class="text-[30px] font-extrabold leading-none tracking-[-0.03em] text-accent"
                >
                  {{ m.value }}
                </dd>
              </div>
            </dl>

            <div class="flex flex-wrap items-center gap-x-6 gap-y-1 mt-auto">
              <button
                type="button"
                class="inline-flex min-h-11 items-center font-bold text-accent hover:text-ink transition-colors"
                aria-haspopup="dialog"
                @click="modalOpen = true"
              >
                {{ $t("projects.caseStudyCta") }}
              </button>
              <a
                :href="current.site"
                target="_blank"
                rel="noopener"
                class="inline-flex min-h-11 items-center font-mono text-sm text-ink/70 hover:text-ink transition-colors"
                >{{ current.siteLabel }} ↗</a
              >
            </div>
          </div>
        </div>

        <!-- Code excerpt + client quote -->
        <div
          v-if="current.code || current.quote"
          class="grid-swiss gap-y-8 mt-8 lg:mt-10"
        >
          <figure
            v-if="current.code"
            class="sm:col-span-6 lg:col-span-7 bg-ink text-paper min-w-0"
          >
            <figcaption
              class="flex flex-wrap justify-between gap-2 border-b border-paper/20 px-5 py-3 font-mono text-xs text-paper/70"
            >
              <span>{{ current.code.file }}</span>
              <span
                >PR #{{ current.code.pr }} ·
                {{ $t("projects.mergedLabel") }}</span
              >
            </figcaption>
            <pre
              class="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed"
            ><code>{{ current.code.snippet }}</code></pre>
          </figure>

          <blockquote
            v-if="current.quote"
            class="sm:col-span-6 lg:col-span-5 border-l-4 border-accent pl-6 self-start"
            :class="{ 'lg:col-start-8': !current.code }"
          >
            <p class="text-xl font-bold leading-snug tracking-[-0.02em]">
              « {{ current.quote.text }} »
            </p>
            <footer
              v-if="current.quote.author"
              class="mt-4 font-mono text-xs text-ink/70"
            >
              {{ current.quote.author }}
            </footer>
          </blockquote>
        </div>
      </div>

      <!-- Side projects -->
      <div class="mt-16 border-t border-ink/20 pt-6">
        <div class="font-mono text-xs text-ink/55 mb-4">
          // {{ $t("projects.side.note") }}
        </div>
        <ul class="grid-swiss gap-y-6">
          <li
            v-for="side in sideProjects"
            :key="side.title"
            class="sm:col-span-3 lg:col-span-6 flex flex-col gap-2"
          >
            <div class="flex flex-wrap items-baseline gap-x-3">
              <span class="font-bold">{{ side.title }}</span>
              <span class="font-mono text-[11px] text-accent">{{
                $t("projects.side.label")
              }}</span>
            </div>
            <p class="text-sm text-ink/70 leading-relaxed">
              {{ side.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Case study modal -->
    <Teleport to="body">
      <div
        v-if="modalOpen && current"
        class="fixed inset-0 z-100 bg-ink/70 flex items-center justify-center p-4 sm:p-12"
        @click.self="modalOpen = false"
      >
        <div
          class="bg-paper border-2 border-ink max-w-3xl w-full max-h-[88vh] overflow-y-auto relative"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`modal-title-${current.key}`"
        >
          <button
            ref="closeBtn"
            type="button"
            class="absolute top-0 right-0 z-10 w-12 h-12 bg-ink text-paper flex items-center justify-center hover:bg-accent transition-colors"
            :aria-label="$t('const.close')"
            @click="modalOpen = false"
          >
            ✕
          </button>
          <div class="aspect-video overflow-hidden border-b-2 border-ink hatch">
            <img
              :src="current.image.src"
              :width="current.image.width"
              :height="current.image.height"
              alt=""
              class="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div class="p-6 sm:p-10 flex flex-col gap-5">
            <ul
              class="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink/70"
            >
              <li v-for="tag in current.tags" :key="tag">{{ tag }}</li>
            </ul>
            <h3
              :id="`modal-title-${current.key}`"
              class="text-3xl font-extrabold tracking-[-0.03em] leading-tight"
            >
              {{ current.title }}
            </h3>
            <p class="text-ink/70 leading-relaxed text-lg">
              {{ current.description }}
            </p>
            <ul class="flex flex-col border-t border-ink/20">
              <li
                v-for="(pt, i) in current.points"
                :key="i"
                class="flex gap-3 items-baseline border-b border-ink/20 py-2.5"
              >
                <span class="font-mono text-xs text-accent">{{
                  String(i + 1).padStart(2, "0")
                }}</span>
                <span>{{ pt }}</span>
              </li>
            </ul>
            <p>
              <strong class="text-accent"
                >{{ $t("projects.resultLabel") }}
              </strong>
              {{ current.result }}
            </p>
            <div class="flex gap-4 items-center flex-wrap">
              <a
                :href="current.site"
                target="_blank"
                rel="noopener"
                class="btn btn-secondary"
                >{{ $t("projects.visitCta") }} {{ current.siteLabel }} ↗</a
              >
              <a
                href="#contact"
                class="inline-flex min-h-11 items-center font-bold text-accent hover:text-ink"
                @click="modalOpen = false"
                >{{ $t("projects.similarProjectCta") }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { PROJECTS } from "~/data/projects";

const { tm, t } = useI18n();
const { toText, toTextArray } = useI18nText();

type MetricRaw = { value: any; label: any };
type QuoteRaw = { text?: any; author?: any };

const items = computed(() =>
  PROJECTS.map((p) => {
    const base = `projects.items.${p.key}`;
    const quoteRaw = (tm(`${base}.quote`) ?? {}) as QuoteRaw;
    const quoteText = quoteRaw.text ? toText(quoteRaw.text) : "";
    return {
      ...p,
      tags: toTextArray(tm(`${base}.tags`) as any[]),
      title: toText(t(`${base}.title`)),
      description: toText(t(`${base}.description`)),
      points: toTextArray(tm(`${base}.points`) as any[]),
      result: toText(t(`${base}.result`)),
      site: toText(t(`${base}.site`)),
      siteLabel: toText(t(`${base}.siteLabel`)),
      // Optional data: blocks are hidden when empty (never show placeholders)
      metrics: ((tm(`${base}.metrics`) as MetricRaw[]) ?? [])
        .map((m) => ({ value: toText(m.value), label: toText(m.label) }))
        .filter((m) => m.value)
        .slice(0, 3),
      quote: quoteText
        ? {
            text: quoteText,
            author: quoteRaw.author ? toText(quoteRaw.author) : "",
          }
        : null,
      code: p.code?.snippet ? p.code : null,
    };
  }),
);

const sideProjects = computed(() => [
  {
    title: t("projects.side.wordgrid.title"),
    description: t("projects.side.wordgrid.description"),
  },
  {
    title: t("projects.side.boardgame.title"),
    description: t("projects.side.boardgame.description"),
  },
]);

/* ====
 * Tabs
 * ==== */
const active = ref(0);
const tabRefs = ref<HTMLButtonElement[]>([]);
const current = computed(() => items.value[active.value]);

function onTabKeydown(e: KeyboardEvent) {
  const n = items.value.length;
  let next: number | null = null;
  if (e.key === "ArrowRight") next = (active.value + 1) % n;
  else if (e.key === "ArrowLeft") next = (active.value - 1 + n) % n;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = n - 1;
  if (next === null) return;
  e.preventDefault();
  active.value = next;
  tabRefs.value[next]?.focus();
}

/* =====
 * Modal
 * ===== */
const modalOpen = ref(false);
const closeBtn = ref<HTMLButtonElement | null>(null);

watch(modalOpen, (isOpen) => {
  if (isOpen) nextTick(() => closeBtn.value?.focus());
});

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") modalOpen.value = false;
}
onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
