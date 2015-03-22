var assert = require('chai').assert,
	Validator = require('../'),
	tests = [
		'boolean.js',
		'integer.js',
		'number.js',
		'interval.js',
		'set.js',
		'string.js',
		'string-regular-expression.js',
		'array.js',
		'object.js',
		'example-1.js'
	];

tests.forEach(function(testCaseFile) {
	var testCases = require('./data/' + testCaseFile);

	testCases.forEach(function(testCase) {
		test(testCaseFile + ' ' + testCase.name, function() {
			var validator = new Validator(),
				result = validator.validate(testCase.data, testCase.schema);

			assert.equal(result.valid, testCase.valid, '`valid` matches expected');

			if (result.valid !== testCase.valid && !result.valid) {
				console.log(result.errors);
			}
		});
	});
});
