/**
 * Check out https://googlechrome.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// 预先缓存关键资产
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// 动态缓存任何其他本地资产
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// 对于任何其他请求，请访问网络，缓存，
// 然后只在用户脱机时使用缓存资源
self.toolbox.router.default = self.toolbox.networkFirst;
