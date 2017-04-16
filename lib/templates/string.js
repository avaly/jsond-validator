/**
 * @flow weak
 */

var patterns = require('../patterns');

function string(compiler, schema) {
	if (schema !== patterns.string) {
		return;
	}

	compiler.add('if(typeof %s!=="string")');
	compiler.error('STRING_REQUIRED');
}

module.exports = string;
