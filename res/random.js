/*global fortunes*/
/*global console*/
fortunes.getRandom =
(function () {
"use strict";

function rot13 (text) {
	return text.replace(/[a-zA-Z]/g, function (c) {
		if ((c >= 'a' && c <= 'm') || (c >= 'A' && c <= 'M')) {
			return String.fromCharCode(c.charCodeAt(0) + 13);
		}
		return String.fromCharCode(c.charCodeAt(0) - 13);
	});
}

function loadFile (name, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', name);
	xhr.responseType = 'text';
	xhr.onload = function () {
		callback(xhr.response);
	};
	xhr.send();
}

function init (index, callback) {
	loadFile(fortunes.database[index].filename, function (text) {
		if (fortunes.database[index].rot13) {
			text = rot13(text);
		}
		fortunes.database[index].fortunes = text.split(fortunes.database[index].separator).map(function (str) {
			return str.trim();
		}).filter(function (str) {
			return str;
		});
		if (fortunes.database[index].fortunes.length !== fortunes.database[index].count) {
			console.warn(fortunes.database[index].filename + ' has ' + fortunes.database[index].fortunes.length + ' entries!');
		}
		callback();
	});
}

function getFortuneFromDatabase (i1, i2, callback) {
	if (!fortunes.database[i1].fortunes) {
		init(i1, function () {
			callback(fortunes.database[i1].fortunes[i2], fortunes.database[i1].lang);
		});
		return;
	}
	callback(fortunes.database[i1].fortunes[i2], fortunes.database[i1].lang);
}

function getRandomFortune (callback) {
	var c = 0, i;
	for (i = 0; i < fortunes.database.length; i++) {
		if (fortunes.database[i].enabled) {
			c += fortunes.database[i].count;
		}
	}
	if (c === 0) {
		callback('This fortune cookie is empty.', 'en');
		return;
	}
	c = Math.floor(Math.random() * c);
	for (i = 0; i < fortunes.database.length; i++) {
		if (fortunes.database[i].enabled) {
			if (c < fortunes.database[i].count) {
				getFortuneFromDatabase(i, c, callback);
				return;
			} else {
				c -= fortunes.database[i].count;
			}
		}
	}
}

return getRandomFortune;

})();