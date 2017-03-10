/**
 * @flow
 */

var JSONDValidator = require('jsond-validator');

import type { JSONDValidatorResult } from 'jsond-validator';

var validator = new JSONDValidator();

validator.addSchema('foo', 'number');

var result: JSONDValidatorResult = validator.validate(123, 'foo');

// This should throw a Flow error
result.bogus == null;
result.valid === true;
result.errors.forEach(function(error) {
	error.code;
	error.path.join(' ');
});
