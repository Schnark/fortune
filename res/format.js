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

function htmlEscape (text) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
		.replace(/&lt;(\/?u)&gt;/g, '<$1>');
}

function formatFortune (fortune) {
	var lines, asciiArtRe, noContinue, signature, long, i, res, parindent, ignoreEmpty;

	asciiArtRe = /\S {9,}|[^a-zA-Z0-9.:) ] {8}|[^a-zA-Z0-9.!? ]{5,}|[^a-zA-Z0-9 ]{9,}/;
	noContinue = /^(?: +--| *\((?:.|\d+)\) | *\d+[.:)] |> |\w: )/;
	signature = /^ +--/;
	long = 60;

	lines = fortune.replace(/^\n+/, '').replace(/\n+$/g, '')
		.replace(/((?:_+\u0008+)+)([^_\u0008]*)/g, function (all, underline, rest) {
			return '<u>' + rest.slice(0, underline.length / 2) + '</u>' + rest.slice(underline.length / 2);
		})
		.split('\n')
		.map(function (line) {
			line = line.split(/\t/).map(function (chunk, i, all) {
				if (i === all.length - 1) {
					return chunk;
				}
				return chunk + (new Array(9 - chunk.length % 8)).join(' ');
			}).join('');
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

	if (lines.length > 2) {
		for (i = 0; i < lines.length; i++) {
			res = /\S {3,}/.exec(lines[i].text);
			if (res) {
				lines[i].type = 'table';
				lines[i].table = [res.index + 1, res.index + res[0].length];
			}
		}
		res = [0, Infinity];
		for (i = 0; i < lines.length; i++) {
			if (lines[i].type === 'table') {
				res[0] = Math.max(res[0], lines[i].table[0]);
				res[1] = Math.min(res[1], lines[i].table[1]);
			}
		}
		if (res[0] >= res[1]) {
			for (i = 0; i < lines.length; i++) {
				if (lines[i].type === 'table') {
					lines[i].type = '';
				}
			}
		} else {
			for (i = 0; i < lines.length; i++) {
				if (lines[i].type === 'table') {
					if (lines[i].table[0] <= res[0] && lines[i].table[1] >= res[1]) {
						lines[i].table = res;
					} else {
						lines[i].type = '';
					}
				}
			}
			if (lines[0].type === 'table' && lines[1].type !== 'table') {
				lines[0].type = '';
			}
			for (i = 1; i < lines.length - 1; i++) {
				if (
					lines[i].type === 'table' &&
					lines[i - 1].type !== 'table' &&
					lines[i + 1].type !== 'table'
				) {
					lines[i].type = '';
				}
			}
			if (lines[lines.length - 1].type === 'table' && lines[lines.length - 2].type !== 'table') {
				lines[lines.length - 1].type = '';
			}
			for (i = 1; i < lines.length; i++) {
				if (
					lines[i - 1].type === 'table' &&
					!lines[i].signature &&
					!lines[i].type &&
					/^ *$/.test(lines[i].text.slice(res[0], res[1]))
				) {
					lines[i].type = 'table';
					lines[i].table = res;
				}
			}
			for (i = lines.length - 2; i >= 0; i--) {
				if (
					lines[i + 1].type === 'table' &&
					!lines[i].type &&
					/^ *$/.test(lines[i].text.slice(res[0], res[1]))
				) {
					lines[i].type = 'table';
					lines[i].table = res;
				}
			}
			for (i = 1; i < lines.length - 1; i++) {
				if (
					lines[i].type === 'table' &&
					!lines[i - 1].type &&
					!lines[i + 1].type
				) {
					lines[i].type = '';
				}
			}
		}
	}

	if (lines.length > 1) {
		for (i = 0; i < lines.length; i++) {
			if (!lines[i].type && asciiArtRe.test(lines[i].text)) {
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
				lines[i - 1].text.length + lines[i].text.replace(/^ *([^ ]* *).*$/, '$1').length >
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
			case 'table': html += '<table>'; break;
			case 'pre': html += '<pre>'; break;
			case 'line': html += '<p>'; break;
			case 'p': html += '<p' + (line.indent ? ' class="indent-' + line.indent + '"' : '') + '>';
			}
		}
		if (line.type === 'line' && line.indent) {
			html += '<span class="indent-' + line.indent + '">';
		}
		if (line.type === 'table') {
			html += '<tr><td>' + htmlEscape(line.text.slice(0, line.table[0])) + '</td>' +
				'<td>' + htmlEscape(line.text.slice(line.table[1])) + '</td></tr>';
		} else {
			html += htmlEscape(line.text);
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
		}
		if (line.end) {
			switch (line.type) {
			case 'table': html += '</table>'; break;
			case 'pre': html += '</pre>'; break;
			case 'line': case 'p': html += '</p>';
			}
		}
		return html;
	}).join('');
}

return formatFortune;

})();