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
  "/princessLibraryProject/assets/js/app.js,
  "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/bulma-social@1/bin/bulma-social.min.css",
  "",
  "/princessLibraryProject/assets/css/app.css",
  "/princessLibraryProject/",
  "/princessLibraryProject/pages/biography.html",
  "/princessLibraryProject/pages/education.html",
  "/princessLibraryProject/pages/hobbies.html",
  "/princessLibraryProject/pages/language.html",
  "/princessLibraryProject/pages/royalDuties.html",
  "/princessLibraryProject/pages/royalInitiatives.html",
  "/princessLibraryProject/pages/writings.html"
];

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

self.addEventListener("fetch", event => {
    if (event.request.url === "https://nh758.github.io/princessLibraryProject/") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/offline.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});
