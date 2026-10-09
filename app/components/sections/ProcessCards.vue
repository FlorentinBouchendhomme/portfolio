<template>
  <section class="wrap" aria-labelledby="process-title">
    <div v-reveal class="border-t-2 border-ink pt-10 pb-20 lg:pb-28">
      <div class="eyebrow text-ink/55 mb-4">03 / {{ $t("const.process") }}</div>
      <h2 id="process-title" class="display-2 mb-10 lg:mb-14">
        {{ $t("process.title") }}
      </h2>

      <ol
        class="grid gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t-2 border-ink pt-6"
      >
        <li v-for="(s, i) in steps" :key="i" class="flex flex-col gap-3">
          <div
            class="text-[64px] font-extrabold leading-[0.85] tracking-[-0.05em] text-accent"
            aria-hidden="true"
          >
            {{ String(i + 1).padStart(2, "0") }}
          </div>
          <h3 class="text-lg font-bold">{{ s.title }}</h3>
          <p class="text-sm leading-relaxed text-ink/70">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { tm } = useI18n();
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
</script>
