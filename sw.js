const CACHE_NAME = 'proferia-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Recebe a mensagem para disparar a notificação sonora no sistema (mesmo com a tela apagada)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'TRIGGER_ALARM') {
    self.registration.showNotification('🔔 Aula Acabando! - Proféria', {
      body: event.data.body || 'Faltam 5 minutos para o término da aula.',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      vibrate: [300, 100, 300, 100, 300],
      tag: 'proferia-alarm',
      renotify: true,
      requireInteraction: true
    });
  }
});