<template>
  <section
    class="bg-[#FAF8F5] border-t border-[#E9E5DD]"
    aria-labelledby="testimonials-title"
  >
    <div class="mx-auto max-w-6xl px-8 sm:px-16 py-16 sm:py-22">
      <div
        class="text-xs font-semibold uppercase tracking-widest text-[#A8442A] mb-3"
      >
        {{ $t("const.testimonies") }}
      </div>
      <h2
        id="testimonials-title"
        class="font-display font-normal text-[#1C1917] mb-11"
        style="font-size: clamp(2rem, 3.5vw, 2.6rem)"
      >
        {{ $t("testimonials.title") }}
      </h2>

      <div class="grid gap-5 sm:grid-cols-2">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="border border-dashed border-[#C9C2B4] p-8 flex flex-col gap-4"
        >
          <div class="font-display text-4xl text-[#A8442A] leading-none">"</div>
          <p class="font-mono text-sm text-[#78716C] leading-relaxed italic">
            {{ item }}
          </p>
          <div class="text-sm text-[#57534E]">
            - {{ $t("testimonials.attribution") }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { tm } = useI18n();
const { toTextArray } = useI18nText();

const items = computed(() => toTextArray(tm("testimonials.items") as any[]));
</script>
