<template>
  <footer class="bg-[#1C1917] text-[#78716C] border-t border-[#2E2822]">
    <div
      class="mx-auto max-w-6xl px-8 sm:px-16 py-7 flex flex-wrap items-center justify-between gap-4 text-sm"
    >
      <div>
        © {{ year }} Florentin Bouchend'homme - {{ $t("footer.rights") }}
      </div>
      <div class="flex gap-6 flex-wrap">
        <a
          :href="linkedinUrl"
          target="_blank"
          rel="noreferrer"
          class="text-[#A8A29E] hover:text-[#FAF8F5] transition"
          >LinkedIn</a
        >
        <a
          :href="`mailto:${email}`"
          class="text-[#A8A29E] hover:text-[#FAF8F5] transition"
          >{{ email }}</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();

const email = "contact@florentinbouchendhomme.dev";
const linkedinUrl = "https://www.linkedin.com/";
</script>
