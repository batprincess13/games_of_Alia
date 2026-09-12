const CACHE='games-of-alia-v6';
const CORE=[
  '/games_of_Alia/',
  '/games_of_Alia/index.html',
  '/games_of_Alia/home.css?v=transparent2',
  '/games_of_Alia/site.webmanifest?v=transparent2',
  '/games_of_Alia/builder-quest/',
  '/games_of_Alia/style.css',
  '/games_of_Alia/builder-quest/config.js',
  '/games_of_Alia/builder-quest/questions.js',
  '/games_of_Alia/builder-quest/app.js',
  '/games_of_Alia/assets/games-of-alia-logo.png?v=transparent2',
  '/games_of_Alia/icons/games-of-alia-180.png?v=transparent2',
  '/games_of_Alia/icons/games-of-alia-192.png?v=transparent2',
  '/games_of_Alia/icons/games-of-alia-512.png?v=transparent2'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match(event.request)));
});
