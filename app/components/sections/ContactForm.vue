<template>
  <section class="bg-slate-50">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <h2
            class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            {{ $t("contact.title") }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {{ $t("contact.subtitle") }}
          </p>

          <div
            class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p class="text-sm font-semibold text-slate-900">{{ $t('contact.template') }}</p>
            <p class="mt-2 text-sm text-slate-600">
              {{ $t("contact.fields.message") }} ({{ $t('contact.copy') }})
            </p>

            <pre
              class="mt-3 whitespace-pre-wrap rounded-xl bg-slate-900 p-4 text-xs text-slate-100"
              >{{ template }}</pre
            >

            <div class="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                @click="copyTemplate"
              >
                {{ $t("contact.copyMe") }}
              </button>

              <a
                :href="`mailto:${email}?subject=${encodeURIComponent(
                  $t('mail.subject')
                )}&body=${encodeURIComponent($t('mail.body'))}`"
                class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                {{ $t("contact.mail") }}
                <span class="ml-2 text-emerald-600">&gt;</span>
              </a>
            </div>

            <p v-if="copied" class="mt-3 text-sm font-medium text-emerald-700">
              {{ $t("contact.copied") }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-6">
          <div
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p class="text-sm font-semibold text-slate-900">
              {{ $t("contact.formTitle") }}
            </p>
            <form class="mt-6 grid gap-4" @submit.prevent="openMail">
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="grid gap-1">
                  <span class="text-sm font-medium text-slate-700">{{
                    $t("contact.fields.name")
                  }}</span>
                  <input
                    v-model="form.name"
                    type="text"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
                    autocomplete="name"
                    :placeholder="$t('contact.fields.namePlaceholder')"
                  />
                </label>

                <label class="grid gap-1">
                  <span class="text-sm font-medium text-slate-700">{{
                    $t("contact.fields.mail")
                  }}</span>
                  <input
                    v-model="form.mail"
                    type="email"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
                    autocomplete="email"
                    :placeholder="$t('contact.fields.mailPlaceholder')"
                  />
                </label>
              </div>

              <label class="grid gap-1">
                <span class="text-sm font-medium text-slate-700">{{
                  $t("contact.fields.company")
                }}</span>
                <input
                  v-model="form.company"
                  type="text"
                  class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
                  :placeholder="$t('contact.fields.companyPlaceholder')"
                />
              </label>

              <label class="grid gap-1">
                <span class="text-sm font-medium text-slate-700">{{
                  $t("contact.fields.message")
                }}</span>
                <textarea
                  v-model="form.message"
                  rows="6"
                  class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
                  :placeholder="$t('contact.fields.messagePlaceholder')"
                />
              </label>

              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {{ $t("contact.fields.cta") }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const template = computed(() => String($t("mail.body")));
const email = "your@email.com"; // TODO: replace
const copied = ref(false);

const form = reactive({
  name: "",
  mail: "",
  company: "",
  message: "",
});

async function copyTemplate() {
  try {
    await navigator.clipboard.writeText(template.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    // fallback: do nothing
  }
}

function openMail() {
  const lines: string[] = [];
  if (form.name) lines.push(`Name: ${form.name}`);
  if (form.mail) lines.push(`Email: ${form.mail}`);
  if (form.company) lines.push(`Company: ${form.company}`);
  lines.push("");
  lines.push(form.message || template.value);
}
</script>
