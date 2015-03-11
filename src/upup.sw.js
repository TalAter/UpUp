// Register fetch event listener
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request.url).catch(function() {
      return new Response('Offline');
    })
  );
});