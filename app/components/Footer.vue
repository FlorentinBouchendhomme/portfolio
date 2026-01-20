<template>
  <footer class="border-t border-slate-200 bg-white">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div
        class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"
      >
        <!-- Left (name, job, availability) -->
        <div>
          <div class="inline-flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
            <p class="text-sm font-semibold text-slate-900">
              Florentin Bouchendhomme
            </p>
          </div>
          <p class="mt-2 max-w-md text-sm text-slate-600">
            {{ $t("const.job") }}. {{ $t("const.jobDescription") }}
          </p>

          <p class="mt-4 text-sm text-slate-600">
            <span class="font-medium text-slate-800">{{
              $t("footer.availability")
            }}</span>
          </p>
        </div>

        <!-- Right (nav + cta) -->
        <div class="flex flex-col gap-3 sm:items-end">
          <!-- Nav -->
          <div class="flex flex-wrap gap-2">
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
          </div>

          <!-- CTA -->
          <div class="flex flex-col gap-2 sm:items-end">
            <a
              :href="`mailto:${email}?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(body)}`"
              class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {{ $t("footer.email") }}
              <span class="text-emerald-300">-></span>
            </a>

            <a
              :href="linkedinUrl"
              target="_blank"
              rel="noreferrer"
              class="text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900 hover:decoration-slate-500"
            >
              LinkedIn
            </a>

            <p class="text-xs text-slate-500">
              © {{ year }} Florentin Bouchendhomme. {{ $t("footer.rights") }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom note -->
      <div
        class="mt-8 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3"
      >
        <p class="text-sm text-emerald-900">
          Quick start:
          <span class="font-medium">Tell me your stack (if you have one)</span>,
          your priority (bugs/perf/features/from scratch), and whether you
          prefer a <span class="font-medium">10h/20h retainer</span> or a
          <span class="font-medium">1-2 week sprint</span>. I'll reply within
          24h.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();

const email = "test@test.fr";
const linkedinUrl = "https://www.linkedin.com/profile";

const subject = "Project inquiry - Retainer or sprint";
const body =
  "Hi Florentin,%0D%0A%0D%0AWe are looking for help with:%0D%0A- Context:%0D%0A- Stack:%0D%0A- Priority (bugs/perf/features/from scratch):%0D%0A- Estimated volume (10h/20h or sprint):%0D%0A%0D%0ARegards,%0D%0A";
</script>
