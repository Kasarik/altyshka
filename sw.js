const CACHE_NAME = 'altushka-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Кэшируем файлы при установке
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Отдаём файлы из кэша (если нет сети)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});