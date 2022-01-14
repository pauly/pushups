/* global self caches fetch */
const name = process.env.CI_PROJECT_NAME
const path = name ? `/${name}` : ''
const version = '1.0.0'
const cacheName = `${name}-${version}`
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `${path}/`,
        `${path}/index.html`
      ])
        .then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
        return response || fetch(event.request)
      })
  )
})
