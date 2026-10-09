<template>
  <section class="wrap pt-10 pb-20 lg:pb-28" aria-labelledby="offers-title">
    <div v-reveal>
      <div class="grid-swiss gap-y-5 items-end mb-10 lg:mb-14">
        <div class="sm:col-span-6 lg:col-span-7">
          <div class="eyebrow text-ink/55 mb-4">
            01 / {{ $t("const.offers") }}
          </div>
          <h2 id="offers-title" class="display-2">{{ $t("offers.title") }}</h2>
        </div>
        <p
          class="sm:col-span-6 lg:col-start-9 lg:col-span-4 text-ink/70 leading-relaxed"
        >
          {{ $t("offers.subtitle") }}
        </p>
      </div>

      <ul
        class="grid gap-0.5 bg-ink border-2 border-ink sm:grid-cols-2 lg:grid-cols-4"
        :aria-label="$t('const.offers')"
      >
        <li v-for="(key, i) in OFFER_KEYS" :key="key" class="flex">
          <CardsOfferCard
            :index="i + 1"
            :offer-key="key"
            :highlighted="key === 'retainer20'"
            :title="$t(`offers.${key}.name`)"
            :subtitle="$t(`offers.${key}.for`)"
            :price="$t(`offers.${key}.price`)"
            :sub-price="
              te(`offers.${key}.subPrice`) ? $t(`offers.${key}.subPrice`) : ''
            "
          />
        </li>
      </ul>

      <p class="mt-5 text-xs leading-relaxed text-ink/55">
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
import { OFFER_KEYS } from "~/composables/useSiteConfig";

const { tm, te } = useI18n();
const { toTextArray } = useI18nText();

const conditionsText = computed(() =>
  toTextArray(tm("offers.conditions") as any[]),
);
</script>
