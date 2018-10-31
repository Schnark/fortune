/*global caches, fetch, Promise */
(function (worker) {
"use strict";

var VERSION = 'v1.3',
	FILES = [
		'index.html',
		'fortunes/art',
		'fortunes/computers',
		'fortunes/definitions',
		'fortunes/drugs',
		'fortunes/education',
		'fortunes/ethnic',
		'fortunes/food',
		'fortunes/fortunes',
		'fortunes/fortunes2',
		'fortunes/fortunes2-o',
		'fortunes/fortunes-o',
		'fortunes/goedel',
		'fortunes/humorists',
		'fortunes/humorix-misc',
		'fortunes/kids',
		'fortunes/law',
		'fortunes/linux',
		'fortunes/literature',
		'fortunes/love',
		'fortunes/magic',
		'fortunes/medicine',
		'fortunes/miscellaneous',
		'fortunes/news',
		'fortunes/people',
		'fortunes/pets',
		'fortunes/platitudes',
		'fortunes/politics',
		'fortunes/riddles',
		'fortunes/science',
		'fortunes/songs-poems',
		'fortunes/sports',
		'fortunes/wisdom',
		'fortunes/work',
		'res/app.js',
		'res/find.js',
		'res/format.js',
		'res/fortune.css',
		'res/fortune.js',
		'res/history.js',
		'res/load.js',
		'res/notification.js',
		'res/random.js',
		'res/search.js',
		'res/settings.js'
	];

worker.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(VERSION).then(function (cache) {
			return cache.addAll(FILES);
		})
	);
});

worker.addEventListener('activate', function (e) {
	e.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(keys.map(function (key) {
				if (key !== VERSION) {
					return caches.delete(key);
				}
			}));
		})
	);
});

worker.addEventListener('fetch', function (e) {
	e.respondWith(caches.match(e.request, {ignoreSearch: true})
		.then(function (response) {
			return response || fetch(e.request);
		})
	);
});

})(this);