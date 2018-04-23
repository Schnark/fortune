/*global fortunes */
fortunes.format =
(function () {
"use strict";

function median (array) {
	array.sort(function (a, b) {
		return b - a;
	});
	return array[Math.floor(array.length / 2)];
}

function formatFortune (fortune) {
	var lines, asciiArtRe, noContinue, signature, long, i, parindent, ignoreEmpty;

	asciiArtRe = /\S {9,}|[^a-zA-Z0-9.:) ] {8}|[^a-zA-Z0-9.!? ]{5,}|[^a-zA-Z0-9 ]{9,}/;
	noContinue = /^(?: +--| *\((?:.|\d+)\) | *\d+[.:)] |> |\w: )/;
	signature = /^ +--/;
	long = 60;

	lines = fortune.replace(/^\n+/, '').replace(/\n+$/g, '')
		.replace(/\t/g, '        ') //TODO echte Tabs
		.replace(/((?:_+\u0008+)+)(.*)/g, function (all, underline, rest) { //TODO rest nur so lang wie nötig
			return '<u>' + rest.slice(0, underline.length / 2) + '</u>' + rest.slice(underline.length / 2);
		})
		.split('\n')
		.map(function (line) {
			return {
				text: line
			};
		});
	if (lines.length <= 3) {
		long = 50;
	}
	for (i = 0; i < lines.length; i++) {
		if (signature.test(lines[i].text)) {
			lines[i].signature = true;
		}
		if (
			!lines[i].signature &&
			lines[i].text.length > long
		) {
			long = Math.min(lines[i].text.length, (70 + lines[i].text.length + long) / 3);
		}
	}

	if (lines.length > 1) {
		for (i = 0; i < lines.length; i++) {
			if (asciiArtRe.test(lines[i].text)) {
				lines[i].type = 'pre';
			}
		}
		for (i = 0; i < lines.length; i++) {
			if (
				!lines[i].type &&
				(i === 0 || lines[i - 1].type === 'pre') &&
				(i === lines.length - 1 || lines[i + 1].type === 'pre')
			) {
				lines[i].type = 'pre';
			}
		}
		for (i = 1; i < lines.length - 1; i++) {
			if (
				lines[i].type === 'pre' &&
				!lines[i - 1].type &&
				!lines[i + 1].type
			) {
				lines[i].type = '';
			}
		}
	}

	if (lines.length > 1) {
		for (i = 1; i < lines.length; i++) {
			if (
				(!lines[i - 1].type || lines[i - 1].type === 'p') &&
				!lines[i].type &&
				lines[i - 1].text.length + lines[i].text.replace(/^ *([^ ]*).*$/, '$1').length >=
					(i === 1 || lines[i - 1].signature ? 55 : long) &&
				!noContinue.test(lines[i].text) &&
				lines[i].text.replace(/^( *).*$/, '$1').length < lines[i - 1].text.replace(/^( *).*$/, '$1').length + 8
			) {
				lines[i - 1].type = 'p';
				lines[i - 1].noend = true;
				lines[i].type = 'p';
			} else if (!lines[i].type && lines[i].signature) {
				lines[i].type = 'p';
			}
		}
	}
	if (
		lines.length === 1 ||
		(lines.length > 2 && !lines[2].signature)
	) {
		for (i = 0; i < lines.length; i++) {
			if (
				!lines[i].type &&
				(i === 0 || lines[i - 1].type === 'p') && (
					i === lines.length - 1 ||
					lines[i + 1].type === 'p' || (
						!lines[i + 1].type && (
							i === lines.length - 2 ||
							lines[i + 2].type === 'p' || (
								!lines[i + 2].type && (
									i === lines.length - 3 ||
									lines[i + 3].type === 'p'
								)
							)
						)
					)
				)
			) {
				lines[i].type = 'p';
			}
		}
	}

	for (i = 0; i < lines.length; i++) {
		if ((!lines[i].type || lines[i].type === 'p') && !lines[i].text) {
			lines[i].type = 'empty';
		}
	}

	for (i = 0; i < lines.length; i++) {
		if (!lines[i].type) {
			lines[i].type = 'line';
		}
	}

	for (i = 0; i < lines.length; i++) {
		lines[i].indent = Math.floor(lines[i].text.replace(/^( *).*$/, '$1').length / 8);
	}

	ignoreEmpty = true;
	for (i = 0; i < lines.length; i++) {
		if (
			i === 0 ||
			lines[i - 1].end
		) {
			lines[i].start = true;
		}
		if (
			i === lines.length - 1 ||
			lines[i].type !== lines[i + 1].type || (
				lines[i].type === 'p' && (
					!lines[i].noend ||
					lines[i + 1].signature ||
					(!lines[i].start && lines[i].indent !== lines[i + 1].indent)
			))
		) {
			lines[i].end = true;
			if (
				lines[i].type === 'p' &&
				i !== lines.length - 1 &&
				lines[i + 1].type === 'p' &&
				!lines[i + 1].signature
			) {
				ignoreEmpty = false;
			}
		}
	}

	parindent = [];
	for (i = 0; i < lines.length; i++) {
		if (lines[i].type === 'p' && lines[i].start && !lines[i].end) {
			parindent.push(lines[i + 1].indent - lines[i].indent);
		}
	}
	parindent = median(parindent);
	for (i = 0; i < lines.length; i++) {
		if (lines[i].type === 'p' && lines[i].start) {
			if (!lines[i].end) {
				lines[i].indent = lines[i + 1].indent;
			} else {
				lines[i].indent += parindent;
			}
			if (lines[i].signature) {
				lines[i].indent = 'signature';
			}
		}
	}

	for (i = 0; i < lines.length; i++) {
		if (
			lines[i].type === 'empty' && (
				ignoreEmpty ||
				i === 0 ||
				lines[i - 1].type !== 'p' ||
				i === lines.length - 1 ||
				lines[i + 1].type !== 'p'
			)
		) {
			lines[i].ignore = true;
		}
	}

	return lines.map(function (line) {
		var html = '';
		if (line.ignore) {
			return '';
		}
		if (line.type === 'empty') {
			return '<hr>';
		}
		if (line.start) {
			switch (line.type) {
			case 'pre': html += '<pre>'; break;
			case 'line': html += '<p>'; break;
			case 'p': html += '<p' + (line.indent ? ' class="indent-' + line.indent + '"' : '') + '>';
			}
		}
		if (line.type === 'line' && line.indent) {
			html += '<span class="indent-' + line.indent + '">';
		}
		html += line.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
			.replace(/&lt;(\/?u)&gt;/g, '<$1>');
		if (line.type === 'pre') {
			html += '\n';
		} else if (line.type === 'p' && (line.text.slice(-1) !== '-' || line.text.slice(-2) === '--')) {
			html += ' ';
		}
		if (line.type === 'line') {
			if (line.indent) {
				html += '</span>';
			}
			if (!line.end) {
				html += '<br>';
			}
		}
		if (line.end) {
			switch (line.type) {
			case 'pre': html += '</pre>'; break;
			case 'line': case 'p': html += '</p>';
			}
		}
		return html;
	}).join('');
}

return formatFortune;

})();