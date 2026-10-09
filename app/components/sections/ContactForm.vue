<template>
  <section class="bg-ink text-paper" aria-labelledby="contact-title">
    <div v-reveal class="wrap grid-swiss gap-y-10 py-20 lg:py-28">
      <!-- Title + text (5 col) -->
      <div class="sm:col-span-6 lg:col-span-5 flex flex-col gap-6">
        <div class="eyebrow text-paper/55">06 / {{ $t("const.contact") }}</div>
        <h2 id="contact-title" class="display-2">
          {{ $t("contact.formTitle") }}
        </h2>
        <p class="text-lg leading-relaxed text-paper/70">
          {{ $t("contact.subtitle") }}
        </p>
      </div>

      <!-- Form (col 7-12) -->
      <form
        class="sm:col-span-6 lg:col-start-7 lg:col-span-6 flex flex-col gap-5"
        @submit.prevent="openMail"
      >
        <fieldset>
          <legend class="eyebrow text-paper/55 mb-3">
            {{ $t("contact.formatLabel") }}
          </legend>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              v-for="key in OFFER_KEYS"
              :key="key"
              type="button"
              class="min-h-14 border-2 px-4 py-3 text-left font-bold transition-colors"
              :class="
                format === key
                  ? 'bg-accent border-accent text-white'
                  : 'border-paper/25 hover:border-paper'
              "
              :aria-pressed="format === key"
              @click="format = format === key ? null : key"
            >
              {{ $t(`offers.${key}.name`) }}
            </button>
          </div>
        </fieldset>

        <label for="message" class="sr-only">{{
          $t("contact.fields.message")
        }}</label>
        <textarea
          id="message"
          v-model="message"
          name="message"
          rows="7"
          :placeholder="$t('contact.fields.message')"
          class="bg-transparent border-2 border-paper/25 px-4 py-4 text-paper placeholder:text-paper/55 outline-none focus:border-paper transition-colors resize-y"
        />

        <button
          type="submit"
          class="btn btn-primary w-full sm:w-auto sm:self-start hover:bg-paper hover:text-ink"
        >
          {{
            formatName
              ? $t("contact.sendWithFormat", { format: formatName })
              : `${$t("contact.fields.cta")} →`
          }}
        </button>
        <p class="text-xs text-paper/55">
          {{ $t("contact.mailHint") }}
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  OFFER_KEYS,
  SITE_EMAIL,
  useContactFormat,
} from "~/composables/useSiteConfig";

const { t } = useI18n();

const format = useContactFormat();
const message = ref("");

const formatName = computed(() =>
  format.value ? t(`offers.${format.value}.name`) : "",
);

function openMail() {
  const subject = `${t("mail.subject")}${formatName.value ? " - " + formatName.value : ""}`;
  // Empty message → the existing template, with the selected format injected.
  const body = message.value.trim()
    ? `${message.value}${
        formatName.value
          ? "\n\n" + t("contact.formatLine", { format: formatName.value })
          : ""
      }`
    : t("mail.body", { format: formatName.value });
  window.location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
</script>
