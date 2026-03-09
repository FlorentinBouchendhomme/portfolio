<template>
  <div>
    <section id="top" class="scroll-mt-24">
      <SectionsHero />
    </section>

    <section id="about" class="scroll-mt-24">
      <SectionsAbout />
    </section>

    <section id="offers" class="scroll-mt-24">
      <SectionsOffers />
    </section>

    <section id="testimonies" class="scroll-mt-24">
      <SectionsTestimonies />
    </section>

    <section id="contact" class="scroll-mt-24">
      <SectionsContactForm />
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Florentin Bouchendhomme — Fullstack Developer (PHP + Vue)",
  description:
    "Freelance fullstack developer (PHP frameworks + Vue). Retainer (10-20h/month), bugfix & performance sprints, migrations, project from scratch. Remote-friendly.",
});
</script>
