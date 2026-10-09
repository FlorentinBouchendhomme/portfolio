<template>
  <section class="bg-accent text-white" aria-labelledby="testimonials-title">
    <div class="wrap grid-swiss gap-y-8 items-end py-16 lg:py-20">
      <!-- Quote (8 col) - rendered only once a real testimonial exists -->
      <figure v-if="quote" class="sm:col-span-6 lg:col-span-8">
        <h2 id="testimonials-title" class="sr-only">
          {{ $t("testimonials.title") }}
        </h2>
        <blockquote
          class="text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em]"
        >
          « {{ quote.text }} »
        </blockquote>
        <figcaption v-if="quote.author" class="mt-6 font-mono text-sm">
          {{ quote.author }}
        </figcaption>
      </figure>

      <!-- Call for testimonials (col 10-12, or full width when no quote) -->
      <div
        :class="
          quote
            ? 'sm:col-span-6 lg:col-start-10 lg:col-span-3'
            : 'sm:col-span-6 lg:col-span-12 flex flex-wrap items-end justify-between gap-6'
        "
      >
        <component
          :is="quote ? 'p' : 'h2'"
          :id="quote ? undefined : 'testimonials-title'"
          :class="
            quote
              ? 'text-lg font-bold mb-2'
              : 'text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em]'
          "
        >
          {{ $t("testimonials.askTitle") }}
        </component>
        <a
          :href="mailHref"
          class="inline-flex min-h-11 items-center font-bold underline underline-offset-4 decoration-2 hover:text-ink transition-colors"
        >
          {{ $t("testimonials.askCta") }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SITE_EMAIL } from "~/composables/useSiteConfig";

const { tm, t } = useI18n();
const { toText } = useI18nText();

type QuoteRaw = { text?: any; author?: any };

const quote = computed(() => {
  const raw = (tm("testimonials.quote") ?? {}) as QuoteRaw;
  const text = raw.text ? toText(raw.text) : "";
  return text ? { text, author: raw.author ? toText(raw.author) : "" } : null;
});

const mailHref = computed(
  () =>
    `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(t("testimonials.mailSubject"))}`,
);
</script>
