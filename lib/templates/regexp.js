/**
 * @flow weak
 */

function set(compiler, schema) {
	if (typeof schema !== 'string') {
		return;
	}

	var pattern = schema;
	if (pattern[0] !== '^') {
		pattern = '^' + pattern;
	}
	if (pattern[pattern.length - 1] !== '$') {
		pattern = pattern + '$';
	}
	pattern = pattern.replace(/\//g, '\\/');

	compiler.add('if(!/%p/.test(%s))', pattern);
	compiler.error('STRING_PATTERN');
}

module.exports = set;
