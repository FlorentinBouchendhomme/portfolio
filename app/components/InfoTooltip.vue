<template>
  <span class="relative inline-flex items-center">
    <!-- Info button that triggers tooltip on hover/focus -->
    <button
      ref="btn"
      type="button"
      class="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      :aria-label="ariaLabel"
      :aria-describedby="open ? tooltipId : undefined"
      :aria-expanded="open ? 'true' : 'false'"
      @mouseenter="open = true"
      @mouseleave="open = false"
      @focus="open = true"
      @blur="open = false"
      @keydown.escape.prevent="open = false"
    >
      <img
        src="~/assets/icones/marker.svg"
        alt=""
        class="h-4 w-4"
        aria-hidden="true"
      />
    </button>

    <!-- Tooltip content displayed above the button -->
    <div
      v-show="open"
      :id="tooltipId"
      role="tooltip"
      class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-65 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs whitespace-pre-line text-slate-700 shadow-lg"
    >
      <span class="font-semibold text-slate-900">{{ title }}</span>
      <span v-if="text" class="block mt-1 text-slate-600 whitespace-pre-line">{{
        text
      }}</span>

      <!-- Triangle arrow pointing down to button -->
      <span
        class="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-slate-200 bg-white"
        aria-hidden="true"
      ></span>
    </div>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  text?: string;
  ariaLabel?: string;
}>();

const open = ref(false);
const tooltipId = useId();

// Generate accessible label with fallback to title
const ariaLabel = computed(
  () => props.ariaLabel ?? `More info: ${props.title}`
);
</script>
