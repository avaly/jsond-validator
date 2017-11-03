/* eslint no-console: 0 */

var assert = require('assert'),
	chalk = require('chalk'),
	execFileSync = require('child_process').execFileSync,
	diff = require('diff'),
	fs = require('fs'),
	path = require('path'),
	SNAPSHOTS_PATH = path.resolve(__dirname, '_snapshots_');

function prettyDiff(a, b) {
	var diffs = diff.diffChars(a, b);
	if (diffs.length > 1) {
		console.log(
			diffs.reduce(function(accumulator, part) {
				return (
					accumulator +
					(part.added
						? chalk.green(part.value)
						: part.removed ? chalk.red(part.value) : chalk.grey(part.value))
				);
			}, '')
		);
	}
	assert.equal(diffs.length, 1, 'There are no diffs');
}

suite('flow check', function() {
	test('flow ls', function() {
		var output = execFileSync('../../node_modules/.bin/flow', ['ls'], {
			cwd: __dirname,
		});
		console.log(output.toString());
	});

	test('detect Flow errors', function() {
		try {
			execFileSync('../../node_modules/.bin/flow', ['check'], {
				cwd: __dirname,
			});
			assert.ok(false, 'The check should have exited with an error');
		} catch (err) {
			assert.ok(err.status, 'Exit status is not 0');
			prettyDiff(
				err.stdout.toString(),
				fs.readFileSync(SNAPSHOTS_PATH + '/detect-errors.txt', 'utf-8')
			);
		}
	});
});
