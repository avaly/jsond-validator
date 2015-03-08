module.exports = [
	// valid
	{
		name: 'string, non-empty string',
		schema: 'string',
		data: 'foo',
		valid: true
	},
	{
		name: 'string, empty string',
		schema: 'string',
		data: '',
		valid: true
	},

	// invalid
	{
		name: 'string, number',
		schema: 'string',
		data: 1,
		valid: false
	},
	{
		name: 'string, boolean',
		schema: 'string',
		data: true,
		valid: false
	},
	{
		name: 'string, array',
		schema: 'string',
		data: [],
		valid: false
	},
	{
		name: 'string, object',
		schema: 'string',
		data: {},
		valid: false
	}
];
