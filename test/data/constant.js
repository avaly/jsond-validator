module.exports = [
	{
		name: 'boolean, true',
		schema: true,
		tests: [
			// valid
			{
				name: 'true',
				data: true,
				valid: true
			},
			// invalid
			{
				name: 'false',
				data: false,
				valid: false,
				errors: [
					{
						code: 'CONSTANT',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'integer',
				data: 1,
				valid: false,
				errors: [
					{
						code: 'CONSTANT',
						path: [ '$' ]
					}
				]
			}
		]
	},
	{
		name: 'number, -1',
		schema: -1,
		tests: [
			// valid
			{
				name: '-1',
				data: -1,
				valid: true
			},
			// invalid
			{
				name: '1',
				data: 1,
				valid: false,
				errors: [
					{
						code: 'CONSTANT',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'string',
				data: '-1',
				valid: false,
				errors: [
					{
						code: 'CONSTANT',
						path: [ '$' ]
					}
				]
			}
		]
	},
	{
		name: 'complex object',
		schema: {
			id: 'integer',
			tag: 123,
			name: 'lorem',
			active: false
		},
		tests: [
			// valid
			{
				name: 'valid',
				data: {
					id: 123456,
					tag: 123,
					name: 'lorem',
					active: false
				},
				valid: true
			},
			// invalid
			{
				name: 'invalid id',
				data: {
					id: '123456',
					tag: 123,
					name: 'lorem',
					active: false
				},
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: [ '$', 'id' ]
					}
				]
			},
			{
				name: 'invalid tag',
				data: {
					id: 123456,
					tag: 1234,
					name: 'lorem',
					active: false
				},
				valid: false,
				errors: [
					{
						code: 'CONSTANT',
						path: [ '$', 'tag' ]
					}
				]
			},
			{
				name: 'invalid name',
				data: {
					id: 123456,
					tag: 123,
					name: 'wrong',
					active: false
				},
				valid: false,
				errors: [
					{
						code: 'STRING_PATTERN',
						path: [ '$', 'name' ]
					}
				]
			},
			{
				name: 'invalid active',
				data: {
					id: 123456,
					tag: 123,
					name: 'lorem',
					active: true
				},
				valid: false,
				errors: [
					{
						code: 'CONSTANT',
						path: [ '$', 'active' ]
					}
				]
			}
		]
	}
];
