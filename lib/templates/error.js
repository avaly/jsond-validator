/**
 * @flow weak
 */

function error(compiler, code, path, keyAtRuntime) {
	var pathValue =
		'[' +
		path.join(',') +
		']' +
		(keyAtRuntime ? '.concat([' + keyAtRuntime + '])' : '');

	compiler.add('E.push({code:%p,path:%p})', JSON.stringify(code), pathValue);
}

module.exports = error;
