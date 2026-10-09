<template>
  <section class="wrap pt-6 pb-16 lg:pb-24" aria-labelledby="hero-title">
    <!-- Meta line -->
    <div
      class="grid-swiss gap-y-2 border-b border-ink/20 pb-4 font-mono text-[13px] text-ink/70"
    >
      <div class="sm:col-span-2 lg:col-span-4">{{ $t("hero.role") }}</div>
      <div class="sm:col-span-2 lg:col-span-4 flex items-center gap-2">
        <span class="h-2 w-2 shrink-0 bg-accent" aria-hidden="true"></span>
        {{ $t("hero.badge") }}
      </div>
      <div class="sm:col-span-2 lg:col-span-4 sm:text-right">
        {{ $t("about.locationTag") }}
      </div>
    </div>

    <!-- Title -->
    <h1 id="hero-title" class="display-1 mt-10 sm:mt-14 lg:mt-20">
      {{ titleStart }}
      <span class="text-accent">{{ titleEnd }}</span>
    </h1>

    <!-- Intro + CTAs -->
    <div class="grid-swiss gap-y-8 mt-10 lg:mt-16 items-end">
      <p
        class="sm:col-span-6 lg:col-span-6 text-lg leading-relaxed text-ink/70"
      >
        {{ $t("hero.subtitle") }}
      </p>
      <div
        class="sm:col-span-6 lg:col-start-8 lg:col-span-5 flex flex-wrap gap-3 lg:justify-end"
      >
        <a href="#contact" class="btn btn-primary">
          {{ $t("hero.primaryCta") }} →
        </a>
        <a href="#offers" class="btn btn-secondary">
          {{ $t("hero.secondaryCta") }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { t } = useI18n();

// Last word of the title is highlighted ("méritent." / "deserves.")
const title = computed(() => t("hero.title"));
const titleStart = computed(() =>
  title.value.slice(0, title.value.lastIndexOf(" ")),
);
const titleEnd = computed(() =>
  title.value.slice(title.value.lastIndexOf(" ") + 1),
);
</script>
