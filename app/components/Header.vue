<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
    :class="
      scrolled
        ? 'bg-[#FAF8F5]/85 backdrop-blur-md border-[#E9E5DD]'
        : 'bg-transparent border-transparent'
    "
  >
    <div class="px-8 sm:px-16 h-16 flex items-center justify-between">
      <!-- Brand -->
      <NuxtLink
        to="/#top"
        class="font-display text-xl text-[#1C1917] hover:text-[#A8442A] transition"
        aria-label="Retour en haut"
      >
        Florentin Bouchend'homme
      </NuxtLink>

      <!-- Desktop nav -->
      <nav
        class="hidden items-center gap-1 lg:flex"
        aria-label="Navigation principale"
      >
        <div class="relative flex items-center">
          <a
            v-for="(link, i) in navLinks"
            :key="link.href"
            :ref="
              (el) => {
                if (el) navRefs[i] = el as HTMLElement;
              }
            "
            :href="link.href"
            class="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="
              activeSection === link.section
                ? 'text-[#A8442A]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            "
            @click="setActive(link.section)"
            >{{ link.label }}</a
          >
          <span
            class="absolute bottom-0 h-0.5 bg-[#A8442A] transition-all duration-300 ease-out pointer-events-none"
            :style="indicatorStyle"
          ></span>
        </div>

        <!-- Lang switcher -->
        <div
          class="ml-2 flex items-center rounded-md border border-[#E2DED6] overflow-hidden"
        >
          <NuxtLink
            :to="switchLocalePath('fr')"
            class="px-2.5 py-1.5 text-xs font-bold transition"
            :class="
              isFR ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#78716C] hover:text-[#1C1917]'
            "
            >FR</NuxtLink
          >
          <NuxtLink
            :to="switchLocalePath('en')"
            class="px-2.5 py-1.5 text-xs font-bold transition"
            :class="
              !isFR ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#78716C] hover:text-[#1C1917]'
            "
            >EN</NuxtLink
          >
        </div>

        <a
          href="#contact"
          class="ml-3 inline-flex items-center gap-2 rounded-full bg-[#1C1917] px-5 py-2.5 text-sm font-semibold text-[#FAF8F5] transition hover:bg-[#A8442A]"
        >
          {{ $t("const.cta") }} ->
        </a>
      </nav>

      <!-- Mobile burger -->
      <button
        type="button"
        class="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-[#E2DED6] text-[#1C1917] transition"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">{{ t("const.menu") }}</span>
        <svg
          v-if="!isOpen"
          class="h-4 w-4"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <rect y="2" width="16" height="1.5" rx="1" />
          <rect y="7.25" width="16" height="1.5" rx="1" />
          <rect y="12.5" width="16" height="1.5" rx="1" />
        </svg>
        <svg v-else class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M2.22 2.22a.75.75 0 0 1 1.06 0L8 6.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L9.06 8l4.72 4.72a.75.75 0 0 1-1.06 1.06L8 9.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L6.94 8 2.22 3.28a.75.75 0 0 1 0-1.06z"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="border-t border-[#E9E5DD] bg-[#FAF8F5]/95 backdrop-blur-md lg:hidden"
      >
        <div class="flex flex-col px-8 py-4 gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-black/5 transition"
            @click="isOpen = false"
          >
            {{ link.label }}
          </a>
          <a
            href="#contact"
            class="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#1C1917] px-5 py-3 text-sm font-semibold text-[#FAF8F5] transition"
            @click="isOpen = false"
          >
            {{ $t("const.cta") }} ->
          </a>
          <div class="mt-3 flex gap-2 px-3">
            <NuxtLink
              :to="switchLocalePath('fr')"
              class="px-3 py-1.5 rounded text-xs font-bold transition"
              :class="
                isFR
                  ? 'bg-[#1C1917] text-[#FAF8F5]'
                  : 'text-[#78716C] border border-[#E2DED6]'
              "
              >FR</NuxtLink
            >
            <NuxtLink
              :to="switchLocalePath('en')"
              class="px-3 py-1.5 rounded text-xs font-bold transition"
              :class="
                !isFR
                  ? 'bg-[#1C1917] text-[#FAF8F5]'
                  : 'text-[#78716C] border border-[#E2DED6]'
              "
              >EN</NuxtLink
            >
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from "vue";

const { locale, t } = useI18n();
const isFR = computed(() => locale.value === "fr");
const switchLocalePath = useSwitchLocalePath();

const isOpen = ref(false);
const scrolled = ref(false);
const activeSection = ref("top");
const navRefs = ref<HTMLElement[]>([]);
const navTick = ref(0);

const navLinks = computed(() => [
  { href: "#offers", label: t("const.offers"), section: "offers" },
  { href: "#process", label: t("const.process"), section: "process" },
  {
    href: "#realisations",
    label: t("const.projects"),
    section: "realisations",
  },
  { href: "#about", label: t("const.about"), section: "about" },
  { href: "#faq", label: t("const.faq"), section: "faq" },
  { href: "#articles", label: t("const.articles"), section: "articles" },
]);

const indicatorStyle = computed(() => {
  navTick.value; // eslint-disable-line no-unused-expressions -- re-run on resize
  const idx = navLinks.value.findIndex(
    (l) => l.section === activeSection.value,
  );
  const el = navRefs.value[idx];
  if (!el) return { width: "0px", left: "0px", opacity: "0" };
  return {
    width: `${el.offsetWidth}px`,
    left: `${el.offsetLeft}px`,
    opacity: "1",
  };
});

// Reverse document order - used to find the deepest section already scrolled past.
// "testimonials" has no nav link of its own (by design), so it's intentionally
// omitted: while scrolled through it, this naturally falls through to "about",
// the nearest preceding section that does have a link - no dead zone.
const SCROLL_SPY_SECTIONS = [
  "contact",
  "articles",
  "faq",
  "about",
  "realisations",
  "process",
  "offers",
  "top",
];

let clickScrollTimer: ReturnType<typeof setTimeout> | null = null;
const isClickScrolling = ref(false);

function setActive(section: string) {
  activeSection.value = section;
  isOpen.value = false;
  // Ignore scroll-spy updates while the smooth-scroll triggered by this click
  // is still in flight, otherwise the indicator jitters through every
  // in-between section instead of jumping straight to the target.
  isClickScrolling.value = true;
  if (clickScrollTimer) clearTimeout(clickScrollTimer);
  clickScrollTimer = setTimeout(() => {
    isClickScrolling.value = false;
  }, 900);
}

function onScroll() {
  scrolled.value = window.scrollY > 20;
  if (isClickScrolling.value) return;
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

function onResize() {
  navTick.value++;
}

// Nav link widths change when the locale switches (different label lengths);
// re-measure once the DOM has updated with the new text.
watch(locale, () => {
  nextTick(() => navTick.value++);
});

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("resize", onResize);
  // Nav link widths depend on the loaded webfont; force a re-measure once ready.
  document.fonts?.ready?.then(() => navTick.value++);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("resize", onResize);
  if (clickScrollTimer) clearTimeout(clickScrollTimer);
});
</script>
