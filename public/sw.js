// AlinLabs Production Service Worker — Multi-layer Caching & Offline Resilience
const CACHE_VERSION = 'v3';
const SHELL_CACHE = `alinlabs-shell-${CACHE_VERSION}`;
const STATIC_CACHE = `alinlabs-static-${CACHE_VERSION}`;
const MEDIA_CACHE = `alinlabs-media-${CACHE_VERSION}`;
const RUNTIME_CACHE = `alinlabs-runtime-${CACHE_VERSION}`;

const ACTIVE_CACHES = [SHELL_CACHE, STATIC_CACHE, MEDIA_CACHE, RUNTIME_CACHE];
const MAX_MEDIA_ENTRIES = 120;
const MAX_RUNTIME_ENTRIES = 60;

const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/gambar/logo-icon-color.png',
  '/gambar/logo-icon-white.png',
  '/gambar/logo-favicon.ico',
  '/gambar/noise.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_URLS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => undefined)
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('alinlabs-') && !ACTIVE_CACHES.includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

async function trimCache(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxEntries) {
      const excess = keys.length - maxEntries;
      await Promise.all(keys.slice(0, excess).map((req) => cache.delete(req)));
    }
  } catch {
    // Ignore storage quota / cleanup errors
  }
}

function isDevAsset(url) {
  return (
    url.pathname.startsWith('/@vite') ||
    url.pathname.startsWith('/@react-refresh') ||
    url.pathname.startsWith('/@fs/') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/node_modules/') ||
    url.searchParams.has('t') ||
    url.searchParams.has('v')
  );
}

function isImmutableStaticAsset(url) {
  return (
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/assets/') ||
      url.pathname.startsWith('/gambar/') ||
      url.pathname.startsWith('/icon/') ||
      url.pathname.startsWith('/lottie/'))
  );
}

function isExternalCacheableMedia(url) {
  const host = url.hostname;
  return (
    host === 'fonts.googleapis.com' ||
    host === 'fonts.gstatic.com' ||
    host === 'cdn.jsdelivr.net' ||
    host === 'raw.githubusercontent.com' ||
    host === 'i.ytimg.com' ||
    host === 's0.wp.com'
  );
}

async function cacheFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && (response.status === 200 || response.type === 'opaque')) {
      cache.put(request, response.clone()).then(() => {
        if (maxEntries) trimCache(cacheName, maxEntries);
      });
    }
    return response;
  } catch (err) {
    if (cached) return cached;
    throw err;
  }
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone()).then(() => {
          if (maxEntries) trimCache(cacheName, maxEntries);
        });
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    return cached;
  }

  const networkResponse = await networkPromise;
  if (networkResponse) return networkResponse;

  throw new Error('Network unavailable and no cached response');
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put('/', response.clone()).catch(() => undefined);
    }
    return response;
  } catch {
    const cachedPage = (await cache.match(request)) || (await cache.match('/'));
    if (cachedPage) return cachedPage;
    return new Response(
      '<!doctype html><html lang="id"><body style="font-family:sans-serif;padding:2rem;text-align:center;"><h2>Koneksi Terputus</h2><p>Periksa jaringan internet Anda lalu muat ulang halaman.</p></body></html>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Never intercept Vite dev module requests or HMR endpoints
  if (url.origin === self.location.origin && isDevAsset(url)) {
    return;
  }

  // Skip third-party API / analytics endpoints
  if (
    url.hostname.includes('emailjs.com') ||
    url.hostname.includes('generativelanguage.googleapis.com')
  ) {
    return;
  }

  // Navigation requests (SPA HTML shell)
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  // Local hashed bundles, images, icons, lottie
  if (isImmutableStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE, MAX_MEDIA_ENTRIES));
    return;
  }

  // External fonts, CDN icons, thumbnails
  if (isExternalCacheableMedia(url)) {
    event.respondWith(staleWhileRevalidate(request, MEDIA_CACHE, MAX_MEDIA_ENTRIES));
    return;
  }

  // Same-origin JSON / runtime GET requests
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE, MAX_RUNTIME_ENTRIES));
  }
});
