module.exports = [
	// valid
	{
		name: 'number, 1',
		schema: 'number',
		data: 1,
		valid: true
	},
	{
		name: 'number, 0',
		schema: 'number',
		data: 0,
		valid: true
	},
	{
		name: 'number, -1',
		schema: 'number',
		data: -1,
		valid: true
	},
	{
		name: 'number, decimals',
		schema: 'number',
		data: 1.5,
		valid: true
	},

	// invalid
	{
		name: 'number, boolean',
		schema: 'number',
		data: true,
		valid: false
	},
	{
		name: 'number, non-empty string',
		schema: 'number',
		data: 'foo',
		valid: false
	},
	{
		name: 'number, array',
		schema: 'number',
		data: [],
		valid: false
	},
	{
		name: 'number, object',
		schema: 'number',
		data: {},
		valid: false
	}
];
