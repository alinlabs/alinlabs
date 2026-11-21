import { ViewState } from '../types';
import { resolveServiceRoute } from './network-cache';

const loadBeranda = () =>
  import('../pages/beranda/beranda-page').then((module) => ({ default: module.Main }));
const loadLayanan = () =>
  import('../pages/layanan/main/layanan-page').then((module) => ({ default: module.Main }));
const loadPortofolio = () =>
  import('../pages/portofolio/portofolio-page').then((module) => ({ default: module.Main }));
const loadTentang = () =>
  import('../pages/single-page/tentang').then((module) => ({ default: module.Tentang }));
const loadKontak = () =>
  import('../pages/single-page/kontak').then((module) => ({ default: module.Kontak }));
const loadLegalPage = () =>
  import('../pages/legal/legal-page').then((module) => ({ default: module.LegalPage }));
const loadCheckout = () =>
  import('../pages/checkout/checkout-page').then((module) => ({ default: module.Checkout }));

export const routeLoaders = {
  [ViewState.HOME]: loadBeranda,
  [ViewState.PRODUCTS]: loadLayanan,
  [ViewState.PORTFOLIO]: loadPortofolio,
  [ViewState.ABOUT]: loadTentang,
  [ViewState.CONTACT]: loadKontak,
  [ViewState.PRIVACY_POLICY]: loadLegalPage,
  [ViewState.TERMS_OF_SERVICE]: loadLegalPage,
  [ViewState.LICENSE]: loadLegalPage,
  [ViewState.PARTNERSHIP_CORPORATE]: loadLegalPage,
  [ViewState.PARTNERSHIP_COMMUNITY]: loadLegalPage,
  [ViewState.PARTNERSHIP_INDIVIDUAL]: loadLegalPage,
  [ViewState.PARTNERSHIP_GOVERNMENT]: loadLegalPage,
  [ViewState.CHECKOUT_PAYMENT]: loadCheckout,
} as const;

const prefetchedViews = new Set<ViewState>();

/**
 * Prefetches a lazy route chunk once (on hover, focus, or browser idle)
 * so page navigation feels instant without duplicate network calls.
 */
export function prefetchRoute(view: ViewState): void {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;

  const resolved = resolveServiceRoute(view).view;
  if (prefetchedViews.has(resolved)) return;

  const loader = routeLoaders[resolved as keyof typeof routeLoaders];
  if (!loader) return;

  prefetchedViews.add(resolved);
  loader().catch(() => {
    // Allow retry later if offline/transient network failure occurred
    prefetchedViews.delete(resolved);
  });
}
