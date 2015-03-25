module.exports = [
	{
		name: 'number',
		schema: 'number',
		tests: [
			// valid
			{
				name: '1',
				data: 1,
				valid: true
			},
			{
				name: '0',
				data: 0,
				valid: true
			},
			{
				name: '-1',
				data: -1,
				valid: true
			},
			{
				name: 'decimals',
				data: 1.5,
				valid: true
			},

			// invalid
			{
				name: 'boolean',
				data: true,
				valid: false
			},
			{
				name: 'non-empty string',
				data: 'foo',
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
