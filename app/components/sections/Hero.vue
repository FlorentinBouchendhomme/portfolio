<template>
  <section class="bg-[#FAF8F5]" aria-labelledby="hero-title">
    <div
      class="max-w-6xl mx-auto px-8 sm:px-16 pt-32 pb-14 sm:pt-40 sm:pb-20 grid gap-12 lg:grid-cols-2 items-center"
    >
      <!-- Left -->
      <div
        class="transition-all duration-700"
        :class="ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <div
          class="inline-flex items-center gap-2 text-sm text-[#57534E] border border-[#DDD8CE] rounded-full px-3.5 py-1.5 mb-8"
        >
          <span class="w-2 h-2 rounded-full bg-[#3D9A5D] inline-block"></span>
          {{ $t("hero.badge") }}
        </div>

        <h1
          id="hero-title"
          class="font-display font-normal text-[#1C1917] leading-[1.05] mb-6 text-wrap-balance"
          style="font-size: clamp(2.6rem, 5.5vw, 4.1rem)"
        >
          {{ $t("hero.title") }}
        </h1>

        <p class="text-lg leading-relaxed text-[#57534E] max-w-md mb-9">
          {{ $t("hero.subtitle") }}
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            class="inline-flex items-center gap-2 rounded-full bg-[#A8442A] px-8 py-4 text-base font-semibold text-[#FAF8F5] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(168,68,42,0.35)]"
          >
            {{ $t("hero.primaryCta") }}
          </a>
          <a
            href="#offers"
            class="inline-flex items-center gap-2 rounded-full border border-[#D6D1C6] px-8 py-4 text-base font-medium text-[#1C1917] transition hover:border-[#1C1917]"
          >
            {{ $t("hero.secondaryCta") }}
          </a>
        </div>
      </div>

      <!-- Terminal -->
      <div
        class="transition-all duration-700 delay-100"
        :class="ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <SectionsHeroTerminal />
      </div>
    </div>

    <!-- Stack strip -->
    <div class="max-w-6xl mx-auto px-8 sm:px-16 pb-16 flex flex-wrap gap-3">
      <span
        v-for="tag in stackTags"
        :key="tag"
        class="text-sm text-[#78716C] border border-[#E2DED6] rounded-lg px-3.5 py-2"
        >{{ tag }}</span
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const ready = ref(false);
onMounted(() => {
  requestAnimationFrame(() => (ready.value = true));
});

const stackTags = [
  "Symfony",
  "Nuxt / Next",
  "Vue / React",
  "TypeScript",
  "Python",
  "PostgreSQL / MySQL",
  "Docker",
  "CI/CD",
];
</script>
