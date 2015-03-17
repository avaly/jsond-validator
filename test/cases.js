var path = require('path'),
	assert = require('assert'),
	glob = require('glob'),
	Validator = require('../');

glob.sync(__dirname + '/data/*.js').forEach(function(dataFile) {
	var testCases = require(dataFile),
		testCaseFile = path.basename(dataFile);

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
