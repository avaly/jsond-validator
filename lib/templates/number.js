/**
 * @flow weak
 */

var patterns = require('../patterns');

function number(compiler, schema) {
	if (schema !== patterns.number) {
		return;
	}

	compiler.add('if(typeof %s!=="number")');
	compiler.error('NUMBER_REQUIRED');
}

module.exports = number;
