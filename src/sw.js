/* eslint-disable no-restricted-globals */

const filesToCache = [
    '/',
    'index.html',
    '404.html',
    'offline.html',
    'css/homepage.css',
    'css/err-page.css',
    'js/main.js',
    'js/homepage.js',
    'js/err-page.js',
    'js/modernizr.js',
    'js/type.js',
    'js/reveal.js',
    'images/icon/behance.svg',
    'images/icon/dribbble.svg',
    'images/icon/telegram.svg',
    'images/icon/offline.svg',
];
const version = 13;
const staticCacheName = `site-cache-v${version}`;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => cache.addAll(filesToCache)),
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then((resp) => {
                    if (resp.status === 404) {
                        return caches.match('/404.html');
                    }
                    // add fetched files to cache
                    return caches.open(staticCacheName).then((cache) => {
                        cache.put(event.request.url, resp.clone());
                        return resp;
                    });
                });
            }).catch(() => caches.match('/offline.html')),
    );
});

// delete outdated caches
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [staticCacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => (
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                    return true;
                }),
            )
        )),
    );
});
