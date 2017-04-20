const commonjs = require('rollup-plugin-commonjs');
const filesize = require('rollup-plugin-filesize');
const replace = require('rollup-plugin-re');

module.exports = {
	entry: 'index.js',
	dest: 'dist/jsond-validator.js',
	format: 'umd',
	moduleName: 'jsond-validator',
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
		filesize(),
	],
};
