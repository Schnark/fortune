/*global fortunes*/
fortunes.findFortune =
(function () {
"use strict";

var cache = {};

function normalize (text) {
	return text.toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9 ]+/g, '').replace(/\s+/g, ' ');
}

function searchInDatabase (i, needle, callback) {
	fortunes.getFortune(i, -1, function (f) {
		var results = [], j;
		for (j = 0; j < f.length; j++) {
			if (normalize(' ' + f[j] + ' ').indexOf(needle) > -1) {
				results.push(j);
			}
		}
		callback(results);
	});
}

function getSearchResults (i, needle, callback) {
	if (!cache[needle]) {
		cache[needle] = {};
	}
	if (cache[needle][i]) {
		callback(cache[needle][i]);
	} else {
		searchInDatabase(i, needle, function (results) {
			cache[needle][i] = results;
			callback(results);
		});
	}
}

function find (index, needle, callback) {
	var i, dir, dbs = [], foundAny = false;
	needle = normalize(needle);
	if (!needle) {
		callback(false);
		return;
	}
	for (i = 0; i < fortunes.database.length; i++) {
		if (fortunes.database[i].enabled) {
			dbs.push(i);
		}
	}
	if (dbs.length === 0) {
		callback(false);
		return;
	}
	if (index >= 0) {
		i = 0;
		dir = 1;
	} else {
		i = dbs.length - 1;
		dir = -1;
	}

	function recursiveFind () {
		getSearchResults(dbs[i], needle, function (results) {
			if (results.length) {
				foundAny = true;
			}
			if (dir > 0) {
				if (index < results.length) {
					fortunes.getFortune(dbs[i], results[index], callback);
					return;
				}
			} else {
				if (results.length + index >= 0) {
					fortunes.getFortune(dbs[i], results[results.length + index], callback);
					return;
				}
			}
			index -= dir * results.length;
			i += dir;
			if (dir > 0) {
				if (i === dbs.length) {
					i = 0;
					if (!foundAny) {
						callback(false);
						return;
					}
				}
			} else {
				if (i === -1) {
					i = dbs.length - 1;
					if (!foundAny) {
						callback(false);
						return;
					}
				}
			}
			setTimeout(recursiveFind, 0);
		});
	}

	recursiveFind();
}

return find;

})();