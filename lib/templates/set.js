/**
 * @flow weak
 */

var number = require('./number');
var patterns = require('../patterns');

function set(compiler, schema, parsed) {
	if (typeof schema !== 'string') {
		return;
	}

	number(compiler, patterns.number);

	var values = parsed[1].split(',').map(function(n) {
		return parseFloat(n);
	});

	compiler.add('if(%p.indexOf(%s)===-1)', JSON.stringify(values));
	compiler.error('NOT_IN_SET');
}

module.exports = set;
