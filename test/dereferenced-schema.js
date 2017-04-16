var assert = require('assert');
var Validator = require('../');

test('dereferenced-schema', function() {
	var schemas = {
		'http://foo.com/first.jsond': 'http://bar.com/second.jsond',
		'http://bar.com/second.jsond': {
			id: 'third.jsond',
			list: ['third.jsond'],
			object: {
				deep: 'fourth.jsond',
			},
		},
		'third.jsond': '^u[0-9]+$',
		'fourth.jsond': '(10,99]',
	};
	var validator = new Validator();

	Object.keys(schemas).forEach(function(key) {
		validator.addSchema(key, schemas[key]);
	});

	assert.deepEqual(
		validator.getDereferencedSchema('http://foo.com/first.jsond'),
		{
			id: '^u[0-9]+$',
			list: ['^u[0-9]+$'],
			object: {
				deep: '(10,99]',
			},
		}
	);
});
