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
fortunes.showRandom();

})();