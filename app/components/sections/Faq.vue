<template>
  <section class="wrap" aria-labelledby="faq-title">
    <div v-reveal class="grid-swiss gap-y-10 pt-16 pb-20 lg:pt-20 lg:pb-28">
      <div class="sm:col-span-6 lg:col-span-4">
        <div class="eyebrow text-ink/55 mb-4">05 / {{ $t("const.faq") }}</div>
        <h2 id="faq-title" class="display-2">{{ $t("faq.title") }}</h2>
      </div>

      <div
        class="sm:col-span-6 lg:col-start-6 lg:col-span-7 border-t-2 border-ink"
      >
        <div v-for="(item, i) in items" :key="i" class="border-b border-ink/20">
          <h3>
            <button
              :id="`faq-q-${i}`"
              type="button"
              class="w-full min-h-11 flex justify-between items-center gap-5 py-5 text-left text-lg font-bold leading-snug cursor-pointer"
              :aria-expanded="openIndex === i"
              :aria-controls="`faq-a-${i}`"
              @click="toggle(i)"
            >
              <span>{{ item.q }}</span>
              <span
                class="relative w-5 h-5 shrink-0 text-accent"
                aria-hidden="true"
              >
                <span
                  class="absolute inset-0 m-auto w-3.5 h-0.5 bg-current"
                ></span>
                <span
                  class="absolute inset-0 m-auto w-0.5 h-3.5 bg-current transition-transform duration-200"
                  :class="openIndex === i ? 'scale-y-0' : 'scale-y-100'"
                ></span>
              </span>
            </button>
          </h3>
          <div
            :id="`faq-a-${i}`"
            role="region"
            :aria-labelledby="`faq-q-${i}`"
            class="grid transition-[grid-template-rows] duration-300"
            :style="{ gridTemplateRows: openIndex === i ? '1fr' : '0fr' }"
            :inert="openIndex !== i"
          >
            <div class="overflow-hidden">
              <p class="text-[15px] text-ink/70 leading-relaxed pb-6 max-w-155">
                {{ item.a }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const { tm } = useI18n();
const { toText } = useI18nText();

type FaqRaw = { q: any; a: any };

const items = computed(() =>
  ((tm("faq.items") as FaqRaw[]) ?? []).map((it) => ({
    q: toText(it.q),
    a: toText(it.a),
  })),
);

// First question open by default, only one open at a time
const openIndex = ref(0);
function toggle(i: number) {
  openIndex.value = openIndex.value === i ? -1 : i;
}
</script>
