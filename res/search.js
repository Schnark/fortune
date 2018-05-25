/*global fortunes*/
fortunes.search =
(function () {
"use strict";

var searchIndex = 0, currentSearch = '', updateTimeout;

function doSearch () {
	fortunes.findFortune(searchIndex, currentSearch, function (fortune, lang, name) {
		if (!fortune) {
			fortune = 'No search results';
			lang = 'en';
			name = '';
		}
		fortunes.show(fortune, lang, name);
	});
}

function onNewSearch (needle) {
	searchIndex = 0;
	currentSearch = needle;
	doSearch();
}

function onNext () {
	searchIndex++;
	doSearch();
}

function onPrev () {
	searchIndex--;
	doSearch();
}

function onUpdate () {
	/*jshint validthis:true*/
	if (updateTimeout) {
		clearTimeout(updateTimeout);
	}
	updateTimeout = setTimeout(function () {
		onNewSearch(this.value);
	}.bind(this), 500);
}

return {
	next: onNext,
	prev: onPrev,
	update: onUpdate
};

})();