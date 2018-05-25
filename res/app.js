/*global fortunes*/
(function () {
"use strict";

fortunes.settings.init();
fortunes.notification.setAlarmListener(function () {
	fortunes.showRandom(true);
	fortunes.settings.updateAlarm();
});
document.getElementById('new-fortune').addEventListener('click', function () {
	fortunes.showRandom(false);
}, false);
document.getElementById('prev').addEventListener('click', fortunes.history.prev, false);
document.getElementById('next').addEventListener('click', fortunes.history.next, false);
document.getElementById('search-prev').addEventListener('click', fortunes.search.prev, false);
document.getElementById('search-next').addEventListener('click', fortunes.search.next, false);
document.getElementById('search-input').addEventListener('input', fortunes.search.update, false);
document.getElementById('search-input').value = ''; //force Firefox to empty even on reloads
fortunes.showRandom();

})();