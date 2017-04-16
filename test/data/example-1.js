/**
 * Example taken from http://tools.ietf.org/html/draft-oskarsson-jsond-00#appendix-A
 */

module.exports = [
	{
		name: 'example-1',
		schema: [
			{
				id: 'integer',
				slug: 'string',
				url: 'string',
				category: 'integer',
				price: 'number',
				reduced: 'boolean',
			},
		],
		jsonschema: {
			type: 'array',
			items: {
				type: 'object',
				required: ['id', 'slug', 'url', 'category', 'price', 'reduced'],
				properties: {
					id: { type: 'integer' },
					slug: { type: 'string' },
					url: { type: 'string' },
					category: { type: 'integer' },
					price: { type: 'number' },
					reduced: { type: 'boolean' },
				},
				additionalProperties: false,
			},
		},
		tests: [
			{
				name: 'valid',
				data: [
					{
						id: 123,
						slug: 'foo-bar',
						url: 'http://host.com/foo-bar',
						category: 234,
						price: 12.34,
						reduced: false,
					},
					{
						id: 234,
						slug: 'bar',
						url: 'http://host.com/bar-ham',
						category: 234,
						price: 12,
						reduced: true,
					},
					{
						id: 345,
						slug: 'ham',
						url: 'http://t.co',
						category: 345,
						price: 50.1,
						reduced: true,
					},
					{
						id: 45678,
						slug: '',
						url: 'http://example.com',
						category: 45678,
						price: 99,
						reduced: false,
					},
					{
						id: 99999,
						slug: 'bar',
						url: 'http://google.com',
						category: 99999,
						price: 1,
						reduced: false,
					},
				],
				valid: true,
			},
			{
				name: 'property mismatch',
				data: [
					{
						id: 123,
						slug: 'foo-bar',
						url: 'http://host.com/foo-bar',
						category: 234,
						price: 12.34,
						reduced: false,
					},
					{
						id: 234,
						slug: 'bar',
						url: 'http://host.com/bar-ham',
						category: 234.5,
						price: 12,
						reduced: true,
					},
					{
						id: 345,
						slug: 'ham',
						url: 'http://t.co',
						category: 345,
						price: 50.1,
						reduced: true,
					},
					{
						id: 45678,
						slug: '',
						url: 'http://example.com',
						category: 45678,
						price: 99,
						reduced: false,
					},
					{
						id: 99999,
						slug: false,
						url: 'http://google.com',
						category: 99999,
						price: 1,
						reduced: false,
					},
				],
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: ['$', 1, 'category'],
					},
					{
						code: 'STRING_REQUIRED',
						path: ['$', 4, 'slug'],
					},
				],
			},
			{
				name: 'property missing',
				data: [
					{
						id: 123,
						url: 'http://host.com/foo-bar',
						category: 234,
						price: 12.34,
						reduced: false,
					},
					{
						id: 234,
						slug: 'bar',
						url: 'http://host.com/bar-ham',
						category: 234,
						price: 12,
						reduced: true,
					},
					{
						id: 345,
						slug: 'ham',
						url: 'http://t.co',
						category: 345,
						price: 50.1,
						reduced: true,
					},
					{
						id: 45678,
						slug: '',
						url: 'http://example.com',
						category: 45678,
						price: 99,
						reduced: false,
					},
					{
						id: 99999,
						slug: 'bar',
						url: 'http://google.com',
						category: 99999,
						reduced: false,
					},
				],
				valid: false,
				errors: [
					{
						code: 'OBJECT_PROPERTY_REQUIRED',
						path: ['$', 0, 'slug'],
					},
					{
						code: 'OBJECT_PROPERTY_REQUIRED',
						path: ['$', 4, 'price'],
					},
				],
			},
		],
	},
];
