<template>
  <section
    class="bg-[#F3F0EA] border-t border-[#E9E5DD]"
    aria-labelledby="faq-title"
  >
    <div v-reveal class="mx-auto max-w-3xl px-8 sm:px-16 py-16 sm:py-22">
      <div
        class="text-xs font-semibold uppercase tracking-widest text-[#A8442A] mb-3"
      >
        {{ $t("const.faq") }}
      </div>
      <h2
        id="faq-title"
        class="font-display font-normal text-[#1C1917] mb-10"
        style="font-size: clamp(2rem, 3.5vw, 2.6rem)"
      >
        {{ $t("faq.title") }}
      </h2>

      <div class="flex flex-col">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="border-b border-[#E9E5DD]"
        >
          <button
            type="button"
            class="w-full flex justify-between items-center gap-5 py-5.5 text-left cursor-pointer"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            <span class="font-semibold text-[#1C1917]">{{ item.q }}</span>
            <span
              class="relative w-5 h-5 shrink-0 text-[#A8442A]"
              aria-hidden="true"
            >
              <span
                class="absolute inset-0 m-auto w-3 h-0.5 bg-current"
              ></span>
              <span
                class="absolute inset-0 m-auto w-0.5 h-3 bg-current transition-transform duration-300 ease-out"
                :class="openIndex === i ? 'rotate-90' : 'rotate-0'"
              ></span>
            </span>
          </button>
          <div
            class="grid transition-[grid-template-rows] duration-300"
            :style="{
              gridTemplateRows: openIndex === i ? '1fr' : '0fr',
            }"
          >
            <div class="overflow-hidden">
              <p class="text-[#57534E] leading-relaxed pb-5.5 pr-4 max-w-xl">
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

const openIndex = ref(0);
function toggle(i: number) {
  openIndex.value = openIndex.value === i ? -1 : i;
}
</script>
