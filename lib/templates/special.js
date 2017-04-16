/**
 * @flow weak
 */

var interval = require('./interval');
var patterns = require('../patterns');
var set = require('./set');
var regexp = require('./regexp');

function special(compiler, schema) {
	if (typeof schema !== 'string') {
		return;
	}

	var next;
	var parsed = schema.match(patterns.set);
	if (parsed) {
		next = set;
	} else {
		parsed = schema.match(patterns.interval);
		if (parsed) {
			next = interval;
		} else {
			next = regexp;
		}
	}

	next(compiler, schema, parsed);
}

module.exports = special;
