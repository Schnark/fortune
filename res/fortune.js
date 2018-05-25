/*global fortunes: true*/
fortunes =
(function () {
"use strict";

var fortuneDatabase = [{
	filename: 'fortunes/fortunes',
	name: 'fortunes',
	description: 'Traditional fortunes file with many different fortune cookies.',
	lang: 'en',
	separator: '\n%\n',
	count: 3543,
	enabled: true
}, {
	filename: 'fortunes/fortunes2',
	name: 'fortunes2',
	description: 'Another traditional fortunes file with even more fortune cookies.',
	lang: 'en',
	separator: '\n%\n',
	count: 11644,
	enabled: true
}, {
	filename: 'fortunes/fortunes2-o',
	name: 'fortunes2-o',
	description: 'A traditional fortunes file with offensive fortune cookies.',
	lang: 'en',
	separator: '\n%\n',
	count: 2371,
	enabled: false
}, {
	filename: 'fortunes/fortunes-o',
	name: 'fortunes-o',
	description: 'Another traditional fortunes file with offensive fortune cookies.',
	lang: 'en',
	separator: '\n%\n',
	rot13: true,
	count: 392,
	enabled: false
}, {
	filename: 'fortunes/art',
	name: 'art',
	description: 'Fortune cookies about art',
	lang: 'en',
	separator: '\n%\n',
	count: 460,
	enabled: false
}, {
	filename: 'fortunes/computers',
	name: 'computers',
	description: 'Fortune cookies about computers',
	lang: 'en',
	separator: '\n%\n',
	count: 1025,
	enabled: false
}, {
	filename: 'fortunes/definitions',
	name: 'definitions',
	description: 'Fortune cookies with definitions',
	lang: 'en',
	separator: '\n%\n',
	count: 1187,
	enabled: false
}, {
	filename: 'fortunes/drugs',
	name: 'drugs',
	description: 'Fortune cookies about drugs',
	lang: 'en',
	separator: '\n%\n',
	count: 208,
	enabled: false
}, {
	filename: 'fortunes/education',
	name: 'education',
	description: 'Fortune cookies about education',
	lang: 'en',
	separator: '\n%\n',
	count: 203,
	enabled: false
}, {
	filename: 'fortunes/ethnic',
	name: 'ethnic',
	description: 'Fortune cookies about ethnic',
	lang: 'en',
	separator: '\n%\n',
	count: 162,
	enabled: false
}, {
	filename: 'fortunes/food',
	name: 'food',
	description: 'Fortune cookies about food',
	lang: 'en',
	separator: '\n%\n',
	count: 198,
	enabled: false
}, {
	filename: 'fortunes/goedel',
	name: 'goedel',
	description: 'Fortune cookies about fortune cookies',
	lang: 'en',
	separator: '\n%\n',
	count: 54,
	enabled: false
}, {
	filename: 'fortunes/humorists',
	name: 'humorists',
	description: 'Fortune cookies by humorists',
	lang: 'en',
	separator: '\n%\n',
	count: 197,
	enabled: false
}, {
	filename: 'fortunes/humorix-misc',
	name: 'humorix-misc',
	description: 'Fortune cookies about Windows',
	lang: 'en',
	separator: '\n%\n',
	count: 279,
	enabled: false
}, {
	filename: 'fortunes/kids',
	name: 'kids',
	description: 'Fortune cookies about kids',
	lang: 'en',
	separator: '\n%\n',
	count: 150,
	enabled: false
}, {
	filename: 'fortunes/law',
	name: 'law',
	description: 'Fortune cookies about laws',
	lang: 'en',
	separator: '\n%\n',
	count: 201,
	enabled: false
}, {
	filename: 'fortunes/linux',
	name: 'linux',
	description: 'Fortune cookies about Linux',
	lang: 'en',
	separator: '\n%\n',
	count: 393,
	enabled: false
}, {
	filename: 'fortunes/literature',
	name: 'literature',
	description: 'Fortune cookies about literature',
	lang: 'en',
	separator: '\n%\n',
	count: 261,
	enabled: false
}, {
	filename: 'fortunes/love',
	name: 'love',
	description: 'Fortune cookies about love',
	lang: 'en',
	separator: '\n%\n',
	count: 150,
	enabled: false
}, {
	filename: 'fortunes/magic',
	name: 'magic',
	description: 'Fortune cookies about magic',
	lang: 'en',
	separator: '\n%\n',
	count: 30,
	enabled: false
}, {
	filename: 'fortunes/medicine',
	name: 'medicine',
	description: 'Fortune cookies about medicine',
	lang: 'en',
	separator: '\n%\n',
	count: 74,
	enabled: false
}, {
	filename: 'fortunes/miscellaneous',
	name: 'miscellaneous',
	description: 'Miscellaneous fortune cookies',
	lang: 'en',
	separator: '\n%\n',
	count: 649,
	enabled: false
}, {
	filename: 'fortunes/news',
	name: 'news',
	description: 'Fortune cookies from and about news',
	lang: 'en',
	separator: '\n%\n',
	count: 53,
	enabled: false
}, {
	filename: 'fortunes/people',
	name: 'people',
	description: 'Fortune cookies about people',
	lang: 'en',
	separator: '\n%\n',
	count: 1243,
	enabled: false
}, {
	filename: 'fortunes/pets',
	name: 'pets',
	description: 'Fortune cookies about pets',
	lang: 'en',
	separator: '\n%\n',
	count: 51,
	enabled: false
}, {
	filename: 'fortunes/platitudes',
	name: 'platitudes',
	description: 'Fortune cookies with platitudes',
	lang: 'en',
	separator: '\n%\n',
	count: 500,
	enabled: false
}, {
	filename: 'fortunes/politics',
	name: 'politics',
	description: 'Fortune cookies about politics',
	lang: 'en',
	separator: '\n%\n',
	count: 700,
	enabled: false
}, {
	filename: 'fortunes/riddles',
	name: 'riddles',
	description: 'Fortune cookies with riddles',
	lang: 'en',
	separator: '\n%\n',
	count: 131,
	enabled: false
}, {
	filename: 'fortunes/science',
	name: 'science',
	description: 'Fortune cookies about science',
	lang: 'en',
	separator: '\n%\n',
	count: 624,
	enabled: false
}, {
	filename: 'fortunes/songs-poems',
	name: 'songs-poems',
	description: 'Fortune cookies with songs and poems',
	lang: 'en',
	separator: '\n%\n',
	count: 720,
	enabled: false
}, {
	filename: 'fortunes/sports',
	name: 'sports',
	description: 'Fortune cookies about sports',
	lang: 'en',
	separator: '\n%\n',
	count: 147,
	enabled: false
}, {
	filename: 'fortunes/wisdom',
	name: 'wisdom',
	description: 'Fortune cookies about wisdom',
	lang: 'en',
	separator: '\n%\n',
	count: 420,
	enabled: false
}, {
	filename: 'fortunes/work',
	name: 'work',
	description: 'Fortune cookies about work',
	lang: 'en',
	separator: '\n%\n',
	count: 630,
	enabled: false
}];

function showFortune (fortune, lang, name) {
	var raw = document.getElementById('fortune-raw'),
		formatted = document.getElementById('fortune'),
		source = document.getElementById('source');
	raw.innerHTML = fortune.replace(/</g, '&lt;');
	formatted.innerHTML = fortunes.format(fortune);
	source.innerHTML = name;
	raw.lang = lang;
	formatted.lang = lang;
	source.lang = lang;
}

function showRandomFortune (notification) {
	fortunes.getRandom(function (fortune, lang, name) {
		var short;
		fortunes.history.add(fortune, lang, name);
		if (notification) {
			short = fortune.replace(/\s+/g, ' ');
			if (short.length > 1024) {
				short = short.slice(0, 1023) + '…';
			}
			fortunes.notification.show(short, lang);
		}
		showFortune(fortune, lang, name);
	});
}

return {
	database: fortuneDatabase,
	show: showFortune,
	showRandom: showRandomFortune
};

})();