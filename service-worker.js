self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    // Add a call to skipWaiting here if you want to automatically activate the service worker as soon as it's finished installing
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});

// You can add fetch event listener to cache assets or handle requests
