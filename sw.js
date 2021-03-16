// sw.js

let cache_name = "princessLibraryProject"; // The string used to identify our cache

/* 
  This is all the stuff that we want to save in the cache.
  In order for the app to work offline/be installable,
  we have to save not just images but our HTML, JS, and CSS
  as well - anything we want to use when offline.
*/
const assets = [
  "https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js",
  "/princessLibraryProject/assets/js/app.js",
  "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/bulma-social@1/bin/bulma-social.min.css",
  "/princessLibraryProject/assets/css/app.css",
  "/princessLibraryProject/assets/images/icons-512.png",
  "/princessLibraryProject/",
  "/princessLibraryProject/pages/biography.html",
  "/princessLibraryProject/pages/education.html",
  "/princessLibraryProject/pages/hobbies.html",
  "/princessLibraryProject/pages/language.html",
  "/princessLibraryProject/pages/royalDuties.html",
  "/princessLibraryProject/pages/royalInitiatives.html",
  "/princessLibraryProject/pages/writings.html"
];


/*
Essentially, this code instructs the browser to wait (using the waitUntil() call) for our caching.
By using the cache API, specifically the addAll(), our array of assets can be effortlessly added 
to the cache, ready to be served by the service workers.
*/

self.addEventListener("install", event => {
    console.log("installing...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(assets);
            })
            .catch(err => console.log(err))
    );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
