<template>
  <section class="bg-white" aria-labelledby="proof-title">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
      <div class="max-w-2xl">
        <h2
          id="proof-title"
          class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          {{ $t("proof.title") }}
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {{ $t("proof.subtitle") }}
        </p>
      </div>

      <div
        class="mt-10 grid gap-6 md:grid-cols-3"
        role="list"
        aria-label="Proof items"
      >
        <article
          v-for="(item, i) in proofItems"
          :key="i"
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          role="listitem"
          :aria-labelledby="`proof-item-title-${i}`"
        >
          <div class="flex items-start justify-between gap-3">
            <h3
              :id="`proof-item-title-${i}`"
              class="text-base font-semibold text-slate-900"
            >
              {{ item.title }}
            </h3>

            <span
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800"
              aria-hidden="true"
            >
              <img
                src="~/assets/icones/badge.svg"
                alt=""
                class="h-4 w-4"
                aria-hidden="true"
              />
            </span>
          </div>

          <dl class="mt-4 space-y-3 text-sm">
            <div>
              <dt
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {{ $t("proof.labels.context") }}
              </dt>
              <dd class="mt-1 text-slate-700">
                {{ item.context }}
              </dd>
            </div>

            <div>
              <dt
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {{ $t("proof.labels.problem") }}
              </dt>
              <dd class="mt-1 text-slate-700">
                {{ item.problem }}
              </dd>
            </div>

            <div>
              <dt
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {{ $t("proof.labels.actions") }}
              </dt>
              <dd class="mt-1 text-slate-700">
                {{ item.actions }}
              </dd>
            </div>

            <div>
              <dt
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {{ $t("proof.labels.result") }}
              </dt>
              <dd class="mt-1 text-slate-700">
                {{ item.result }}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

type ProofItemRaw = {
  title: any;
  context: any;
  problem: any;
  actions: any;
  result: any;
};

type ProofItem = {
  title: string;
  context: string;
  problem: string;
  actions: string;
  result: string;
};

const { tm } = useI18n();
const { toText } = useI18nText();

const proofItems = computed<ProofItem[]>(() => {
  const raw = (tm("proof.items") as ProofItemRaw[]) ?? [];
  return raw.map((it) => ({
    title: toText(it.title),
    context: toText(it.context),
    problem: toText(it.problem),
    actions: toText(it.actions),
    result: toText(it.result),
  }));
});
</script>
