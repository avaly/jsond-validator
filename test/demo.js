module.exports = [
	{
		name: 'test1',
		schema: [
			{
				id: 'integer',
				slug: 'string',
				category: 'string',
				price: 'number',
				reduced: 'boolean',
				url: 'string'
			}
		],
		data: [],
		valid: true
	},
	{
		name: 'test2',
		schema: [
			{
				id: 'integer',
				slug: 'string',
				category: 'string',
				price: 'number',
				reduced: 'boolean',
				url: 'string'
			}
		],
		data: [
			{
				id: 123,
				slug: 'test',
				category: 'Lorem',
				price: 200.50,
				reduced: false,
				url: 'none'
			}
		],
		valid: true
	},
	{
		name: 'test3',
		schema: [
			{
				id: 'integer',
				slug: 'string',
				category: 'string',
				price: 'number',
				reduced: 'boolean',
				url: 'string'
			}
		],
		data: [
			{
				id: 'what',
				slug: 123,
				category: '',
				price: 0,
				reduced: true,
				url: ''
			}
		],
		valid: false
	}
];
