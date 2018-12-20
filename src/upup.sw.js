//! UpUp Service Worker
//! version : 1.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp

// Name of our cache
var _CACHE_NAME_PREFIX = 'upup-cache';

// Receives an input and calculates a hash for it
var _calculateHash = function(input) {
  input = input.toString();
  var hash = 0, i, chr, len = input.length;
  if (len === 0) {
    return hash;
  }
  for (i = 0; i < len; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

// Register message event listener
self.addEventListener('message', function(event) {
  // place offline message in cache
  if (event.data.action === 'set-settings') {
    _parseSettingsAndCache(event.data.settings);
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
        // (only if this is a navigation request. In older browsers we check if this is a text/html request. Thanks @jeffposnick)
        if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
          return caches.match('sw-offline-content');
        }
      });
    })
  );
});

var _parseSettingsAndCache = function(settings) {
  var newCacheName =
    _CACHE_NAME_PREFIX + '-' +
    (settings['cache-version'] ? (settings['cache-version'] + '-') : '') +
    _calculateHash(settings['content'] + settings['content-url'] + settings['assets']);
  return caches.open(newCacheName).then(function(cache) {
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
  }).then(function() {
    // Delete old caches
    return caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith(_CACHE_NAME_PREFIX) && newCacheName !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    });
  });
};

var _buildResponse = function(content) {
  return new Response(content, {
    headers: { 'Content-Type': 'text/html' },
  });
};
