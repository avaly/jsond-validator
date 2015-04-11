module.exports = [
	{
		name: 'boolean, true',
		schema: 'true',
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
				valid: false
			},
			{
				name: 'integer',
				data: 1,
				valid: false
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
				valid: false
			},
			{
				name: 'string',
				data: '-1',
				valid: false
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
				valid: false
			},
			{
				name: 'invalid tag',
				data: {
					id: 123456,
					tag: 1234,
					name: 'lorem',
					active: false
				},
				valid: false
			},
			{
				name: 'invalid name',
				data: {
					id: 123456,
					tag: 123,
					name: 'wrong',
					active: false
				},
				valid: false
			},
			{
				name: 'invalid active',
				data: {
					id: 123456,
					tag: 123,
					name: 'lorem',
					active: true
				},
				valid: false
			}
		]
	}
];
