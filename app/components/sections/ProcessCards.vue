<template>
  <section
    class="bg-[#F3F0EA] border-t border-[#E9E5DD]"
    aria-labelledby="process-title"
  >
    <div v-reveal class="mx-auto max-w-6xl px-8 sm:px-16 py-16 sm:py-22">
      <div
        class="text-xs font-semibold uppercase tracking-widest text-[#A8442A] mb-3"
      >
        {{ $t("const.process") }}
      </div>
      <h2
        id="process-title"
        class="font-display font-normal text-[#1C1917] mb-11"
        style="font-size: clamp(2rem, 3.5vw, 2.6rem)"
      >
        {{ $t("process.title") }}
      </h2>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div
          v-for="(s, i) in steps"
          :key="i"
          class="border border-[#E2DED6] bg-white rounded-[14px] p-6 flex flex-col gap-3 transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(28,25,23,0.1)] hover:border-[#C9C2B4]"
        >
          <div class="font-display text-4xl text-[#A8442A]">
            {{ String(i + 1).padStart(2, "0") }}
          </div>
          <div class="font-semibold text-[#1C1917]">{{ s.title }}</div>
          <p class="text-sm leading-relaxed text-[#57534E]">{{ s.text }}</p>
        </div>
      </div>
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
