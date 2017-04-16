/**
 * @flow weak
 */

var number = require('./number');
var patterns = require('../patterns');

function interval(compiler, schema, parsed) {
	if (typeof schema !== 'string') {
		return;
	}

	number(compiler, patterns.number);

	var start = parsed[2] && parsed[2].length ? Number(parsed[2]) : null;
	var end = parsed[3] && parsed[3].length ? Number(parsed[3]) : null;
	var startComparator = parsed[1] === '[' ? '<' : '<=';
	var endComparator = parsed[4] === ']' ? '>' : '>=';

	if (start) {
		compiler.add('if(%s%p%p)', startComparator, start);
		compiler.error('INTERVAL_START');
	}
	if (end) {
		compiler.add('if(%s%p%p)', endComparator, end);
		compiler.error('INTERVAL_END');
	}
}

module.exports = interval;
