/**
 * Service worker de Jazz Fusion Solo Training.
 *
 * Objectiu: que la web funcioni sense cobertura (sala d'assaig, carrer).
 *  - navegació: xarxa primer, i si no n'hi ha, la còpia desada (així les
 *    actualitzacions entren soles quan hi ha internet)
 *  - recursos (bundles amb hash, icones): cau primer, que són immutables
 */
const CACHE = "solo-training-v1";
const CORE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await Promise.allSettled(CORE.map((url) => cache.add(url)));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put("/index.html", response.clone());
          return response;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cached = (await cache.match("/index.html")) || (await cache.match("/"));
          return (
            cached ||
            new Response("Sense connexió i sense còpia desada.", {
              status: 503,
              headers: { "content-type": "text/plain; charset=utf-8" },
            })
          );
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && response.ok && response.type === "basic") {
          cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        return new Response("", { status: 504, statusText: "sense xarxa" });
      }
    })()
  );
});
