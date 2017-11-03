/**
 * @flow weak
 */

var NUMBER = '\\-?(?:0|[1-9]\\d*)(?:\\.\\d+)?';

module.exports = {
	boolean: 'boolean',
	integer: 'integer',
	interval: new RegExp(
		'^(\\[|\\()(' + NUMBER + ')?,(' + NUMBER + ')?(\\]|\\))$'
	),
	number: 'number',
	optional: /\?$/,
	set: new RegExp('^{(' + NUMBER + '(,' + NUMBER + ')*)}$'),
	string: 'string',
};
