
//! UpUp ServiceWorker
//! version : 0.0.1
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp

// serviceworker-cache-polyfill.js is included here when building distribution files.
// If you're using the unminified version of this script, make sure you:
// importScripts('serviceworker-cache-polyfill.js');

// Name of our cache
var _CACHE_NAME = 'upup-cache';

// Register message event listener
self.addEventListener('message', function(event) {
  // place offline message in cache
  if (event.data.action === 'set-settings') {
    _setSettings(event.data.settings)
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

var _setSettings = function(settings) {
  return caches.open(_CACHE_NAME).then(function(cache) {
    // Store our offline content in the cache
    if (settings.content) {
      return cache.put('sw-offline-content', _buildResponse(settings.content));
    } else {
      return cache.put('sw-offline-content', _buildResponse("You are offline"));
    }
  });
};

var _buildResponse = function(content) {
  return new Response(content, {
    headers: { 'Content-Type': 'text/html' }
  });
}