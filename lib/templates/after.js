/**
 * @flow weak
 */

function after(compiler) {
	compiler.add('return E');
}

module.exports = after;
