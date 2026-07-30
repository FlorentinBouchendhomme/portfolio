<template>
  <article
    class="border p-7 flex flex-col gap-3 transition duration-200 hover:-translate-y-1"
    :class="
      highlighted
        ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5] hover:shadow-[0_16px_40px_rgba(168,68,42,0.35)] hover:border-[#4A403A]'
        : 'border-[#E2DED6] bg-white hover:shadow-[0_16px_40px_rgba(28,25,23,0.08)] hover:border-[#A8442A]/40'
    "
    :aria-labelledby="titleId"
    :aria-describedby="subtitleId"
  >
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <h3
        :id="titleId"
        class="text-lg font-semibold"
        :class="highlighted ? 'text-[#FAF8F5]' : 'text-[#1C1917]'"
      >
        {{ titleText }}
      </h3>
      <span
        v-if="highlighted"
        class="text-xs bg-[#A8442A] text-[#FAF8F5] rounded-full px-2.5 py-0.5"
        >{{ $t("offers.popularLabel") }}</span
      >
    </div>

    <p
      :id="subtitleId"
      class="text-sm leading-relaxed flex-1"
      :class="highlighted ? 'text-[#C7C2B8]' : 'text-[#57534E]'"
    >
      {{ subtitleText }}
    </p>

    <div
      class="font-display text-2xl"
      :class="highlighted ? 'text-[#FAF8F5]' : 'text-[#1C1917]'"
    >
      {{ priceText }}
      <span class="text-lg" :class="highlighted ? 'text-[#C7C2B8]' : 'text-[#57534E]'">
        {{ subPriceText }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Props = {
  title: any;
  subtitle: any;
  price: any;
  subPrice?: any;
  highlighted?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  highlighted: false,
});

const { toText } = useI18nText();

const uid = useId();
const titleId = `offer-title-${uid}`;
const subtitleId = `offer-subtitle-${uid}`;

const titleText = computed(() => toText(props.title));
const subtitleText = computed(() => toText(props.subtitle));
const priceText = computed(() => toText(props.price));
const subPriceText = computed(() => toText(props.subPrice));
</script>
