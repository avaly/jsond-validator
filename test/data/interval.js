module.exports = [
	{
		name: 'interval, inclusive start, inclusive end',
		schema: '[2,5]',
		tests: [
			{
				name: 'value is start',
				data: 2,
				valid: true
			},
			{
				name: 'value is middle',
				data: 3,
				valid: true
			},
			{
				name: 'value is end',
				data: 5,
				valid: true
			},
			{
				name: 'value is start - 1',
				data: 1,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_START',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'value is end + 1',
				data: 6,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_END',
						path: [ '$' ]
					}
				]
			}
		]
	},
	{
		name: 'interval, inclusive start, exclusive end',
		schema: '[2,5)',
		tests: [
			{
				name: 'value is start',
				data: 2,
				valid: true
			},
			{
				name: 'value is end - 1',
				data: 4,
				valid: true
			},
			{
				name: 'value is start - 1',
				data: 1,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_START',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'value is end',
				data: 5,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_END',
						path: [ '$' ]
					}
				]
			}
		]
	},
	{
		name: 'interval, exclusive start, inclusive end',
		schema: '(2,5]',
		tests: [
			{
				name: 'value is start + 1',
				data: 3,
				valid: true
			},
			{
				name: 'value is end',
				data: 5,
				valid: true
			},
			{
				name: 'value is start',
				data: 2,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_START',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'value is end + 1',
				data: 6,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_END',
						path: [ '$' ]
					}
				]
			}
		]
	},
	{
		name: 'interval, inclusive start, open end',
		schema: '[2,)',
		tests: [
			{
				name: 'value is Infinity',
				data: Infinity,
				valid: true
			},
			{
				name: 'value is start - 1',
				data: 1,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_START',
						path: [ '$' ]
					}
				]
			}
		]
	},
	{
		name: 'interval, open start, inclusive end',
		schema: '(,2]',
		tests: [
			{
				name: 'value is -Infinity',
				data: -Infinity,
				valid: true
			},
			{
				name: 'value is end + 1',
				data: 3,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_END',
						path: [ '$' ]
					}
				]
			}
		]
	},
	{
		name: 'interval, number, inclusive start, inclusive end',
		schema: '[1.33,5]',
		tests: [
			{
				name: 'value is start',
				data: 1.33,
				valid: true
			},
			{
				name: 'value is start - 0.001',
				data: 1.329,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_START',
						path: [ '$' ]
					}
				]
			},
			{
				name: 'value is end + 0.001',
				data: 5.001,
				valid: false,
				errors: [
					{
						code: 'INTERVAL_END',
						path: [ '$' ]
					}
				]
			}
		]
	}
];
