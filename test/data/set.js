module.exports = [
	{
		name: 'set, 1 value',
		schema: '{1}',
		tests: [
			{
				name: 'valid',
				data: 1,
				valid: true
			},
			{
				name: 'no match',
				data: 2,
				valid: false
			}
		]
	},
	{
		name: 'set, 2 values',
		schema: '{1,2}',
		tests: [
			{
				name: 'valid',
				data: 2,
				valid: true
			}
		]
	},
	{
		name: 'set, 3 values, number',
		schema: '{1,2,3.5}',
		tests: [
			{
				name: 'valid',
				data: 3.5,
				valid: true
			},
			{
				name: 'no match',
				data: 4.2,
				valid: false
			}
		]
	},
	{
		name: 'set, 4 values, negative numbers',
		schema: '{-5,-2,-1.5,0}',
		tests: [
			{
				name: 'valid',
				data: -2,
				valid: true
			},
			{
				name: 'no match',
				data: -1.1,
				valid: false
			}
		]
	}
];
