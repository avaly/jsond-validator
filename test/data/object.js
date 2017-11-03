module.exports = [
	{
		name: 'object, empty',
		schema: {},
		jsonschema: {
			type: 'object',
			additionalProperties: false,
		},
		tests: [
			{
				name: 'valid',
				data: {},
				valid: true,
			},
			{
				name: '1 property',
				data: {
					name: 'Lorem',
				},
				valid: false,
				errors: [
					{
						code: 'OBJECT_PROPERTIES_ADDITIONAL',
						path: ['$', 'name'],
					},
				],
			},
			{
				name: 'not an object',
				data: 'Lorem',
				valid: false,
				errors: [
					{
						code: 'OBJECT_REQUIRED',
						path: ['$'],
					},
				],
			},
		],
	},
	{
		name: 'object, 1 property',
		schema: {
			name: 'string',
		},
		jsonschema: {
			type: 'object',
			required: ['name'],
			properties: {
				name: { type: 'string' },
			},
			additionalProperties: false,
		},
		tests: [
			{
				name: 'valid',
				data: {
					name: 'John',
				},
				valid: true,
			},
			{
				name: '1 property type mismatch',
				data: {
					name: 123,
				},
				valid: false,
				errors: [
					{
						code: 'STRING_REQUIRED',
						path: ['$', 'name'],
					},
				],
			},
		],
	},
	{
		name: 'object, 3 properties',
		schema: {
			name: 'a(b|c)',
			age: '[20,99)',
			manager: 'boolean',
		},
		jsonschema: {
			type: 'object',
			required: ['name', 'age', 'manager'],
			properties: {
				name: { type: 'string' },
				age: { type: 'number', minimum: 20 },
				manager: { type: 'boolean' },
			},
			additionalProperties: false,
		},
		tests: [
			{
				name: 'valid',
				data: {
					name: 'ab',
					age: 35,
					manager: false,
				},
				valid: true,
			},
			{
				name: '1 property failed',
				data: {
					name: 'ab',
					age: 19,
					manager: false,
				},
				valid: false,
				errors: [
					{
						code: 'INTERVAL_START',
						path: ['$', 'age'],
					},
				],
			},
		],
	},
	{
		name: 'object, 2 properties, 1 optional, both',
		schema: {
			name: 'lorem',
			'location?': 'number',
		},
		jsonschema: {
			type: 'object',
			required: ['name'],
			properties: {
				name: { type: 'string' },
				location: { type: 'number' },
			},
			additionalProperties: false,
		},
		tests: [
			{
				name: 'both',
				data: {
					name: 'lorem',
					location: 12.34,
				},
				valid: true,
			},
			{
				name: 'only required',
				data: {
					name: 'lorem',
				},
				valid: true,
			},
			{
				name: 'only optional',
				data: {
					location: 12.34,
				},
				valid: false,
				errors: [
					{
						code: 'OBJECT_PROPERTY_REQUIRED',
						path: ['$', 'name'],
					},
				],
			},
		],
	},
	{
		name: 'object, nested object',
		schema: {
			name: 'string',
			address: {
				street: 'string',
				number: 'integer',
			},
		},
		jsonschema: {
			type: 'object',
			required: ['name', 'address'],
			properties: {
				name: { type: 'string' },
				address: {
					type: 'object',
					required: ['street', 'number'],
					properties: {
						street: { type: 'string' },
						number: { type: 'number' },
					},
					additionalProperties: false,
				},
			},
			additionalProperties: false,
		},
		tests: [
			{
				name: 'valid',
				data: {
					name: 'John',
					address: {
						street: 'Main St.',
						number: 123,
					},
				},
				valid: true,
			},
			{
				name: 'nested object mismatch',
				data: {
					name: 'John',
					address: {
						street: 'Main St.',
						number: 'Lorem',
					},
				},
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: ['$', 'address', 'number'],
					},
				],
			},
		],
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
			nickname: '^(foo|bar|ham)$',
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
					nickname: 'bar',
				},
				valid: true,
			},
			{
				name: 'invalid, null regexp field',
				data: {
					name: 'John',
					manager: true,
					age: 34,
					performance: -12.5,
					range: 15,
					specific: 9,
					nickname: null,
				},
				valid: false,
				errors: [
					{
						code: 'STRING_PATTERN',
						path: ['$', 'nickname'],
					},
				],
			},
		],
	},
];
