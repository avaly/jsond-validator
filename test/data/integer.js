module.exports = [
	{
		name: 'integer',
		schema: 'integer',
		tests: [
			// valid
			{
				name: '1',
				data: 1,
				valid: true
			},
			{
				name: 'integer, 0',
				data: 0,
				valid: true
			},
			// invalid
			{
				name: '-1',
				data: -1,
				valid: false
			},
			{
				name: 'decimals',
				data: 1.5,
				valid: false
			},

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
