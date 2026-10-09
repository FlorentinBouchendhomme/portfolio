<template>
  <footer class="bg-paper">
    <div
      class="wrap grid-swiss gap-y-4 border-t-2 border-ink py-8 text-sm text-ink/70"
    >
      <div class="sm:col-span-3 lg:col-span-6 self-center">
        © {{ year }} Florentin Bouchend'homme - {{ $t("footer.rights") }}
      </div>
      <div
        class="sm:col-span-3 lg:col-span-6 flex flex-wrap items-center sm:justify-end gap-x-6"
      >
        <a
          :href="SITE_LINKEDIN"
          target="_blank"
          rel="noreferrer"
          class="inline-flex min-h-11 items-center hover:text-ink transition-colors"
          >LinkedIn</a
        >
        <a
          :href="`mailto:${SITE_EMAIL}`"
          class="inline-flex min-h-11 items-center hover:text-ink transition-colors"
          >{{ SITE_EMAIL }}</a
        >
        <button
          type="button"
          class="inline-flex min-h-11 items-center font-mono text-accent hover:text-ink transition-colors"
          aria-haspopup="dialog"
          @click="terminalOpen = true"
        >
          ~ terminal
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  SITE_EMAIL,
  SITE_LINKEDIN,
  useTerminalOpen,
} from "~/composables/useSiteConfig";

const year = new Date().getFullYear();
const terminalOpen = useTerminalOpen();
</script>
