<template>
  <header class="sticky top-0 z-50 bg-paper border-b-2 border-ink">
    <div
      class="wrap h-16 flex items-center justify-between gap-4 lg:grid-swiss lg:items-center"
    >
      <!-- Brand (3 col) -->
      <NuxtLink
        to="/#top"
        class="min-w-0 lg:col-span-3 font-extrabold tracking-[-0.02em] text-[17px] truncate hover:text-accent transition-colors"
        :aria-label="$t('const.backToTop')"
      >
        Florentin Bouchend'homme
      </NuxtLink>

      <!-- Links (6 col) -->
      <nav
        class="hidden lg:flex lg:col-span-6 items-center gap-6"
        :aria-label="$t('const.mainNav')"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="py-2 text-[15px] font-medium border-b-2 transition-colors"
          :class="
            activeSection === link.section
              ? 'text-accent border-accent'
              : 'border-transparent text-ink/70 hover:text-ink'
          "
          :aria-current="activeSection === link.section ? 'true' : undefined"
          @click="setActive(link.section)"
          >{{ link.label }}</a
        >
      </nav>

      <!-- Lang + CTA (3 col, right) -->
      <div class="hidden lg:flex lg:col-span-3 items-center justify-end gap-5">
        <div class="flex items-center gap-2 font-mono text-[13px]">
          <NuxtLink
            :to="switchLocalePath('fr')"
            class="py-2"
            :class="
              isFR ? 'text-ink font-medium' : 'text-ink/55 hover:text-ink'
            "
            :aria-current="isFR ? 'true' : undefined"
            >FR</NuxtLink
          >
          <span class="text-ink/30" aria-hidden="true">/</span>
          <NuxtLink
            :to="switchLocalePath('en')"
            class="py-2"
            :class="
              !isFR ? 'text-ink font-medium' : 'text-ink/55 hover:text-ink'
            "
            :aria-current="!isFR ? 'true' : undefined"
            >EN</NuxtLink
          >
        </div>
        <a
          href="#contact"
          class="font-bold text-accent hover:text-ink transition-colors"
        >
          {{ $t("const.cta") }} →
        </a>
      </div>

      <!-- Mobile burger -->
      <div class="flex lg:hidden justify-end">
        <button
          type="button"
          class="h-11 w-11 flex items-center justify-center border-2 border-ink"
          :aria-expanded="isOpen"
          aria-controls="mobile-menu"
          @click="isOpen = !isOpen"
        >
          <span class="sr-only">{{ t("const.menu") }}</span>
          <svg
            v-if="!isOpen"
            class="h-4 w-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect y="2" width="16" height="2" />
            <rect y="7" width="16" height="2" />
            <rect y="12" width="16" height="2" />
          </svg>
          <svg
            v-else
            class="h-4 w-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M1.4 0 8 6.6 14.6 0 16 1.4 9.4 8l6.6 6.6-1.4 1.4L8 9.4 1.4 16 0 14.6 6.6 8 0 1.4z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isOpen"
      id="mobile-menu"
      class="lg:hidden border-t-2 border-ink bg-paper"
    >
      <nav class="wrap flex flex-col py-2" :aria-label="$t('const.mainNav')">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="flex items-center min-h-12 border-b border-ink/15 text-lg font-bold"
          @click="setActive(link.section)"
        >
          {{ link.label }}
        </a>
        <div class="flex items-center justify-between gap-4 py-4">
          <div class="flex items-center gap-2 font-mono text-sm">
            <NuxtLink
              :to="switchLocalePath('fr')"
              class="min-h-11 min-w-11 inline-flex items-center justify-center"
              :class="isFR ? 'text-ink font-medium underline' : 'text-ink/55'"
              >FR</NuxtLink
            >
            <NuxtLink
              :to="switchLocalePath('en')"
              class="min-h-11 min-w-11 inline-flex items-center justify-center"
              :class="!isFR ? 'text-ink font-medium underline' : 'text-ink/55'"
              >EN</NuxtLink
            >
          </div>
          <a href="#contact" class="btn btn-primary" @click="isOpen = false">
            {{ $t("const.cta") }} →
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { SHOW_ARTICLES } from "~/composables/useSiteConfig";

const { locale, t } = useI18n();
const isFR = computed(() => locale.value === "fr");
const switchLocalePath = useSwitchLocalePath();

const isOpen = ref(false);
const activeSection = ref("top");

const navLinks = computed(() => [
  { href: "#offers", label: t("const.offers"), section: "offers" },
  {
    href: "#realisations",
    label: t("const.projects"),
    section: "realisations",
  },
  { href: "#process", label: t("const.process"), section: "process" },
  { href: "#about", label: t("const.about"), section: "about" },
  { href: "#faq", label: t("const.faq"), section: "faq" },
  ...(SHOW_ARTICLES
    ? [{ href: "#articles", label: t("const.articles"), section: "articles" }]
    : []),
]);

// Reverse document order - used to find the deepest section already scrolled past.
// "testimonials" has no nav link of its own (by design), so it's intentionally
// omitted: while scrolled through it, this naturally falls through to "about".
const SCROLL_SPY_SECTIONS = [
  "contact",
  "articles",
  "faq",
  "about",
  "process",
  "realisations",
  "offers",
  "top",
];

let clickScrollTimer: ReturnType<typeof setTimeout> | null = null;
let isClickScrolling = false;

function setActive(section: string) {
  activeSection.value = section;
  isOpen.value = false;
  // Ignore scroll-spy updates while the smooth-scroll triggered by this click
  // is still in flight, otherwise the active link flickers through every section.
  isClickScrolling = true;
  if (clickScrollTimer) clearTimeout(clickScrollTimer);
  clickScrollTimer = setTimeout(() => {
    isClickScrolling = false;
  }, 900);
}

function onScroll() {
  if (isClickScrolling) return;
  for (const id of SCROLL_SPY_SECTIONS) {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = id;
      break;
    }
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") isOpen.value = false;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
  if (clickScrollTimer) clearTimeout(clickScrollTimer);
});
</script>
