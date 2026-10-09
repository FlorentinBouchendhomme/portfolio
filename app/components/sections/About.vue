<template>
  <section class="wrap" aria-labelledby="about-title">
    <div
      v-reveal
      class="grid-swiss gap-y-10 border-t-2 border-ink pt-10 pb-20 lg:pb-28"
    >
      <!-- Title + stats (5 col) -->
      <div class="sm:col-span-6 lg:col-span-5">
        <div class="eyebrow text-ink/55 mb-4">04 / {{ $t("const.about") }}</div>
        <h2 id="about-title" class="display-2">{{ $t("about.heading") }}</h2>

        <dl class="mt-10 grid grid-cols-3 gap-4 border-t-2 border-ink pt-4">
          <div
            v-for="(s, i) in stats"
            :key="i"
            class="flex flex-col-reverse justify-end gap-2"
          >
            <dt class="text-xs leading-snug text-ink/70">{{ s.label }}</dt>
            <dd
              class="text-[30px] font-extrabold leading-none tracking-[-0.03em] text-accent"
            >
              {{ s.value }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Bio + timeline (col 7-12) -->
      <div class="sm:col-span-6 lg:col-start-7 lg:col-span-6">
        <p
          v-for="(p, i) in bio"
          :key="i"
          class="text-lg leading-relaxed text-ink/70 mb-5"
        >
          {{ p }}
        </p>

        <ol class="mt-8 border-t-2 border-ink">
          <li
            v-for="(row, i) in timeline"
            :key="i"
            class="grid grid-cols-[100px_1fr] sm:grid-cols-[100px_1fr_110px] gap-x-4 items-center border-b border-ink/20 py-4"
          >
            <span class="font-mono text-sm text-accent">{{ row.year }}</span>
            <div>
              <div class="font-bold leading-snug">{{ row.title }}</div>
              <div v-if="row.subtitle" class="text-sm text-ink/70">
                {{ row.subtitle }}
              </div>
            </div>
            <div class="hidden sm:block">
              <img
                v-if="row.logo"
                :src="row.logo"
                :alt="row.logoAlt ?? ''"
                width="110"
                height="44"
                class="h-11 w-full object-contain"
                loading="lazy"
              />
              <div
                v-else-if="row.logo === null"
                class="hatch h-11 flex items-center justify-center border border-ink/15 font-mono text-[11px] text-ink/55"
                aria-hidden="true"
              >
                logo
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TIMELINE } from "~/data/timeline";

const { tm } = useI18n();
const { toText, toTextArray } = useI18nText();

type TimelineRaw = { year: any; title: any; subtitle: any };

const bio = computed(() => toTextArray(tm("about.bio") as any[]));

const stats = computed(() =>
  (tm("about.stats") as any[]).map((s: any) => ({
    value: toText(s.value),
    label: toText(s.label),
  })),
);

const timeline = computed(() =>
  ((tm("about.timeline") as TimelineRaw[]) ?? []).map((row, i) => ({
    year: toText(row.year),
    title: toText(row.title),
    subtitle: toText(row.subtitle),
    logo: TIMELINE[i]?.logo ?? false,
    logoAlt: TIMELINE[i]?.logoAlt,
  })),
);
</script>
