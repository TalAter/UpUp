
//! UpUp ServiceWorker
//! version : 0.0.1
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp

// serviceworker-cache-polyfill.js is included here when building distribution files.
// If you're using the unminified version, make sure you:
// importScripts('serviceworker-cache-polyfill.js');

// Name of our cache
var CACHE_NAME = 'upup-cache';

// Register install event listener
self.addEventListener('install', function(event) {
  // place default offline message in cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.put('sw-offline-content', new Response("You are offline"));
    })
  );
});

// Register message event listener
self.addEventListener('message', function(event) {
  // place offline message in cache
  if (event.data.action === 'set-settings') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.put('sw-offline-content', new Response(event.data.settings.content));
      })
    );
  }
});

// Register fetch event listener
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request.url).catch(function() {
      return caches.match('sw-offline-content');
    })
  );
});