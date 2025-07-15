const CACHE_NAME = "phuc-web-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  // Thêm các file khác nếu có (ảnh, âm thanh, script, css...)
];

// Cài đặt service worker và lưu cache
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Kích hoạt service worker
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Trả về nội dung từ cache khi offline
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
