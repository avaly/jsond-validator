module.exports = [
	{
		name: 'number',
		schema: 'number',
		tests: [
			// valid
			{
				name: '1',
				data: 1,
				valid: true,
			},
			{
				name: '0',
				data: 0,
				valid: true,
			},
			{
				name: '-1',
				data: -1,
				valid: true,
			},
			{
				name: 'decimals',
				data: 1.5,
				valid: true,
			},

			// invalid
			{
				name: 'boolean',
				data: true,
				valid: false,
				errors: [
					{
						code: 'NUMBER_REQUIRED',
						path: ['$'],
					},
				],
			},
			{
				name: 'non-empty string',
				data: 'foo',
				valid: false,
				errors: [
					{
						code: 'NUMBER_REQUIRED',
						path: ['$'],
					},
				],
			},
			{
				name: 'array',
				data: [],
				valid: false,
				errors: [
					{
						code: 'NUMBER_REQUIRED',
						path: ['$'],
					},
				],
			},
			{
				name: 'object',
				data: {},
				valid: false,
				errors: [
					{
						code: 'NUMBER_REQUIRED',
						path: ['$'],
					},
				],
			},
		],
	},
];
