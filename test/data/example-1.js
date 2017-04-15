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
				],
				valid: false,
				errors: [
					{
						code: 'INTEGER_REQUIRED',
						path: ['$', 1, 'category'],
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
				],
				valid: false,
				errors: [
					{
						code: 'OBJECT_PROPERTY_REQUIRED',
						path: ['$', 0, 'slug'],
					},
				],
			},
		],
	},
];
