<template>
  <section class="bg-[#1C1917]">
    <div
      v-reveal
      class="mx-auto max-w-6xl px-8 sm:px-16 py-16 sm:py-24 grid gap-12 lg:grid-cols-2"
    >
      <div class="flex flex-col gap-6">
        <div
          class="text-xs font-semibold uppercase tracking-widest text-[#E8A87C]"
        >
          {{ $t("const.contact") }}
        </div>
        <h2
          class="font-display font-normal text-[#FAF8F5]"
          style="font-size: clamp(2.1rem, 4vw, 2.9rem)"
        >
          {{ $t("contact.formTitle") }}
        </h2>
        <p class="text-lg leading-relaxed text-[#C7C2B8] max-w-md">
          {{ $t("contact.subtitle") }}
        </p>

        <pre
          class="bg-[#26211C] border border-[#38302A] rounded-[10px] p-5.5 font-mono text-xs leading-loose text-[#C7C2B8] whitespace-pre-wrap"
          >{{ template }}</pre
        >

        <button
          type="button"
          class="self-start rounded-full border border-[#4A403A] text-[#FAF8F5] px-6 py-3 text-sm transition hover:border-[#E8A87C]"
          @click="copyTemplate"
        >
          {{ copied ? "✓ " + $t("contact.copied") : $t("contact.copyMe") }}
        </button>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="openMail">
        <input
          v-model="form.name"
          type="text"
          :placeholder="$t('contact.fields.name')"
          class="bg-[#26211C] border border-[#38302A] rounded-lg px-4.5 py-4 text-[#FAF8F5] outline-none focus:border-[#E8A87C] transition"
          id="name"
          name="name"
        />
        <input
          v-model="form.mail"
          type="email"
          :placeholder="$t('contact.fields.mail')"
          class="bg-[#26211C] border border-[#38302A] rounded-lg px-4.5 py-4 text-[#FAF8F5] outline-none focus:border-[#E8A87C] transition"
          id="mail"
          name="mail"
        />
        <input
          v-model="form.company"
          type="text"
          :placeholder="$t('contact.fields.company')"
          class="bg-[#26211C] border border-[#38302A] rounded-lg px-4.5 py-4 text-[#FAF8F5] outline-none focus:border-[#E8A87C] transition"
          id="company"
          name="company"
        />
        <textarea
          v-model="form.message"
          rows="6"
          :placeholder="$t('contact.fields.message')"
          class="bg-[#26211C] border border-[#38302A] rounded-lg px-4.5 py-4 text-[#FAF8F5] outline-none focus:border-[#E8A87C] transition resize-y"
          id="message"
          name="message"
        />
        <button
          type="submit"
          class="rounded-full bg-[#A8442A] text-[#FAF8F5] px-8 py-4.5 font-semibold transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(168,68,42,0.4)]"
        >
          {{ $t("contact.fields.cta") }} ->
        </button>
        <p class="text-xs text-[#78716C]">
          {{ $t("contact.mailHint") }}
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const { t } = useI18n();

const template = computed(() => String(t("mail.body")));

// TODO: remplacer par la vraie adresse avant mise en ligne
const EMAIL = "contact@florentinbouchendhomme.dev";

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
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    // clipboard unavailable, silently ignore
  }
}

function openMail() {
  const subject = `${t("mail.subject")}${
    form.company ? " - " + form.company : form.name ? " - " + form.name : ""
  }`;
  const body = `${form.message || template.value}\n\n${form.name}${
    form.company ? " / " + form.company : ""
  }`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
</script>
