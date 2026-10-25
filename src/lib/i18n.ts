/**
 * Bilingual route registry for Synapse (Phase 1).
 * Defines routes with verified 1-to-1 translations between English and Hindi.
 */

export interface BilingualRoutePair {
  en: string;
  hi: string;
}

export const BILINGUAL_ROUTES: readonly BilingualRoutePair[] = [
  { en: '/', hi: '/hi' },
  { en: '/programmes', hi: '/hi/programmes' },
  { en: '/enquire', hi: '/hi/enquire' },
] as const;

/**
 * Returns the matching bilingual route pair if one exists for the given pathname.
 */
export function getBilingualRoutePair(
  pathname: string
): BilingualRoutePair | undefined {
  const clean = pathname.replace(/\/$/, '') || '/';
  return BILINGUAL_ROUTES.find(
    (pair) => pair.en === clean || pair.hi === clean
  );
}
