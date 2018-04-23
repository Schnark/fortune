/*global fortunes*/
fortunes.settings =
(function () {
"use strict";

var rawCheckbox, updateElement;

function loadSettings () {
	var data;
	try {
		data = JSON.parse(localStorage.getItem('fortune-settings') || 'x');
		fortunes.database.forEach(function (entry) {
			entry.enabled = data.files.indexOf(entry.filename) > -1;
		});
		rawCheckbox.checked = data.raw;
		updateElement.value = data.update;
	} catch (e) {
	}
}

function saveSettings () {
	try {
		localStorage.setItem('fortune-settings', JSON.stringify({
			files: fortunes.database.filter(function (data) {
				return data.enabled;
			}).map(function (data) {
				return data.filename;
			}),
			raw: rawCheckbox.checked,
			update: updateElement.value
		}));
	} catch (e) {
	}
}

function updateAlarm () {
	fortunes.notification.setAlarm(Number(updateElement.value));
}

function initSettings () {
	var settingsList = document.getElementById('settings-list');
	rawCheckbox = document.getElementById('raw');
	updateElement = document.getElementById('settings-update');
	loadSettings();
	updateAlarm();
	settingsList.innerHTML = fortunes.database.map(function (data, id) {
		return '<li><label lang="' + data.lang + '">' +
				'<input type="checkbox" data-id="' + id + '"' + (data.enabled ? ' checked' : '') + '> ' +
				'<b>' + data.name + ':</b> ' + data.description +
			'</label></li>';
	}).join('');
	settingsList.addEventListener('change', function (e) {
		fortunes.database[e.target.dataset.id].enabled = e.target.checked;
		saveSettings();
	}, false);
	rawCheckbox.addEventListener('change', saveSettings, false);
	updateElement.addEventListener('change', function () {
		updateAlarm();
		saveSettings();
	}, false);
}

return {
	init: initSettings,
	updateAlarm: updateAlarm
};

})();