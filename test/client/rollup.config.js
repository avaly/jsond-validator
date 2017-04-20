const builtins = require('rollup-plugin-node-builtins');
const commonjs = require('rollup-plugin-commonjs');
const filesize = require('rollup-plugin-filesize');
const globals = require('rollup-plugin-node-globals');
const replace = require('rollup-plugin-re');

module.exports = {
	entry: 'test/client/entry.js',
	dest: 'test/client/tests.js',
	format: 'iife',
	moduleName: 'JSONDValidatorTests',
	plugins: [
		replace({
			patterns: [
				{
					test: "debug = require('debug')('jsond-validator')",
					replace: '',
				},
				{
					test: /debug\(.+\);/g,
					replace: '',
				},
			],
		}),
		commonjs({
			sourceMap: false,
		}),
		builtins(),
		globals(),
		filesize(),
	],
};
