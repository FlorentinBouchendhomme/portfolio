<template>
  <section class="bg-white">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
      <div class="max-w-2xl">
        <h2
          class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          {{ $t("proof.title") }}
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {{ $t("proof.subtitle") }}
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <div
          v-for="(item, i) in proofItems"
          :key="i"
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-base font-semibold text-slate-900">
              {{ item.title.loc.source }}
            </h3>
            <span
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800"
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
                Context
              </dt>
              <dd class="mt-1 text-slate-700">{{ item.context.loc.source }}</dd>
            </div>
            <div>
              <dt
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Problem
              </dt>
              <dd class="mt-1 text-slate-700">{{ item.problem.loc.source }}</dd>
            </div>
            <div>
              <dt
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Actions
              </dt>
              <dd class="mt-1 text-slate-700">{{ item.actions.loc.source }}</dd>
            </div>
            <div>
              <dt
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Result
              </dt>
              <dd class="mt-1 text-slate-700">{{ item.result.loc.source }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type ProofItem = {
  title: string;
  context: string;
  problem: string;
  actions: string;
  result: string;
};

const proofItems = computed(() => $tm("proof.items") as ProofItem[]);
</script>
