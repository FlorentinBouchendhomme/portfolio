export const SITE_EMAIL = "contact@florentinbouchendhomme.dev";
export const SITE_PHONE = "+33 6 00 00 00 00";
export const SITE_LINKEDIN = "https://www.linkedin.com/";

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
