module.exports = [
	{
		name: 'array, strings',
		schema: [
			'string'
		],
		tests: [
			{
				name: 'empty',
				data: [],
				valid: true
			},
			{
				name: '1 string',
				data: [
					'foo'
				],
				valid: true
			},
			{
				name: '2 strings',
				data: [
					'foo',
					'bar'
				],
				valid: true
			},
			{
				name: '1 number',
				data: [
					123
				],
				valid: false
			}
		]
	},

	{
		name: 'array, strings OR number',
		schema: [
			'string',
			'integer'
		],
		tests: [
			{
				name: '3 values',
				data: [
					12,
					'foo',
					45
				],
				valid: true
			},
			{
				name: '1 number',
				data: [
					-45.67
				],
				valid: false
			}
		]
	},

	{
		name: 'array, all simple types',
		schema: [
			'boolean',
			'integer',
			'{-2.5,-1}',
			'[-30,-20)',
			'^ab(c|d)$'
		],
		tests: [
			{
				name: 'all',
				data: [
					-1,
					5,
					'abc',
					200,
					-25,
					false,
					'abd',
					-2.5
				],
				valid: true
			},
			{
				name: 'invalid numberic value',
				data: [
					-50
				],
				valid: false
			},
			{
				name: 'invalid regular expression',
				data: [
					'abe'
				],
				valid: false
			}
		]
	}
];
