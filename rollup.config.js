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
					test: /var logger = require\(..?\/logger\);/,
					replace: '',
				},
				{
					test: "logger = require('debug')('jsond-validator')",
					replace: '',
				},
				{
					test: /_DEBUG_ && logger\(.+\);/g,
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
