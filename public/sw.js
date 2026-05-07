// Basic Service Worker for PWA installation requirements
const CACHE_NAME = 'alinlabs-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method !== 'GET') return;
  
  // Basic fallback caching
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
