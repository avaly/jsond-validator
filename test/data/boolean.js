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
				valid: false,
				errors: [
					{
						code: 'BOOLEAN_REQUIRED',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'number 0',
				data: 0,
				valid: false,
				errors: [
					{
						code: 'BOOLEAN_REQUIRED',
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
						code: 'BOOLEAN_REQUIRED',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'empty string',
				data: '',
				valid: false,
				errors: [
					{
						code: 'BOOLEAN_REQUIRED',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'empty array',
				data: [],
				valid: false,
				errors: [
					{
						code: 'BOOLEAN_REQUIRED',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'empty object',
				data: {},
				valid: false,
				errors: [
					{
						code: 'BOOLEAN_REQUIRED',
						path: [ '$' ]
					}
				]
			}
		]
	}
];
