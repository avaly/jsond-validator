module.exports = [
	// valid
	{
		name: 'integer, 1',
		schema: 'integer',
		data: 1,
		valid: true
	},
	{
		name: 'integer, 0',
		schema: 'integer',
		data: 0,
		valid: true
	},

	// invalid
	{
		name: 'integer, -1',
		schema: 'integer',
		data: -1,
		valid: false
	},
	{
		name: 'integer, decimals',
		schema: 'integer',
		data: 1.5,
		valid: false
	},

	{
		name: 'integer, boolean',
		schema: 'integer',
		data: true,
		valid: false
	},
	{
		name: 'integer, non-empty string',
		schema: 'integer',
		data: 'foo',
		valid: false
	},
	{
		name: 'integer, array',
		schema: 'integer',
		data: [],
		valid: false
	},
	{
		name: 'integer, object',
		schema: 'integer',
		data: {},
		valid: false
	}
];
