module.exports = [
	{
		name: 'string',
		schema: 'string',
		tests: [
			// valid
			{
				name: 'non-empty string',
				data: 'foo',
				valid: true,
			},
			{
				name: 'empty string',
				data: '',
				valid: true,
			},
			// invalid
			{
				name: 'number',
				data: 1,
				valid: false,
				errors: [
					{
						code: 'STRING_REQUIRED',
						path: ['$'],
					},
				],
			},
			{
				name: 'boolean',
				data: true,
				valid: false,
				errors: [
					{
						code: 'STRING_REQUIRED',
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
						code: 'STRING_REQUIRED',
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
						code: 'STRING_REQUIRED',
						path: ['$'],
					},
				],
			},
		],
	},
];
