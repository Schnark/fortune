/*global fortunes*/
fortunes.getRandom =
(function () {
"use strict";

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
				fortunes.getFortune(i, c, callback);
				return;
			} else {
				c -= fortunes.database[i].count;
			}
		}
	}
}

return getRandomFortune;

})();