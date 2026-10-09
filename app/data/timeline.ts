/**
 * About timeline - one entry per row of `about.timeline` in i18n (same order).
 * `logo`: imported image URL (employer / school).
 *   - string → rendered image
 *   - null   → hatched "logo" placeholder (slot reserved, logo to provide)
 *   - false  → no logo slot for this row
 */
export type TimelineEntry = { logo: string | null | false; logoAlt?: string };

export const TIMELINE: TimelineEntry[] = [
  { logo: false }, // 2013 - first lines of code
  { logo: null }, // master - project management
  { logo: null }, // master - fullstack development
  { logo: null }, // today - fullstack employee + freelance
];
