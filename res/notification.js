/*global fortunes*/
/*global Notification*/
fortunes.notification =
(function () {
"use strict";

var alarmViaTimeout = {}, icon =
//jscs:disable maximumLineLength
	'data:image/png;base64,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';
//jscs:enable maximumLineLength

function requestPermission () {
	if (!window.Notification || Notification.permission !== 'default') {
		return;
	}
	Notification.requestPermission();
}

function removeAlarms (callback) {
	if (!navigator.mozAlarms) {
		if (alarmViaTimeout.id) {
			clearTimeout(alarmViaTimeout.id);
			alarmViaTimeout.id = false;
		}
		callback(true);
		return;
	}
	navigator.mozAlarms.getAll().onsuccess = function () {
		this.result.forEach(function (alarm) {
			if (alarm.data.type === 'fortune') {
				navigator.mozAlarms.remove(alarm.id);
			}
		});
		callback();
	};
}

function setAlarm (time) {
	removeAlarms(function (timeout) {
		if (time > 0) {
			requestPermission();
			if (timeout) {
				alarmViaTimeout.id = setTimeout(function () {
					if (alarmViaTimeout.callback) {
						alarmViaTimeout.callback();
					}
				}, time);
			} else {
				navigator.mozAlarms.add(new Date(Date.now() + time), 'ignoreTimezone', {type: 'fortune'});
			}
		}
	});
}

function handleAlarm (handler) {
	if (navigator.mozSetMessageHandler) {
		navigator.mozSetMessageHandler('alarm', handler);
	} else {
		alarmViaTimeout.callback = handler;
	}
}

function showNotification (fortune, lang) {
	if (!window.Notification || Notification.permission !== 'granted') {
		return;
	}
	var notification = new Notification('fortune', {
		icon: icon,
		body: fortune,
		lang: lang,
		tag: 'fortune'
	});
	if (!navigator.mozApps || !navigator.mozApps.getSelf) {
		return;
	}
	notification.addEventListener('click', function () {
		notification.close();
		navigator.mozApps.getSelf().onsuccess = function () {
			if (this.result) {
				this.result.launch();
			}
		};
	});
}

return {
	show: showNotification,
	setAlarm: setAlarm,
	setAlarmListener: handleAlarm
};

})();