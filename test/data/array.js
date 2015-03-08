module.exports = [
	// valid
	{
		name: 'array, strings, empty',
		schema: [
			'string'
		],
		data: [],
		valid: true
	},
	{
		name: 'array, strings, 1 string',
		schema: [
			'string'
		],
		data: [
			'foo'
		],
		valid: true
	},
	{
		name: 'array, strings, 2 strings',
		schema: [
			'string'
		],
		data: [
			'foo',
			'bar'
		],
		valid: true
	},
	{
		name: 'array, strings OR number, 3 values',
		schema: [
			'string',
			'number'
		],
		data: [
			12,
			'foo',
			-45.67
		],
		valid: true
	},
	{
		name: 'array, all types, 6 values',
		schema: [
			'boolean',
			'integer',
			'{-2.5,-1}',
			'[100,)',
			'^ab(c|d)$'
		],
		data: [
			-1,
			5,
			'abc',
			200,
			false,
			'abd'
		],
		valid: true
	},

	// invalid
	{
		name: 'array, strings, 1 number',
		schema: [
			'string'
		],
		data: [
			123
		],
		valid: false
	},
	{
		name: 'array, string OR integer, 1 number',
		schema: [
			'string',
			'integer'
		],
		data: [
			-123.45
		],
		valid: false
	},
	{
		name: 'array, set, no match',
		schema: [
			'{-2.5,-1}',
			'{4,5,6}'
		],
		data: [
			5,
			10
		],
		valid: false
	},
	{
		name: 'array, interval, no match',
		schema: [
			'[2,5]'
		],
		data: [
			3,
			6,
			1
		],
		valid: false
	},
	{
		name: 'array, regullar expression, no match',
		schema: [
			'ab(c|d)'
		],
		data: [
			'abc',
			'abe'
		],
		valid: false
	}
];
