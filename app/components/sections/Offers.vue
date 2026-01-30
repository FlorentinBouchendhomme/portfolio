<template>
  <section class="bg-slate-50" aria-labelledby="offers-title">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
      <div class="max-w-2xl">
        <h2
          id="offers-title"
          class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          {{ $t("offers.title") }}
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {{ $t("offers.subtitle") }}
        </p>
      </div>

      <div
        class="mt-10 grid gap-6 md:grid-cols-2"
        role="list"
        aria-label="Offers"
      >
        <CardsOfferCard
          role="listitem"
          :title="$t('offers.retainer10.name')"
          :subtitle="$t('offers.retainer10.for')"
          :price="$t('offers.retainer10.price')"
          :includes="$tm('offers.retainer10.includes')"
          :excludes="$tm('offers.retainer10.excludes')"
        />

        <CardsOfferCard
          role="listitem"
          :title="$t('offers.retainer20.name')"
          :subtitle="$t('offers.retainer20.for')"
          :price="$t('offers.retainer20.price')"
          :includes="$tm('offers.retainer20.includes')"
          :excludes="$tm('offers.retainer20.excludes')"
        />

        <CardsOfferCard
          role="listitem"
          :title="$t('offers.sprint.name')"
          :subtitle="$t('offers.sprint.for')"
          :price="$t('offers.sprint.price')"
          :includes="$tm('offers.sprint.includes')"
        />

        <CardsOfferCard
          role="listitem"
          :title="$t('offers.fromScratch.name')"
          :subtitle="$t('offers.fromScratch.for')"
          :price="$t('offers.fromScratch.price')"
          :includes="$tm('offers.fromScratch.includes')"
        />
      </div>

      <!-- Conditions -->
      <div
        class="mt-8 rounded-2xl border border-slate-200 bg-white p-5"
        aria-labelledby="offers-conditions-title"
      >
        <h3
          id="offers-conditions-title"
          class="text-sm font-semibold text-slate-900"
        >
          {{ $t("offers.conditionsTitle") }}
        </h3>

        <ul class="mt-3 list-disc pl-5 text-sm text-slate-600">
          <li v-for="(c, i) in conditionsText" :key="i">
            {{ c }}
          </li>
        </ul>
      </div>

      <SectionsProcessHorizontal />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { tm } = useI18n();
const { toTextArray } = useI18nText();

const conditionsText = computed(() =>
  toTextArray(tm("offers.conditions") as any[])
);
</script>
