var assert = require('assert'),
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
		'reference.js',
		'example-1.js'
	];

tests.forEach(function(testCaseFile) {
	var testCases = require('./data/' + testCaseFile);

	testCases.forEach(function(testCase) {
		if (!testCase.tests) {
			return;
		}
		testCase.tests.forEach(function(testData, testIndex) {
			var testName = [
					testCaseFile,
					testCase.name,
					(testData.name || testIndex)
				].join(' - ');

			test(testName, function() {
				var validator = new Validator(),
					result;

				if (testCase.schemas) {
					Object.keys(testCase.schemas).forEach(function(key) {
						validator.addSchema(key, testCase.schemas[key]);
					});
				}

				result = validator.validate(testData.data, testCase.schema);

				assert.equal(result.valid, testData.valid, '`valid` matches expected');

				if (result.valid !== testData.valid && !result.valid) {
					console.log(result.errors);
				}
			});
		});
	});
});
