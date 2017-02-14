/**
 * @flow
 */

var JSONDValidator = require('jsond-validator');

var validator = new JSONDValidator();

// $ExpectError
validator.bogus();
validator.addSchema('foo', 'number');
validator.addSchema('bar', ['string']);
validator.addSchema('ham', {
	id: 'string',
	items: ['string']
});

var schema = validator.getDereferencedSchema('ham');

var result = validator.validate(123, 'foo');

// $ExpectError
result.bogus == null;
result.valid === true;
result.errors.forEach(function(error) {
	error.code;
	error.path.join(' ');
});
