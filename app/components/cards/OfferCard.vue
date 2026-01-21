<template>
  <article
    class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    :aria-labelledby="titleId"
    :aria-describedby="subtitleId"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 :id="titleId" class="text-base font-semibold text-slate-900">
          {{ titleText }}
        </h3>

        <p :id="subtitleId" class="mt-2 text-sm text-slate-600">
          {{ subtitleText }}
        </p>
      </div>

      <div
        class="shrink-0 rounded-xl bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
        :aria-label="`${$t('offers.priceLabel')}: ${priceText}`"
      >
        {{ priceText }}
      </div>
    </div>

    <div class="mt-5">
      <p class="text-xs font-semibold uppercase tracking-wide text-emerald-500">
        {{ $t("offers.includedLabel") }}
      </p>

      <ul class="mt-2 space-y-2" :aria-label="$t('offers.includedLabel')">
        <li
          v-for="(x, i) in includesText"
          :key="i"
          class="flex gap-2 text-sm text-slate-700"
        >
          <span
            class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full"
            aria-hidden="true"
          >
            <img
              src="~/assets/icones/check.svg"
              alt=""
              class="h-4 w-4"
              aria-hidden="true"
            />
          </span>
          <span>{{ x }}</span>
        </li>
      </ul>

      <div v-if="excludesText.length" class="mt-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-500">
          {{ $t("offers.notIncludedLabel") }}
        </p>

        <ul class="mt-2 space-y-2" :aria-label="$t('offers.notIncludedLabel')">
          <li
            v-for="(x, i) in excludesText"
            :key="i"
            class="flex gap-2 text-sm text-slate-600"
          >
            <span
              class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <img
                src="~/assets/icones/close.svg"
                alt=""
                class="h-4 w-4"
                aria-hidden="true"
              />
            </span>
            <span>{{ x }}</span>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Props = {
  title: any;
  subtitle: any;
  price: any;
  includes: any[];
  excludes?: any[];
};

const props = withDefaults(defineProps<Props>(), {
  excludes: () => [],
});

const { toText, toTextArray } = useI18nText();

// Stable unique ids for aria-labelledby / aria-describedby
const uid = useId();
const titleId = `offer-title-${uid}`;
const subtitleId = `offer-subtitle-${uid}`;

// Convert everything to plain text
const titleText = computed(() => toText(props.title));
const subtitleText = computed(() => toText(props.subtitle));
const priceText = computed(() => toText(props.price));
const includesText = computed(() => toTextArray(props.includes));
const excludesText = computed(() => toTextArray(props.excludes));
</script>
