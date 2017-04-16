/**
 * @flow weak
 */

function varant(compiler, schema) {
	compiler.add('if(%s!==%p)', JSON.stringify(schema));
	compiler.error('CONSTANT');
}

module.exports = varant;
