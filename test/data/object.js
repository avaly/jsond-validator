module.exports = [
	// valid
	{
		name: 'object, empty',
		schema: {},
		data: {},
		valid: true
	},
	{
		name: 'object, 1 property',
		schema: {
			name: 'string'
		},
		data: {
			name: 'John'
		},
		valid: true
	},
	{
		name: 'object, 3 properties',
		schema: {
			name: 'a(b|c)',
			age: '[20,99)',
			manager: 'boolean'
		},
		data: {
			name: 'ab',
			age: 35,
			manager: false
		},
		valid: true
	},
	{
		name: 'object, 2 properties, 1 optional, both',
		schema: {
			name: 'lorem',
			'location?': 'number'
		},
		data: {
			name: 'lorem',
			location: 12.34
		},
		valid: true
	},
	{
		name: 'object, 2 properties, 1 optional, only required',
		schema: {
			name: 'lorem',
			'location?': 'number'
		},
		data: {
			name: 'lorem'
		},
		valid: true
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
	},

	// invalid
	{
		name: 'object, empty, 1 property',
		schema: {},
		data: {
			name: 'Lorem'
		},
		valid: false
	},
	{
		name: 'object, 1 property, 1 property type mismatch',
		schema: {
			name: 'string'
		},
		data: {
			name: 123
		},
		valid: false
	},
	{
		name: 'object, 3 properties, 1 property failed',
		schema: {
			name: 'a(b|c)',
			age: '[20,99)',
			manager: 'boolean'
		},
		data: {
			name: 'ab',
			age: 19,
			manager: false
		},
		valid: false
	},
	{
		name: 'object, 2 properties, 1 optional, only optional',
		schema: {
			'name?': 'lorem',
			location: 'number'
		},
		data: {
			name: 'lorem'
		},
		valid: false
	},
	{
		name: 'object, nested object, nested object mismatch',
		schema: {
			name: 'string',
			address: {
				street: 'string',
				number: 'integer'
			}
		},
		data: {
			name: 'John',
			address: {
				street: 'Main St.',
				number: 'Lorem'
			}
		},
		valid: false
	}
];
