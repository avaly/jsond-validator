/**
 * @flow
 */
/* eslint no-unused-vars: 0 */

var JSONDValidator = require('jsond-validator');

var validator = new JSONDValidator();

validator.addSchema('foo', 'number');
validator.addSchema('bar', ['string']);
validator.addSchema('ham', {
	id: 'string',
	items: ['string'],
});

var schema = validator.getDereferencedSchema('ham');

var result = validator.validate(123, 'foo');

result.valid === true;
result.errors.forEach(function(error) {
	error.code;
	error.path.join(' ');
});
