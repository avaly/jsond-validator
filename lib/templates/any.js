/**
 * @flow weak
 */

var array = require('./array');
var boolean = require('./boolean');
var constant = require('./constant');
var integer = require('./integer');
var number = require('./number');
var object = require('./object');
var patterns = require('../patterns');
var special = require('./special');
var string = require('./string');

function any(compiler, schema) {
	var next;
	if (Array.isArray(schema)) {
		next = array;
	} else if (typeof schema === 'object') {
		next = object;
	} else if (schema === patterns.boolean) {
		next = boolean;
	} else if (schema === patterns.number) {
		next = number;
	} else if (schema === patterns.integer) {
		next = integer;
	} else if (schema === patterns.string) {
		next = string;
	} else if (typeof schema === 'string') {
		next = special;
	} else {
		next = constant;
	}

	next(compiler, schema);
}

module.exports = any;
