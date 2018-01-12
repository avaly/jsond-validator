/**
 * @flow weak
 */

var patterns = require('../patterns');

function object(compiler, schema) {
	if (typeof schema !== 'object') {
		return;
	}

	compiler.add('if(typeof %s!=="object")');
	compiler.error('OBJECT_REQUIRED');
	compiler.add('else {');

	var required = {};
	var keys = Object.keys(schema).map(function(key) {
		var keyName = key.replace(patterns.optional, '');
		required[keyName] = key === keyName;
		return keyName;
	});

	for (var keyIndex = 0, length = keys.length; keyIndex < length; keyIndex++) {
		var key = keys[keyIndex];
		if (required[key]) {
			compiler.add('if(!%s.hasOwnProperty("%p"))', key);
			compiler.error('OBJECT_PROPERTY_REQUIRED', JSON.stringify(key));
			compiler.add('else {');
			compiler.stack(JSON.stringify(key), "'" + key + "'");
			compiler.visit(schema[key]);
			compiler.pop();
			compiler.add('}');
		} else {
			compiler.add('if(%s.hasOwnProperty("%p"))', key);
			compiler.stack(JSON.stringify(key), "'" + key + "'");
			compiler.visit(schema[key + '?']);
			compiler.pop();
		}
	}

	var keysData = compiler.var('k');
	var index = compiler.var('i');
	var keysComparators = keys.map(function(key) {
		return keysData + '[' + index + ']!=="' + key + '"';
	});
	var condition = keys.length ? keysComparators.join('&&') : 'true';

	compiler.add('var %p=Object.keys(%s)', keysData);
	compiler.add(
		'for(var %p=0;%p<%p.length;%p++){',
		index,
		index,
		keysData,
		index
	);
	compiler.add('if(%p)', condition);
	compiler.error(
		'OBJECT_PROPERTIES_ADDITIONAL',
		undefined,
		keysData + '[' + index + ']'
	);
	compiler.add('}');

	compiler.add('}');
}

module.exports = object;
