/**
 * @flow
 */

var JSONDValidator = require('jsond-validator');

var validator = new JSONDValidator();

// This should throw a Flow error
validator.bogus();
validator.addSchema('foo', 'number');
validator.addSchema('bar', ['string']);
validator.addSchema('ham', {
	id: 'string',
	items: ['string']
});

var schema = validator.getDereferencedSchema('ham');

var result = validator.validate(123, 'foo');

// This should throw a Flow error
result.bogus == null;
result.valid === true;
result.errors.forEach(function(error) {
	error.code;
	error.path.join(' ');
	// This should throw a Flow error
	error.nope;
});
