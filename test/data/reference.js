module.exports = [
	{
		name: 'reference, string',
		schemas: {
			'test.jsond': 'string'
		},
		schema: 'test.jsond',
		tests: [
			{
				name: 'valid',
				data: 'foo',
				valid: true
			},
			{
				name: 'invalid',
				data: 123,
				valid: false
			}
		]
	},
	{
		name: 'reference, chained',
		schemas: {
			'http://foo.com/first.jsond': 'http://bar.com/second.jsond',
			'http://bar.com/second.jsond': {
				id: 'http://ham.com/third.jsond'
			},
			'http://ham.com/third.jsond': '^u[0-9]+$'
		},
		schema: 'http://foo.com/first.jsond',
		tests: [
			{
				name: 'valid',
				data: {
					id: 'u12'
				},
				valid: true
			},
			{
				name: 'invalid second ref',
				data: {
					id: 'u12',
					extra: 1
				},
				valid: false
			},
			{
				name: 'invalid third ref',
				data: {
					id: 'u'
				},
				valid: false
			}
		]
	}
];
