/**
 * @flow weak
 */

var patterns = require('../patterns');

function boolean(compiler, schema) {
	if (schema !== patterns.boolean) {
		return;
	}

	compiler.add('if(typeof %s!=="boolean")');
	compiler.error('BOOLEAN_REQUIRED');
}

module.exports = boolean;
