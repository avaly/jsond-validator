var assert = require('assert');
var Validator = require('../');

test('schema IDs', function() {
	var validator = new Validator();

	assert.throws(function() {
		validator.addSchema('boolean', 'abc');
	});
	assert.throws(function() {
		validator.addSchema('integer', 'abc');
	});
	assert.throws(function() {
		validator.addSchema('number', 'abc');
	});
	assert.throws(function() {
		validator.addSchema('string', 'abc');
	});
});

test('missing schema', function() {
	var validator = new Validator();

	var result = validator.validate('foo', 'abc');

	assert(!result.valid);
	assert.deepEqual(result.errors, [
		{
			code: 'NO_SCHEMA',
			path: ['$'],
		},
	]);
});
