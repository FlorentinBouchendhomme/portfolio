export const SITE_EMAIL = "contact@florentinbouchendhomme.dev";
export const SITE_PHONE = "+33 7 82 67 69 62";
export const SITE_LINKEDIN = "https://www.linkedin.com/in/florentinb";

// Articles section (and its nav link) stays hidden while articles are "coming soon".
export const SHOW_ARTICLES = false;

export const OFFER_KEYS = [
  "retainer10",
  "retainer20",
  "sprint",
  "fromScratch",
] as const;
export type OfferKey = (typeof OFFER_KEYS)[number];

/** Format pre-selected in the contact form (set from the offer cards). */
export function useContactFormat() {
  return useState<OfferKey | null>("contact-format", () => null);
}

/** Open state of the easter-egg terminal (keyboard `~` or footer link). */
export function useTerminalOpen() {
  return useState<boolean>("terminal-open", () => false);
}
