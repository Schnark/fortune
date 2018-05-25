/*global fortunes*/
/*global console*/
fortunes.getFortune =
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
			callback(
				i2 === -1 ? fortunes.database[i1].fortunes : fortunes.database[i1].fortunes[i2],
				fortunes.database[i1].lang,
				fortunes.database[i1].name
			);
		});
		return;
	}
	callback(
		i2 === -1 ? fortunes.database[i1].fortunes : fortunes.database[i1].fortunes[i2],
		fortunes.database[i1].lang,
		fortunes.database[i1].name
	);
}

return getFortuneFromDatabase;

})();