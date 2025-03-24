const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/index.html',
    '/map.html',
    '/sos.html',
    '/manifest.json',
    '/https://static.vecteezy.com/system/resources/previews/019/787/057/non_2x/business-handshake-on-transparent-background-free-png.png',
    'https://unpkg.com/leaflet/dist/leaflet.js'
];

// Установим кеш для PWA
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Кэширование файлов');
                return cache.addAll(urlsToCache);
            })
    );
});

// Используем кеш для обслуживания запросов
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
    );
});
