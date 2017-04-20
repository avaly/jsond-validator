/* eslint no-console: 0 */

var assert = require('assert');
var Validator = require('../');

var testCasesAll = {
	boolean: require('./data/boolean'),
	integer: require('./data/integer'),
	number: require('./data/number'),
	interval: require('./data/interval'),
	set: require('./data/set'),
	string: require('./data/string'),
	'string-regular-expression': require('./data/boolean'),
	array: require('./data/array'),
	object: require('./data/object'),
	constant: require('./data/constant'),
	reference: require('./data/reference'),
	'example-1': require('./data/example-1'),
};

Object.keys(testCasesAll).forEach(function(testCaseFile) {
	var testCases = testCasesAll[testCaseFile];

	testCases.forEach(function(testCase) {
		if (!testCase.tests) {
			return;
		}
		testCase.tests.forEach(function(testData, testIndex) {
			var testName = [
				testCaseFile,
				testCase.name,
				testData.name || testIndex,
			].join(' - ');

			test(testName, function() {
				var validator = new Validator(), result;

				if (testCase.schemas) {
					Object.keys(testCase.schemas).forEach(function(key) {
						validator.addSchema(key, testCase.schemas[key]);
					});
				}

				result = validator.validate(testData.data, testCase.schema);

				assert.equal(result.valid, testData.valid, '`valid` matches expected');

				if (!result.valid) {
					if (testData.errors) {
						assert.deepEqual(result.errors, testData.errors);
					} else {
						console.log(result.errors);
						assert.ok(false, 'Missing errors defined for test!');
					}
				}
				if (result.valid !== testData.valid && !result.valid) {
					console.log(result.errors);
				}
			});
		});
	});
});
