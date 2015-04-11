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
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'decimals',
				data: 1.5,
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: [ '$' ]
					}
				]
			},

			{
				name: 'boolean',
				data: true,
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'non-empty string',
				data: 'foo',
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'array',
				data: [],
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'object',
				data: {},
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: [ '$' ]
					}
				]
			}
		]
	}
];
