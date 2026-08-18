const CACHE_NAME = "vintage-photo-generator-v5";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./vendor/exifr-7.1.3.lite.umd.js",
  "./fonts/Caveat-400-normal.woff2",
  "./fonts/Caveat-600-normal.woff2",
  "./fonts/CourierPrime-400-normal.woff2",
  "./fonts/CourierPrime-700-normal.woff2",
  "./fonts/DMSerifDisplay-400-normal.woff2",
  "./fonts/DMSerifDisplay-400-italic.woff2",
  "./fonts/SpecialElite-400-normal.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cloned);
          });
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
