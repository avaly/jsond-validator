/**
 * @flow weak
 */

var patterns = require('../patterns');

function integer(compiler, schema) {
	if (schema !== patterns.integer) {
		return;
	}

	compiler.add('if(typeof %s!=="number"||%s<0||%s%1!==0)');
	compiler.error('INTEGER_REQUIRED');
}

module.exports = integer;
