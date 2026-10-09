<template>
  <div class="min-h-dvh flex flex-col bg-paper text-ink">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <TerminalEasterEgg />
  </div>
</template>
