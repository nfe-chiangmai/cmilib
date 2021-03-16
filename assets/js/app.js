// In order to provide an offline experience we need to register service worker to fetch and store assets
// Our service worker is located at "/princessLibraryProject/assets/js/sw.js" go there to more details 

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./princessLibraryProject/sw.js")
        .then(() => console.log("registered service worker!"));
}
