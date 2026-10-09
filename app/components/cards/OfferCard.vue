<template>
  <article
    class="flex-1 flex flex-col gap-4 p-6 lg:p-7"
    :class="highlighted ? 'bg-accent text-white' : 'bg-paper text-ink'"
    :aria-labelledby="titleId"
  >
    <div class="flex items-center justify-between gap-2 font-mono text-[13px]">
      <span :class="highlighted ? 'text-white' : 'text-ink/55'">{{
        String(index).padStart(2, "0")
      }}</span>
      <span
        v-if="highlighted"
        class="border border-white px-2 py-0.5 text-xs uppercase tracking-wide"
        >{{ $t("offers.popularLabel") }}</span
      >
    </div>

    <h3
      :id="titleId"
      class="text-[22px] lg:text-2xl font-extrabold leading-tight tracking-[-0.02em]"
    >
      {{ title }}
    </h3>

    <p
      class="text-[15px] leading-relaxed flex-1"
      :class="highlighted ? 'text-white/90' : 'text-ink/70'"
    >
      {{ subtitle }}
    </p>

    <div
      class="border-t pt-4"
      :class="highlighted ? 'border-white/40' : 'border-ink/20'"
    >
      <div class="text-[22px] font-extrabold tracking-[-0.02em]">
        {{ price }}
        <span
          v-if="subPrice"
          class="text-base font-medium"
          :class="highlighted ? 'text-white/90' : 'text-ink/70'"
          >{{ subPrice }}</span
        >
      </div>
    </div>

    <a
      href="#contact"
      class="inline-flex min-h-11 items-center font-bold transition-colors"
      :class="
        highlighted ? 'text-white hover:text-ink' : 'text-accent hover:text-ink'
      "
      @click="contactFormat = offerKey"
    >
      {{ $t("offers.chooseCta") }}
      <span class="sr-only"> - {{ title }}</span>
    </a>
  </article>
</template>

<script setup lang="ts">
import { useContactFormat, type OfferKey } from "~/composables/useSiteConfig";

defineProps<{
  index: number;
  offerKey: OfferKey;
  title: string;
  subtitle: string;
  price: string;
  subPrice?: string;
  highlighted?: boolean;
}>();

const contactFormat = useContactFormat();
const titleId = `offer-title-${useId()}`;
</script>
