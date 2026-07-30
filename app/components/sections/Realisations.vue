<template>
  <section class="bg-[#FAF8F5] border-t border-[#E9E5DD]" aria-labelledby="realisations-title">
    <div v-reveal class="mx-auto max-w-6xl px-8 sm:px-16 py-16 sm:py-22">
      <div
        class="text-xs font-semibold uppercase tracking-widest text-[#A8442A] mb-3"
      >
        {{ $t("const.projects") }}
      </div>
      <h2
        id="realisations-title"
        class="font-display font-normal text-[#1C1917] mb-11"
        style="font-size: clamp(2rem, 3.5vw, 2.6rem)"
      >
        {{ $t("projects.title") }}
      </h2>

      <div class="flex flex-col gap-6">
        <div
          v-for="p in items"
          :key="p.key"
          class="grid gap-8 sm:grid-cols-2 border border-[#E2DED6] bg-white p-6 sm:p-8 items-center cursor-pointer transition duration-200 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_20px_50px_rgba(28,25,23,0.1)]"
          @click="open(p.key)"
        >
          <div
            class="rounded-[10px] border border-[#E9E5DD] h-70 overflow-hidden bg-[#F3F0EA]"
          >
            <img
              :src="p.image"
              :alt="p.title"
              class="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
          </div>
          <div class="flex flex-col gap-3.5">
            <div class="flex gap-2 flex-wrap">
              <span
                v-for="tag in p.tags"
                :key="tag"
                class="text-xs text-[#A8442A] border border-[#EBD5CC] rounded-full px-3 py-1"
                >{{ tag }}</span
              >
            </div>
            <h3 class="font-display text-2xl text-[#1C1917]">{{ p.title }}</h3>
            <p class="text-[#57534E] leading-relaxed">{{ p.description }}</p>
            <div class="text-[#1C1917]">
              <strong class="text-[#A8442A]">{{ $t("projects.resultLabel") }} </strong>
              {{ p.result }}
            </div>
            <div class="flex gap-5 items-center flex-wrap">
              <span class="text-[#A8442A] font-semibold text-sm">{{
                $t("projects.caseStudyCta")
              }}</span>
              <a
                :href="p.site"
                target="_blank"
                rel="noopener"
                class="text-[#78716C] text-sm hover:text-[#A8442A] transition"
                @click.stop
                >{{ p.siteLabel }} -></a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Side projects -->
      <div class="mt-14">
        <div class="font-mono text-xs text-[#78716C] mb-5">
          // {{ $t("projects.side.note") }}
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div
            v-for="side in sideProjects"
            :key="side.title"
            class="border border-[#E2DED6] bg-white p-6 flex flex-col gap-2.5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,25,23,0.08)]"
          >
            <div class="flex justify-between items-center gap-2 flex-wrap">
              <div class="font-semibold text-[#1C1917]">{{ side.title }}</div>
              <span
                class="font-mono text-[11px] text-[#A8442A] border border-[#EBD5CC] rounded-full px-2.5 py-0.5"
                >{{ $t("projects.side.label") }}</span
              >
            </div>
            <p class="text-sm text-[#57534E] leading-relaxed">
              {{ side.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="openKey"
        class="fixed inset-0 z-100 bg-[#1C1917]/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-12"
        @click="close"
      >
        <div
          class="bg-[#FAF8F5] rounded-[14px] max-w-3xl w-full max-h-[88vh] overflow-y-auto relative shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
          @click.stop
        >
          <button
            type="button"
            class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#1C1917]/70 text-[#FAF8F5] flex items-center justify-center hover:bg-[#A8442A] transition"
            :aria-label="$t('projects.visitCta')"
            @click="close"
          >
            ✕
          </button>
          <div class="h-70 overflow-hidden bg-[#F3F0EA]">
            <img
              v-if="current"
              :src="current.image"
              :alt="current.title"
              class="w-full h-full object-cover object-top"
            />
          </div>
          <div class="p-6 sm:p-10 flex flex-col gap-5">
            <div class="flex gap-2 flex-wrap">
              <span
                v-for="tag in current?.tags"
                :key="tag"
                class="text-xs text-[#A8442A] border border-[#EBD5CC] rounded-full px-3 py-1"
                >{{ tag }}</span
              >
            </div>
            <h3 class="font-display text-3xl text-[#1C1917]">
              {{ current?.title }}
            </h3>
            <p class="text-[#57534E] leading-relaxed text-lg">
              {{ current?.description }}
            </p>
            <div class="flex flex-col gap-2">
              <div
                v-for="(pt, i) in current?.points"
                :key="i"
                class="flex gap-3 items-baseline text-[#1C1917]"
              >
                <span class="text-[#A8442A] font-mono">-></span>
                <span>{{ pt }}</span>
              </div>
            </div>
            <div class="border-t border-[#E9E5DD] pt-4">
              <strong class="text-[#A8442A]">{{ $t("projects.resultLabel") }} </strong>
              {{ current?.result }}
            </div>
            <div class="flex gap-4 items-center flex-wrap">
              <a
                :href="current?.site"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 rounded-full bg-[#1C1917] text-[#FAF8F5] px-6 py-3 text-sm font-medium hover:bg-[#A8442A] transition"
                >{{ $t("projects.visitCta") }} {{ current?.siteLabel }} -></a
              >
              <a
                href="#contact"
                class="text-[#A8442A] font-semibold text-sm hover:underline"
                @click="close"
                >{{ $t("projects.similarProjectCta") }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import opportaImg from "~/assets/projects/opporta.png";
import ldaImg from "~/assets/projects/lda.png";
import mobImg from "~/assets/projects/lamobapapa.png";

const { tm, t } = useI18n();
const { toText, toTextArray } = useI18nText();

const PROJECT_KEYS = ["opporta", "lda", "mob"] as const;
const PROJECT_IMAGES: Record<(typeof PROJECT_KEYS)[number], string> = {
  opporta: opportaImg,
  lda: ldaImg,
  mob: mobImg,
};

const items = computed(() =>
  PROJECT_KEYS.map((key) => {
    const base = `projects.items.${key}`;
    return {
      key,
      image: PROJECT_IMAGES[key],
      tags: toTextArray(tm(`${base}.tags`) as any[]),
      title: toText(t(`${base}.title`)),
      description: toText(t(`${base}.description`)),
      points: toTextArray(tm(`${base}.points`) as any[]),
      result: toText(t(`${base}.result`)),
      site: toText(t(`${base}.site`)),
      siteLabel: toText(t(`${base}.siteLabel`)),
    };
  })
);

const sideProjects = computed(() => [
  {
    title: t("projects.side.wordgrid.title"),
    description: t("projects.side.wordgrid.description"),
  },
  {
    title: t("projects.side.boardgame.title"),
    description: t("projects.side.boardgame.description"),
  },
]);

const openKey = ref<string | null>(null);
const current = computed(() => items.value.find((p) => p.key === openKey.value));

function open(key: string) {
  openKey.value = key;
}
function close() {
  openKey.value = null;
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}
onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
