/**
 * @flow weak
 */

function before(compiler) {
	// Errors
	compiler.add('var E=[]');
}

module.exports = before;
