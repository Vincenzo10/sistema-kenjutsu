/* Service worker di "Il Sistema": permette di aprire l'app anche senza rete (es. al dojo).
   - App (index, manifest, icone): prima la rete, così gli aggiornamenti arrivano subito;
     se sei offline usa la copia salvata.
   - Font di Google: prima la copia salvata, poi la rete.
   I tuoi dati NON passano da qui: restano nel localStorage del telefono. */
const VERSION = 'sistema-v2';
const APP = ['./', './index.html', './manifest.json',
  './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* Font: cache prima */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy));
        return res;
      }))
    );
    return;
  }

  /* File dell'app: rete prima, copia salvata se offline */
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
  }
});
