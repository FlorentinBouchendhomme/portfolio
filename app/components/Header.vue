<template>
  <header
    class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur"
  >
    <div
      class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
    >
      <!-- Brand -->
      <NuxtLink
        to="/#top"
        class="group inline-flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-slate-50"
        aria-label="Go to top"
      >
        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
        <span class="text-sm font-semibold tracking-tight text-slate-900">
          Florentin Bouchendhomme
        </span>
        <span class="hidden text-sm text-slate-500 sm:inline">
          / {{ $t("const.job") }}
        </span>
      </NuxtLink>

      <!-- Language -->
      <div
        class="ml-2 flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1"
      >
        <NuxtLink
          :to="switchLocalePath('fr')"
          class="rounded-md px-2 py-1 text-xs font-semibold transition"
          :class="
            isFR
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 hover:bg-slate-50'
          "
        >
          FR
        </NuxtLink>
        <NuxtLink
          :to="switchLocalePath('en')"
          class="rounded-md px-2 py-1 text-xs font-semibold transition"
          :class="
            !isFR
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 hover:bg-slate-50'
          "
        >
          EN
        </NuxtLink>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 sm:flex" aria-label="Primary">
        <a
          href="#offers"
          class="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          {{ $t("const.offers") }}
        </a>
        <a
          href="#testimonies"
          class="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          {{ $t("const.testimonies") }}
        </a>
        <a
          href="#contact"
          class="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          {{ $t("const.contact") }}
        </a>

        <div class="mx-2 h-6 w-px bg-slate-200"></div>

        <a
          href="#contact"
          class="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {{ $t("const.cta") }}
        </a>
      </nav>

      <!-- Mobile button -->
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:hidden"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">Open menu</span>
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="isOpen"
      id="mobile-menu"
      class="border-t border-slate-200 bg-white sm:hidden"
    >
      <div class="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div class="flex flex-col gap-1">
          <a
            href="#offers"
            class="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            @click="close()"
          >
            {{ $t("const.offers") }}
          </a>
          <a
            href="#testimonies"
            class="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            @click="close()"
          >
            {{ $t("const.testimonies") }}
          </a>
          <a
            href="#contact"
            class="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            @click="close()"
          >
            {{ $t("const.contact") }}
          </a>

          <div class="pt-2">
            <a
              href="#contact"
              class="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              @click="close()"
            >
              {{ $t("const.cta") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

const isOpen = ref(false);
const { locale } = useI18n();
const isFR = computed(() => locale.value === "fr");
const switchLocalePath = useSwitchLocalePath();

function close() {
  isOpen.value = false;
}

// Close mobile menu on Esc
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>