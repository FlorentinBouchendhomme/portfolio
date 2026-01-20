<template>
  <!-- Hero section with border and white background -->
  <section
    class="border-b border-slate-200 bg-white"
    aria-labelledby="hero-title"
  >
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <!-- Grid layout: 7 cols for content, 5 cols for right card -->
      <div class="grid items-center gap-10 md:grid-cols-12">
        <!-- Left content section -->
        <div class="md:col-span-7">
          <!-- Tech stack badge -->
          <p
            class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900"
            aria-label="Tech stack"
          >
            <span
              class="h-2 w-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            ></span>
            <span>{{ $t("hero.kicker") }}</span>
          </p>

          <!-- Main headline -->
          <h1
            id="hero-title"
            class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            {{ $t("hero.title") }}
          </h1>

          <!-- Subtitle description -->
          <p class="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {{ $t("hero.subtitle") }}
          </p>

          <!-- Key highlights list with checkmarks -->
          <ul class="mt-6 space-y-3" aria-label="Key highlights">
            <li
              v-for="(item, i) in bullets"
              :key="i"
              class="flex items-start gap-3 text-sm text-slate-700 sm:text-base"
            >
              <!-- Check icon -->
              <span
                class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full"
                aria-hidden="true"
              >
                <img
                  src="~/assets/icones/check.svg"
                  alt=""
                  class="h-4 w-4"
                  aria-hidden="true"
                />
              </span>

              <!-- Bullet text with optional tooltip -->
              <div class="flex items-start">
                <span>{{ item.label }}</span>

                <InfoTooltip
                  v-if="item.explanation"
                  :title="item.label"
                  :text="item.explanation"
                  :aria-label="`More info about: ${item.label}`"
                />
              </div>
            </li>
          </ul>

          <!-- Call-to-action buttons -->
          <div
            class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            aria-label="Primary actions"
          >
            <!-- Primary button: Contact -->
            <a
              href="#contact"
              class="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {{ $t("hero.primaryCta") }}
            </a>

            <!-- Secondary button: View offers -->
            <a
              href="#offers"
              class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {{ $t("hero.secondaryCta") }}
            </a>
          </div>

          <!-- Availability status -->
          <p class="mt-4 text-xs text-slate-500">
            {{ $t("footer.availability") }}
          </p>
        </div>

        <!-- Right card: Offers summary -->
        <div class="md:col-span-5" aria-label="Offer summary">
          <div
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <!-- Card header -->
            <p class="text-sm font-semibold text-slate-900">
              {{ $t("offers.title") }}
            </p>
            <p class="mt-2 text-sm text-slate-600">
              {{ $t("offers.subtitle") }}
            </p>

            <!-- Top options grid -->
            <div class="mt-5 grid gap-3" aria-label="Top options">
              <div
                v-for="(it, i) in rightItems"
                :key="i"
                class="rounded-xl border border-slate-200 p-4"
              >
                <div class="flex items-start justify-between gap-3">
                  <!-- Item title and value -->
                  <div>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ it.title }}
                    </p>
                    <p class="mt-1 text-sm text-slate-600">
                      {{ it.value }}
                    </p>
                  </div>

                  <!-- Optional info tooltip -->
                  <InfoTooltip
                    v-if="it.explanation"
                    :title="it.title"
                    :text="it.explanation"
                    :aria-label="`More info about: ${it.title}`"
                  />
                </div>
              </div>
            </div>

            <!-- Card CTA button -->
            <a
              href="#contact"
              class="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {{ $t("const.cta") }}
              <span class="ml-2 text-emerald-300" aria-hidden="true">&gt;</span>
            </a>

            <!-- Disclaimer footer -->
            <p class="mt-3 flex gap-2 text-xs leading-relaxed text-slate-500">
              <img
                src="~/assets/icones/info.svg"
                alt=""
                class="h-4 w-4"
                aria-hidden="true"
              />
              <span>{{ $t("offers.disclaimer") }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Type definitions for bullets and right card items
type Bullet = { label: any; explanation?: any };
type RightItem = { title: any; value: any; explanation?: any };

// i18n utility functions
const { tm, rt } = useI18n();

/**
 * Converts message nodes to readable strings
 * Falls back to various node properties if primary method fails
 */
function toText(v: any): string {
  // rt() converts message nodes to string
  try {
    return typeof v === "string" ? v : rt(v);
  } catch {
    // fallback if rt isn't available for some reason
    return v?.body?.static ?? v?.loc?.source ?? String(v ?? "");
  }
}

/**
 * Computed property: transforms raw bullet data
 * Converts all message nodes to strings
 */
const bullets = computed(() => {
  const raw = tm("hero.bullets") as Bullet[];
  return raw.map((b) => ({
    label: toText(b.label),
    explanation: b.explanation ? toText(b.explanation) : undefined,
  }));
});

/**
 * Computed property: transforms raw right card item data
 * Converts all message nodes to strings
 */
const rightItems = computed(() => {
  const raw = tm("hero.rightCard.items") as RightItem[];
  return raw.map((it) => ({
    title: toText(it.title),
    value: toText(it.value),
    explanation: it.explanation ? toText(it.explanation) : undefined,
  }));
});
</script>
