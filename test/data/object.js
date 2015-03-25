module.exports = [
	{
		name: 'object, empty',
		schema: {},
		tests: [
			{
				name: 'valid',
				data: {},
				valid: true
			},
			{
				name: '1 property',
				schema: {},
				data: {
					name: 'Lorem'
				},
				valid: false
			}
		]
	},
	{
		name: 'object, 1 property',
		schema: {
			name: 'string'
		},
		tests: [
			{
				name: 'valid',
				data: {
					name: 'John'
				},
				valid: true
			},
			{
				name: '1 property type mismatch',
				data: {
					name: 123
				},
				valid: false
			}
		]
	},
	{
		name: 'object, 3 properties',
		schema: {
			name: 'a(b|c)',
			age: '[20,99)',
			manager: 'boolean'
		},
		tests: [
			{
				name: 'valid',
				data: {
					name: 'ab',
					age: 35,
					manager: false
				},
				valid: true
			},
			{
				name: '1 property failed',
				data: {
					name: 'ab',
					age: 19,
					manager: false
				},
				valid: false
			}
		]
	},
	{
		name: 'object, 2 properties, 1 optional, both',
		schema: {
			name: 'lorem',
			'location?': 'number'
		},
		tests: [
			{
				name: 'both',
				data: {
					name: 'lorem',
					location: 12.34
				},
				valid: true
			},
			{
				name: 'only required',
				data: {
					name: 'lorem'
				},
				valid: true
			},
			{
				name: 'only optional',
				data: {
					location: 12.34
				},
				valid: false
			}
		]
	},
	{
		name: 'object, nested object',
		schema: {
			name: 'string',
			address: {
				street: 'string',
				number: 'integer'
			}
		},
		tests: [
			{
				name: 'valid',
				data: {
					name: 'John',
					address: {
						street: 'Main St.',
						number: 123
					}
				},
				valid: true
			},
			{
				name: 'nested object mismatch',
				data: {
					name: 'John',
					address: {
						street: 'Main St.',
						number: 'Lorem'
					}
				},
				valid: false
			}
		]
	},
	{
		name: 'object, all types',
		schema: {
			name: 'string',
			manager: 'boolean',
			age: 'integer',
			performance: 'number',
			range: '[10,20]',
			specific: '{1,5,9}',
			nickname: '^(foo|bar|ham)$'
		},
		tests: [
			{
				name: 'valid',
				data: {
					name: 'John',
					manager: true,
					age: 34,
					performance: -12.5,
					range: 15,
					specific: 9,
					nickname: 'bar'
				},
				valid: true
			}
		]
	}
];
