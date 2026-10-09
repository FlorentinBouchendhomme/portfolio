<template>
  <section class="wrap" aria-labelledby="articles-title">
    <div v-reveal class="border-t-2 border-ink pt-10 pb-20 lg:pb-28">
      <div class="eyebrow text-ink/55 mb-4">{{ $t("const.articles") }}</div>
      <h2 id="articles-title" class="display-2 mb-10 lg:mb-14">
        {{ $t("articles.title") }}
      </h2>

      <ul class="grid gap-0.5 bg-ink border-2 border-ink sm:grid-cols-3">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="bg-paper p-6 lg:p-7 flex flex-col gap-3"
        >
          <div class="font-mono text-xs text-ink/55">
            {{ $t("articles.comingSoon") }}
          </div>
          <h3 class="text-xl font-extrabold leading-snug tracking-[-0.02em]">
            {{ item.title }}
          </h3>
          <p class="text-sm text-ink/70 leading-relaxed">
            {{ item.description }}
          </p>
        </li>
      </ul>
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
