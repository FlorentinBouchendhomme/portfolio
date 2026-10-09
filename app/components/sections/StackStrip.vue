<template>
  <div class="wrap">
    <ul
      class="scroll-x flex border-y-2 border-ink font-mono text-sm"
      aria-label="Stack"
    >
      <li
        v-for="(tag, i) in stackTags"
        :key="tag"
        class="flex-1 shrink-0 whitespace-nowrap px-5 py-4 text-center"
        :class="{ 'border-l border-ink/20': i > 0 }"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const stackTags = [
  "Symfony",
  "Nuxt / Next",
  "Vue / React",
  "TypeScript",
  "Python",
  "PostgreSQL / MySQL",
  "Docker",
  "CI/CD",
];
</script>
