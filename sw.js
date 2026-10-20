const CACHE = "kanasta-v1";
const FILES = ["./", "index.html", "pravidla.html", "app.css", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "fonts/figtree-latin-400-normal.woff2", "fonts/figtree-latin-600-normal.woff2", "fonts/figtree-latin-700-normal.woff2", "fonts/figtree-latin-ext-400-normal.woff2", "fonts/figtree-latin-ext-600-normal.woff2", "fonts/figtree-latin-ext-700-normal.woff2", "fonts/fraunces-latin-600-normal.woff2", "fonts/fraunces-latin-800-normal.woff2", "fonts/fraunces-latin-ext-600-normal.woff2", "fonts/fraunces-latin-ext-800-normal.woff2"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match("index.html"))));
});
