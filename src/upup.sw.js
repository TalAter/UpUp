
//! UpUp ServiceWorker
//! version : 0.3.0
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
    // try to return untouched request from network first
    fetch(event.request).catch(function() {
      // if it fails, try to return request from the cache
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        // if not found in cache, return default offline content
        // (only if this is a text/html request. Thanks @jeffposnick)
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('sw-offline-content');
        }
      })
    })
  );
});

var _setSettings = function(settings) {
  return caches.open(_CACHE_NAME).then(function(cache) {
    // Store our offline content in the cache
    if (settings['assets']) {
      cache.addAll(settings['assets'].map(function(urlToPrefetch) {
        return new Request(urlToPrefetch, { mode: 'no-cors' });
      }));
    }
    // store offline content from external url
    if (settings['content-url']) {
      return fetch(settings['content-url'], { mode: 'no-cors' }).then(function(response) {
        return cache.put('sw-offline-content', response);
      });
    // store plain content
    } else if (settings.content) {
      return cache.put('sw-offline-content', _buildResponse(settings.content));
    // store default content
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
