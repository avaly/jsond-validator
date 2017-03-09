module.exports = {
	type: 'array',
	items: {
		type: 'object',
		required: [
			'id',
			'slug',
			'url',
			'category',
			'price',
			'reduced'
		],
		properties: {
			id: { type: 'integer' },
			slug: { type: 'string' },
			url: { type: 'string' },
			category: { type: 'integer' },
			price: { type: 'number' },
			reduced: { type: 'boolean' }
		}
	}
};
