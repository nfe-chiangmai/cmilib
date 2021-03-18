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
  "https://fonts.googleapis.com/css?family=Montserrat",
  "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2",
  "/princessLibraryProject/assets/css/app.css",
  "/princessLibraryProject/assets/images/id1982_somdejprathep.jpg",
  "/princessLibraryProject/assets/images/library-small.png",
  "/princessLibraryProject/assets/images/library.png",
  "/princessLibraryProject/assets/images/icons-512.png",
  "/princessLibraryProject/assets/images/queen-landing.png",
  "/princessLibraryProject/assets/images/1_1.jpg",
  "/princessLibraryProject/assets/images/1_2.jpg",
  "/princessLibraryProject/assets/images/1_3.jpg",
  "/princessLibraryProject/assets/images/1_4.jpg",
  "/princessLibraryProject/assets/images/1_5.jpg",
  "/princessLibraryProject/assets/images/1_6.jpg",
  "/princessLibraryProject/assets/images/1_7.jpg",
  "/princessLibraryProject/assets/images/1_8.jpg",
  "/princessLibraryProject/assets/images/1_9.jpg",
  "/princessLibraryProject/assets/images/1_10.jpg",
  "/princessLibraryProject/assets/images/1_11.jpg",
  "/princessLibraryProject/assets/images/1_12.jpg",
  "/princessLibraryProject/assets/images/1_101.jpg",
  "/princessLibraryProject/assets/images/1_201.jpg",
  "/princessLibraryProject/assets/images/1_202.jpg",
  "/princessLibraryProject/assets/images/1_203.jpg",
  "/princessLibraryProject/assets/images/1_204.jpg",
  "/princessLibraryProject/assets/images/1_205.jpg",
  "/princessLibraryProject/assets/images/1_206.jpg",
  "/princessLibraryProject/assets/images/1_207.jpg",
  "/princessLibraryProject/assets/images/1_208.jpg",
  "/princessLibraryProject/assets/images/1_209.jpg",
  "/princessLibraryProject/assets/images/1_210.jpg",
  "/princessLibraryProject/assets/images/1_211.jpg",
  "/princessLibraryProject/assets/images/1_212.jpg",
  "/princessLibraryProject/assets/images/1_213.jpg",
  "/princessLibraryProject/assets/images/1_214.jpg",
  "/princessLibraryProject/assets/images/1_301.jpg",
  "/princessLibraryProject/assets/images/1_302.jpg",
  "/princessLibraryProject/assets/images/2_1.jpg",
  "/princessLibraryProject/assets/images/2_101.jpg",
  "/princessLibraryProject/assets/images/2_201.jpg",
  "/princessLibraryProject/assets/images/2_301.jpg",
  "/princessLibraryProject/assets/images/2_401.jpg",
  "/princessLibraryProject/assets/images/2_402.jpg",
  "/princessLibraryProject/assets/images/2_403.jpg",
  "/princessLibraryProject/assets/images/3_1.jpg",
  "/princessLibraryProject/assets/images/3_2.jpg",
  "/princessLibraryProject/assets/images/3_3.jpg",
  "/princessLibraryProject/assets/images/3_4.jpg",
  "/princessLibraryProject/assets/images/3_5.jpg",
  "/princessLibraryProject/assets/images/4_201.jpg",
  "/princessLibraryProject/assets/images/4_202.jpg",
  "/princessLibraryProject/assets/images/4_203.jpg",
  "/princessLibraryProject/assets/images/4_204.jpg",
  "/princessLibraryProject/assets/images/RC01.gif",
  "/princessLibraryProject/pages/biography.md",
  "/princessLibraryProject/books.md",
  "/princessLibraryProject/pages/education.md",
  "/princessLibraryProject/pages/hobbies.md",
  "/princessLibraryProject/pages/language.md",
  "/princessLibraryProject/pages/offline.md",
  "/princessLibraryProject/pages/royalDuties.md",
  "/princessLibraryProject/pages/royalDutiesAssigned.md",
  "/princessLibraryProject/pages/royalDutiesDevelopment.md",
  "/princessLibraryProject/pages/royalDutiesEducation.md",
  "/princessLibraryProject/pages/royalDutiesForeignVisits.md",
  "/princessLibraryProject/pages/royalInitiatives.md",
  "/princessLibraryProject/pages/songs.md",
  "/princessLibraryProject/pages/writings.md"
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

            caches.open(cache_name)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
