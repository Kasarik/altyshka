// Название кэша (версия для обновлений)
const CACHE_NAME = 'altushka-v1';

// Файлы, которые нужно кэшировать
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// 1. Установка Service Worker и кэширование файлов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// 2. Активация (очистка старого кэша)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Удаляем старые версии
          }
        })
      );
    })
  );
});

// 3. Перехват запросов (работа оффлайн)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
