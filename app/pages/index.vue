<template>
  <div>
    <div id="top" class="scroll-mt-16">
      <SectionsHero />
    </div>

    <SectionsStackStrip />

    <div id="offers" class="scroll-mt-16">
      <SectionsOffers />
    </div>

    <div id="realisations" class="scroll-mt-16">
      <SectionsRealisations />
    </div>

    <div id="process" class="scroll-mt-16">
      <SectionsProcessCards />
    </div>

    <div id="about" class="scroll-mt-16">
      <SectionsAbout />
    </div>

    <div id="testimonials" class="scroll-mt-16">
      <SectionsTestimonials />
    </div>

    <div id="faq" class="scroll-mt-16">
      <SectionsFaq />
    </div>

    <div v-if="SHOW_ARTICLES" id="articles" class="scroll-mt-16">
      <SectionsArticles />
    </div>

    <div id="contact" class="scroll-mt-16">
      <SectionsContactForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SHOW_ARTICLES } from "~/composables/useSiteConfig";

useSeoMeta({
  title:
    "Florentin Bouchend'homme - Développeur fullstack freelance (Symfony / Nuxt)",
  description:
    "Développeur fullstack freelance - Symfony, Nuxt / Vue. Renfort d'équipe, stabilisation, MVP. Remote, soir & week-end. Réponse sous 24h.",
});
</script>
