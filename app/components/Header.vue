<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5'
        : 'bg-transparent'
    "
  >
    <div class="px-8 sm:px-16 h-14 flex items-center justify-between">
      <!-- Brand -->
      <NuxtLink
        to="/#top"
        class="group flex items-center gap-2.5 font-mono text-sm font-bold tracking-tight text-white"
        aria-label="Retour en haut"
      >
        <span class="text-[#00ff88]">&gt;</span>
        <span class="transition group-hover:text-[#00ff88]"
          >florentinbouchend'homme</span
        >
        <span class="animate-pulse text-[#00ff88]">_</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav
        class="hidden items-center gap-1 md:flex"
        aria-label="Navigation principale"
      >
        <div
          class="relative flex items-center rounded-lg border border-white/10 bg-white/5 p-1"
        >
          <!-- Sliding indicator -->
          <div
            class="absolute top-1 bottom-1 rounded-md bg-white/10 transition-all duration-300 ease-out pointer-events-none"
            :style="indicatorStyle"
            aria-hidden="true"
          ></div>

          <a
            v-for="(link, i) in navLinks"
            :key="link.href"
            :ref="
              (el) => {
                if (el) navRefs[i] = el as HTMLElement;
              }
            "
            :href="link.href"
            class="relative z-10 px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200"
            :class="
              activeSection === link.section
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            "
            @click="setActive(link.section)"
            >{{ link.label }}</a
          >

          <!-- Lang switcher -->
          <div
            class="ml-2 flex items-center rounded-md border border-white/10 bg-white/5 overflow-hidden"
          >
            <NuxtLink
              :to="switchLocalePath('fr')"
              class="px-2.5 py-1.5 text-xs font-bold transition"
              :class="
                isFR
                  ? 'bg-[#00ff88] text-black'
                  : 'text-white/40 hover:text-white/70'
              "
              >FR</NuxtLink
            >
            <NuxtLink
              :to="switchLocalePath('en')"
              class="px-2.5 py-1.5 text-xs font-bold transition"
              :class="
                !isFR
                  ? 'bg-[#00ff88] text-black'
                  : 'text-white/40 hover:text-white/70'
              "
              >EN</NuxtLink
            >
          </div>
        </div>
      </nav>

      <!-- Mobile burger -->
      <button
        type="button"
        class="flex md:hidden h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white transition"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">{{t("const.menu")}}</span>
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
        class="border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-md md:hidden"
      >
        <div class="flex flex-col px-8 py-4 gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition font-mono"
            @click="isOpen = false"
          >
            <span class="text-[#00ff88] text-xs">=></span>
            {{ link.label }}
          </a>
          <div class="mt-3 flex gap-2 px-3">
            <NuxtLink
              :to="switchLocalePath('fr')"
              class="px-3 py-1.5 rounded text-xs font-bold transition"
              :class="
                isFR
                  ? 'bg-[#00ff88] text-black'
                  : 'text-white/40 border border-white/10'
              "
              >FR</NuxtLink
            >
            <NuxtLink
              :to="switchLocalePath('en')"
              class="px-3 py-1.5 rounded text-xs font-bold transition"
              :class="
                !isFR
                  ? 'bg-[#00ff88] text-black'
                  : 'text-white/40 border border-white/10'
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const { locale, t } = useI18n();
const isFR = computed(() => locale.value === "fr");
const switchLocalePath = useSwitchLocalePath();

const isOpen = ref(false);
const scrolled = ref(false);
const activeSection = ref("top");
const navRefs = ref<HTMLElement[]>([]);

const navLinks = computed(() => [
  { href: "#top", label: t("const.home"), section: "top" },
  { href: "#about", label: t("const.about"), section: "about" },
  { href: "#offers", label: t("const.offers"), section: "offers" },
  {
    href: "#testimonies",
    label: t("const.testimonies"),
    section: "testimonies",
  },
  { href: "#contact", label: t("const.contact"), section: "contact" },
]);

const indicatorStyle = computed(() => {
  const idx = navLinks.value.findIndex(
    (l) => l.section === activeSection.value,
  );
  const el = navRefs.value[idx];
  if (!el) return { width: "0px", left: "0px" };
  return { width: `${el.offsetWidth}px`, left: `${el.offsetLeft}px` };
});

function setActive(section: string) {
  activeSection.value = section;
  isOpen.value = false;
}

function onScroll() {
  scrolled.value = window.scrollY > 20;
  const sections = ["contact", "testimonies", "offers", "about", "top"];
  for (const id of sections) {
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
});
</script>
