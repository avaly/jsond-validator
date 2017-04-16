/**
 * @flow weak
 */

function array(compiler, schema) {
	if (!Array.isArray(schema)) {
		return;
	}

	var index = compiler.var('i');

	compiler.add('if(!Array.isArray(%s))');
	compiler.error('ARRAY_REQUIRED');
	compiler.add('else');

	compiler.add('for(var %p=0;%p<%s.length;%p++){', index, index, index);
	if (schema.length) {
		compiler.stack(index, index);
		compiler.visit(schema[0]);
		compiler.pop();
	}
	compiler.add('}');
}

module.exports = array;
