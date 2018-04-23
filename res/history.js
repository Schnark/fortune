/*global fortunes*/
fortunes.history =
(function () {
"use strict";

var history = [], historyIndex = -1;

function addHistory (fortune, lang) {
	history.push({fortune: fortune, lang: lang});
	if (history.length > 10) {
		history.shift();
	}
	historyIndex = history.length - 1;
}

function prevHistory () {
	if (historyIndex === -1) {
		return;
	}
	historyIndex--;
	if (historyIndex === -1) {
		historyIndex = history.length - 1;
	}
	fortunes.show(history[historyIndex].fortune, history[historyIndex].lang);
}

function nextHistory () {
	if (historyIndex === -1) {
		return;
	}
	historyIndex++;
	if (historyIndex === history.length) {
		historyIndex = 0;
	}
	fortunes.show(history[historyIndex].fortune, history[historyIndex].lang);
}

return {
	add: addHistory,
	prev: prevHistory,
	next: nextHistory
};

})();