var assert = require('assert'),
	execFileSync = require('child_process').execFileSync,
	path = require('path'),
	BIN_PATH = path.resolve(__dirname, '..', 'bin', 'validate-jsond'),
	FIXTURES_PATH = path.resolve(__dirname, '_fixtures_');

suite('validate-jsond', function() {
	test('help message', function() {
		var result = execFileSync(BIN_PATH);
		assert.equal(
			result.toString(),
			'Usage: validate-jsond INPUT SCHEMA\n'
		);
	});

	test('valid', function() {
		var result = execFileSync(
			BIN_PATH,
			[
				FIXTURES_PATH + '/example-1-valid.json',
				FIXTURES_PATH + '/example-1-schema.json'
			]
		);
		assert.equal(
			result.toString(),
			'The data is valid according to the JSON definition!\n'
		);
	});

	test('invalid', function() {
		try {
			execFileSync(
				BIN_PATH,
				[
					FIXTURES_PATH + '/example-1-invalid.json',
					FIXTURES_PATH + '/example-1-schema.json'
				]
			);
		} catch(err) {
			const stdout = err.stdout.toString();
			assert(stdout.indexOf('The data is NOT valid according to the JSON definition!') > -1);
			assert(stdout.indexOf('INTEGER_REQUIRED') > -1);
		}
	});
});
