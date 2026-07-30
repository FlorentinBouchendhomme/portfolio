<template>
  <section
    class="bg-[#F3F0EA] border-t border-[#E9E5DD]"
    aria-labelledby="articles-title"
  >
    <div v-reveal class="mx-auto max-w-6xl px-8 sm:px-16 py-16 sm:py-22">
      <div
        class="text-xs font-semibold uppercase tracking-widest text-[#A8442A] mb-3"
      >
        {{ $t("const.articles") }}
      </div>
      <h2
        id="articles-title"
        class="font-display font-normal text-[#1C1917] mb-11"
        style="font-size: clamp(2rem, 3.5vw, 2.6rem)"
      >
        {{ $t("articles.title") }}
      </h2>

      <div class="grid gap-5 sm:grid-cols-3">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="border border-[#E2DED6] bg-white p-7 flex flex-col gap-3 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,25,23,0.08)]"
        >
          <div class="font-mono text-xs text-[#A8442A]">
            {{ $t("articles.comingSoon") }}
          </div>
          <div class="font-display text-xl leading-snug text-[#1C1917]">
            {{ item.title }}
          </div>
          <p class="text-sm text-[#57534E] leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { tm } = useI18n();
const { toText } = useI18nText();

type ArticleRaw = { title: any; description: any };

const items = computed(() =>
  ((tm("articles.items") as ArticleRaw[]) ?? []).map((it) => ({
    title: toText(it.title),
    description: toText(it.description),
  })),
);
</script>
