if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/princessLibraryProject/assets/js/sw.js")
        .then(() => console.log("registered service worker!"));
}
