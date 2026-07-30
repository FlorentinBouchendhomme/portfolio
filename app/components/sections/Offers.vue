<template>
  <section
    class="bg-[#FAF8F5] border-t border-[#E9E5DD]"
    aria-labelledby="offers-title"
  >
    <div v-reveal class="mx-auto max-w-6xl px-8 sm:px-16 py-16 sm:py-22">
      <div
        class="text-xs font-semibold uppercase tracking-widest text-[#A8442A] mb-3"
      >
        {{ $t("const.offers") }}
      </div>
      <h2
        id="offers-title"
        class="font-display font-normal text-[#1C1917] mb-3"
        style="font-size: clamp(2rem, 3.5vw, 2.6rem)"
      >
        {{ $t("offers.title") }}
      </h2>
      <p class="text-lg text-[#57534E] max-w-xl mb-11">
        {{ $t("offers.subtitle") }}
      </p>

      <div
        class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Offers"
      >
        <CardsOfferCard
          role="listitem"
          :title="$t('offers.retainer10.name')"
          :subtitle="$t('offers.retainer10.for')"
          :price="$t('offers.retainer10.price')"
          :sub-price="$t('offers.retainer10.subPrice')"
        />

        <CardsOfferCard
          role="listitem"
          highlighted
          :title="$t('offers.retainer20.name')"
          :subtitle="$t('offers.retainer20.for')"
          :price="$t('offers.retainer20.price')"
          :sub-price="$t('offers.retainer20.subPrice')"
        />

        <CardsOfferCard
          role="listitem"
          :title="$t('offers.sprint.name')"
          :subtitle="$t('offers.sprint.for')"
          :price="$t('offers.sprint.price')"
        />

        <CardsOfferCard
          role="listitem"
          :title="$t('offers.fromScratch.name')"
          :subtitle="$t('offers.fromScratch.for')"
          :price="$t('offers.fromScratch.price')"
        />
      </div>

      <p class="mt-8 text-sm text-[#78716C]">
        <span v-for="(c, i) in conditionsText" :key="i"
          >{{ c
          }}<template v-if="i < conditionsText.length - 1"> / </template></span
        >
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { tm } = useI18n();
const { toTextArray } = useI18nText();

const conditionsText = computed(() =>
  toTextArray(tm("offers.conditions") as any[]),
);
</script>
