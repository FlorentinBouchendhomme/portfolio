<template>
  <div class="min-h-dvh flex flex-col bg-[#0a0a0f] text-white">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>