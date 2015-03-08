module.exports = [
	// valid
	{
		name: 'pattern if/else, match',
		schema: 'a(b|c)',
		data: 'ab',
		valid: true
	},
	{
		name: 'pattern begin/end, match',
		schema: '^(a|b|c)$',
		data: 'c',
		valid: true
	},
	{
		name: 'pattern character list, match',
		schema: '[a-z0-9]+',
		data: 'd2541a',
		valid: true
	},

	// invalid
	{
		name: 'pattern if/else, no match',
		schema: 'a(b|c)',
		data: 'ad',
		valid: false
	},
	{
		name: 'pattern begin/end, no match',
		schema: '^(a|b|c)$',
		data: 'd',
		valid: false
	},
	{
		name: 'pattern character list, no match',
		schema: '[a-z0-9]+',
		data: 'fa5!6b.',
		valid: false
	}
];
