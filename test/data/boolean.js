module.exports = [
	// valid
	{
		name: 'boolean, true',
		schema: 'boolean',
		data: true,
		valid: true
	},
	{
		name: 'boolean, false',
		schema: 'boolean',
		data: false,
		valid: true
	},

	// invalid
	{
		name: 'boolean, number',
		schema: 'boolean',
		data: 1,
		valid: false
	},
	{
		name: 'boolean, number 0',
		schema: 'boolean',
		data: 0,
		valid: false
	},
	{
		name: 'boolean, non-empty string',
		schema: 'boolean',
		data: 'foo',
		valid: false
	},
	{
		name: 'boolean, empty string',
		schema: 'boolean',
		data: '',
		valid: false
	},
	{
		name: 'boolean, array',
		schema: 'boolean',
		data: [],
		valid: false
	},
	{
		name: 'boolean, object',
		schema: 'boolean',
		data: {},
		valid: false
	}
];
