export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null;

  function getObserver() {
    if (!observer && typeof window !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
      );
    }
    return observer;
  }

  nuxtApp.vueApp.directive("reveal", {
    // Ensures the initial (hidden) state is present in the SSR markup,
    // avoiding a flash of revealed content before hydration.
    getSSRProps() {
      return { class: "reveal-init" };
    },
    mounted(el: HTMLElement) {
      el.classList.add("reveal-init");
      getObserver()?.observe(el);
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el);
    },
  });
});
