module.exports = [
	// valid
	{
		name: 'interval, inclusive start, inclusive end, value is start',
		schema: '[2,5]',
		data: 2,
		valid: true
	},
	{
		name: 'interval, inclusive start, inclusive end, value is end',
		schema: '[2,5]',
		data: 5,
		valid: true
	},
	{
		name: 'interval, inclusive start, inclusive end, value is middle',
		schema: '[2,5]',
		data: 3,
		valid: true
	},
	{
		name: 'interval, inclusive start, exclusive end, value is start',
		schema: '[2,5)',
		data: 2,
		valid: true
	},
	{
		name: 'interval, inclusive start, exclusive end, value is end - 1',
		schema: '[2,5)',
		data: 4,
		valid: true
	},
	{
		name: 'interval, exclusive start, inclusive end, value is start + 1',
		schema: '(2,5]',
		data: 3,
		valid: true
	},
	{
		name: 'interval, exclusive start, inclusive end, value is end',
		schema: '(2,5]',
		data: 5,
		valid: true
	},
	{
		name: 'interval, inclusive start, open end, value is Infinity',
		schema: '[2,)',
		data: Infinity,
		valid: true
	},
	{
		name: 'interval, open start, inclusive end, value is -Infinity',
		schema: '(,2]',
		data: -Infinity,
		valid: true
	},
	{
		name: 'interval, number, inclusive start, inclusive end, value is start',
		schema: '[1.33,5]',
		data: 1.33,
		valid: true
	},

	// invalid
	{
		name: 'interval, inclusive start, inclusive end, value is start - 1',
		schema: '[2,5]',
		data: 1,
		valid: false
	},
	{
		name: 'interval, inclusive start, inclusive end, value is end + 1',
		schema: '[2,5]',
		data: 6,
		valid: false
	},
	{
		name: 'interval, inclusive start, exclusive end, value is start - 1',
		schema: '[2,5)',
		data: 1,
		valid: false
	},
	{
		name: 'interval, inclusive start, exclusive end, value is end',
		schema: '[2,5)',
		data: 5,
		valid: false
	},
	{
		name: 'interval, exclusive start, inclusive end, value is start',
		schema: '(2,5]',
		data: 2,
		valid: false
	},
	{
		name: 'interval, exclusive start, inclusive end, value is end + 1',
		schema: '(2,5]',
		data: 6,
		valid: false
	},
	{
		name: 'interval, number, inclusive start, inclusive end, value is start - 0.001',
		schema: '[1.33,5]',
		data: 1.329,
		valid: false
	},
	{
		name: 'interval, inclusive start, open end, value is start - 1',
		schema: '[2,)',
		data: 1,
		valid: false
	},
	{
		name: 'interval, open start, inclusive end, value is end + 1',
		schema: '(,2]',
		data: 3,
		valid: false
	},
	{
		name: 'interval, number, inclusive start, inclusive end, value is end + 0.001',
		schema: '[1.33,5]',
		data: 5.001,
		valid: false
	}
];
