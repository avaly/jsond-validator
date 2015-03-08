module.exports = [
	// valid
	{
		name: 'set, 1 value',
		schema: '{1}',
		data: 1,
		valid: true
	},
	{
		name: 'set, 2 values',
		schema: '{1,2}',
		data: 2,
		valid: true
	},
	{
		name: 'set, 3 values, number',
		schema: '{1,2,3.5}',
		data: 3.5,
		valid: true
	},
	{
		name: 'set, 4 values, negative numbers',
		schema: '{-5,-2,-1.5,0}',
		data: -2,
		valid: true
	},

	// invalid
	{
		name: 'set, 1 value, no match',
		schema: '{1}',
		data: 2,
		valid: false
	},
	{
		name: 'set, 3 values, number, no match',
		schema: '{1,2,3.5}',
		data: 4.2,
		valid: false
	},
	{
		name: 'set, 4 values, negative numbers, no match',
		schema: '{-5,-2,-1.5,0}',
		data: -1.1,
		valid: false
	}
];
