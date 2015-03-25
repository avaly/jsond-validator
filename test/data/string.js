module.exports = [
	{
		name: 'string',
		schema: 'string',
		tests: [
			// valid
			{
				name: 'non-empty string',
				data: 'foo',
				valid: true
			},
			{
				name: 'empty string',
				data: '',
				valid: true
			},
			// invalid
			{
				name: 'number',
				data: 1,
				valid: false
			},
			{
				name: 'boolean',
				data: true,
				valid: false
			},
			{
				name: 'array',
				data: [],
				valid: false
			},
			{
				name: 'object',
				data: {},
				valid: false
			}
		]
	}
];
