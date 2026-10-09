<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-100 bg-ink/70 flex items-center justify-center p-4 sm:p-10"
      @click.self="open = false"
    >
      <div
        class="w-full max-w-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
      >
        <LazyTerminal @close="open = false" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { useTerminalOpen } from "~/composables/useSiteConfig";

const open = useTerminalOpen();

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return (
    !!el &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable)
  );
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) {
    open.value = false;
    return;
  }
  // `~` opens the terminal (ignored while typing in a field)
  if ((e.key === "~" || e.key === "é" || e.key === "2") && !open.value && !isTyping(e.target)) {
    e.preventDefault();
    open.value = true;
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
