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
            <div class="flex gap-2">
              <a
                :href="`mailto:${email}?subject=${encodeURIComponent(
                  $t('mail.subject')
                )}&body=${encodeURIComponent($t('mail.body'))}`"
                class="inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <img
                  src="~/assets/icones/mail.svg"
                  alt=""
                  class="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
              <a
                :href="`tel:`"
                {phoneNumber}
                class="inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <img
                  src="~/assets/icones/phone.svg"
                  alt=""
                  class="h-4 w-4"
                  aria-hidden="true"
                />
              </a>

              <a
                :href="linkedinUrl"
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <img
                  src="~/assets/icones/linkedin.svg"
                  alt=""
                  class="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </div>

            <p class="text-xs text-slate-500">
              © {{ year }} Florentin Bouchendhomme. {{ $t("footer.rights") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();

const email = "test@test.fr";
const linkedinUrl = "https://www.linkedin.com/profile";
</script>
