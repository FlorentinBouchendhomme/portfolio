<template>
  <section
    class="bg-[#F3F0EA] border-t border-[#E9E5DD]"
    aria-labelledby="about-title"
  >
    <div
      v-reveal
      class="mx-auto max-w-6xl px-8 sm:px-16 py-16 sm:py-22 grid gap-12 lg:grid-cols-2 items-start"
    >
      <div>
        <div
          class="text-xs font-semibold uppercase tracking-widest text-[#A8442A] mb-3"
        >
          {{ $t("const.about") }}
        </div>
        <h2
          id="about-title"
          class="font-display font-normal text-[#1C1917] mb-6"
          style="font-size: clamp(2rem, 3.5vw, 2.6rem)"
        >
          {{ $t("about.heading") }}
        </h2>

        <p
          v-for="(p, i) in bio"
          :key="i"
          class="text-lg leading-relaxed text-[#57534E] max-w-xl mb-5"
        >
          {{ p }}
        </p>

        <div class="flex flex-wrap gap-3 mt-2">
          <span
            class="text-sm text-[#78716C] border border-[#DDD8CE] rounded-lg px-3.5 py-2"
            >{{ $t("about.locationTag") }}</span
          >
          <span
            class="text-sm text-[#78716C] border border-[#DDD8CE] rounded-lg px-3.5 py-2"
            >{{ $t("about.statusTag") }}</span
          >
        </div>
      </div>

      <div class="flex flex-col gap-7">
        <div v-for="(s, i) in stats" :key="i">
          <div class="font-display text-[44px] leading-none text-[#A8442A]">
            {{ s.value }}
          </div>
          <div class="text-sm text-[#57534E] mt-1.5">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { tm } = useI18n();
const { toText, toTextArray } = useI18nText();

const bio = computed(() => toTextArray(tm("about.bio") as any[]));

const stats = computed(() =>
  (tm("about.stats") as any[]).map((s: any) => ({
    value: toText(s.value),
    label: toText(s.label),
  }))
);
</script>
