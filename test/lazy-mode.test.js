var assert = require('assert');
var Validator = require('../');

test('lazy-mode', function() {
	var validator = new Validator();

	validator.addSchema('foo', 'number', true);
	validator.addSchema('bar', 'string');

	assert.equal(
		typeof validator.compiled.foo,
		'undefined',
		'Lazy schema was not compiled yet'
	);
	assert.equal(
		typeof validator.compiled.bar,
		'function',
		'Non-lazy schema was compiled'
	);

	assert.ok(validator.validate(123, 'foo').valid);
	assert.ok(!validator.validate('test', 'foo').valid);

	assert.ok(validator.validate('test', 'bar').valid);
	assert.ok(!validator.validate(123, 'bar').valid);
});
