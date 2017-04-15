module.exports = [
	{
		name: 'pattern if/else',
		schema: 'a(b|c)',
		tests: [
			{
				name: 'valid',
				data: 'ab',
				valid: true,
			},
			{
				name: 'invalid',
				data: 'ad',
				valid: false,
				errors: [
					{
						code: 'STRING_PATTERN',
						path: ['$'],
					},
				],
			},
		],
	},
	{
		name: 'pattern begin/end, match',
		schema: '^(a|b|c)$',
		tests: [
			{
				name: 'valid',
				data: 'c',
				valid: true,
			},
			{
				name: 'invalid',
				data: 'd',
				valid: false,
				errors: [
					{
						code: 'STRING_PATTERN',
						path: ['$'],
					},
				],
			},
		],
	},
	{
		name: 'pattern character list, match',
		schema: '[a-z0-9]+',
		tests: [
			{
				name: 'valid',
				data: 'd2541a',
				valid: true,
			},
			{
				name: 'invalid',
				data: 'fa5!6b.',
				valid: false,
				errors: [
					{
						code: 'STRING_PATTERN',
						path: ['$'],
					},
				],
			},
		],
	},
	{
		name: 'any characters with minimum length',
		schema: '.{4,}',
		tests: [
			{
				name: 'valid',
				data: 'abcd',
				valid: true,
			},
			{
				name: 'valid',
				data: 'abcde',
				valid: true,
			},
			{
				name: 'invalid',
				data: 'abc',
				valid: false,
				errors: [
					{
						code: 'STRING_PATTERN',
						path: ['$'],
					},
				],
			},
		],
	},
];
