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
  "/princessLibraryProject/",
  "/princessLibraryProject/pages/biography.html",
  "/princessLibraryProject/pages/education.html",
  "/princessLibraryProject/pages/hobbies.html",
  "/princessLibraryProject/pages/language.html",
  "/princessLibraryProject/pages/royalDuties.html",
  "/princessLibraryProject/pages/royalInitiatives.html",
  "/princessLibraryProject/pages/writings.html",
  "/princessLibraryProject/pages/offline.html",
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


/*
First, the app attempts to get resources online and response with the cached resources if that fetch fails (using the respondWith() ).
Within the respondWith() , we call fetch(event.request) to try to fetch resources from the network, and since fetch is Promise based, 
the Promise will reject if it fails to connect to the network and in turn, trigger the catch() statement.
In the catch() statement is where you’d want to call your cached resources.
*/

self.addEventListener("fetch", event => {
    if (event.request.url === "https://nh758.github.io/princessLibraryProject/") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/princessLibraryProject/pages/offline.html"))
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
