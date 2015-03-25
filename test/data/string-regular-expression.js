module.exports = [
	// valid
	{
		name: 'pattern if/else',
		schema: 'a(b|c)',
		tests: [
			{
				name: 'valid',
				data: 'ab',
				valid: true
			},
			{
				name: 'invalid',
				data: 'ad',
				valid: false
			}
		]
	},
	{
		name: 'pattern begin/end, match',
		schema: '^(a|b|c)$',
		tests: [
			{
				name: 'valid',
				data: 'c',
				valid: true
			},
			{
				name: 'invalid',
				data: 'd',
				valid: false
			}
		]
	},
	{
		name: 'pattern character list, match',
		schema: '[a-z0-9]+',
		tests: [
			{
				name: 'valid',
				data: 'd2541a',
				valid: true
			},
			{
				name: 'invalid',
				data: 'fa5!6b.',
				valid: false
			}
		]
	}
];
