module.exports = {
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:flowtype/recommended',
		'prettier',
		'prettier/flowtype',
	],
	plugins: ['flowtype'],
	rules: {},
};
