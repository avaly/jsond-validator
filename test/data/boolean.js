module.exports = [
	{
		name: 'boolean',
		schema: 'boolean',
		tests: [
			// valid
			{
				name: 'true',
				data: true,
				valid: true
			},
			{
				name: 'false',
				data: false,
				valid: true
			},
			// invalid
			{
				name: 'number',
				data: 1,
				valid: false
			},
			{
				name: 'number 0',
				data: 0,
				valid: false
			},
			{
				name: 'non-empty string',
				data: 'foo',
				valid: false
			},
			{
				name: 'empty string',
				data: '',
				valid: false
			},
			{
				name: 'empty array',
				data: [],
				valid: false
			},
			{
				name: 'empty object',
				data: {},
				valid: false
			}
		]
	}
];
