/**
 * @flow weak
 */

var after = require('./templates/after');
var any = require('./templates/any');
var before = require('./templates/before');
var error = require('./templates/error');
var logger = require('./logger');

function Compiler(schema) {
	this.src = [];
	this.data = [];
	this.path = [];
	this.vars = {};
	this.start(schema);
}

Compiler.prototype = {
	generate: function() {
		var src = this.src.join('\n');
		// src = require('prettier').format(src, {
		// 	useTabs: true,
		// 	singleQuote: true,
		// });

		_DEBUG_ && logger(src);

		var fn = new Function('data', src);

		return fn;
	},

	start: function(schema) {
		before(this);
		this.stack(JSON.stringify('$'), 'data');
		this.visit(schema);
		after(this);
	},

	stack: function(pathKey, dataKey) {
		this.path.push(pathKey);
		this.data.push(dataKey === 'data' ? dataKey : '[' + dataKey + ']');
	},

	visit: function(schema) {
		any(this, schema);
	},

	error: function(code, keyAtCompile, keyAtRuntime) {
		var path = []
			.concat(this.path)
			.concat(typeof keyAtCompile === 'undefined' ? [] : [keyAtCompile]);

		error(this, code, path, keyAtRuntime);
	},

	var: function(name) {
		if (!this.vars[name]) {
			this.vars[name] = 0;
		}
		this.vars[name]++;
		return name + this.vars[name];
	},

	pop: function() {
		this.data.pop();
		this.path.pop();
	},

	add: function(code) {
		var currentDataPath = this.data.join('');
		var params = Array.prototype.slice.call(arguments, 1);
		this.src.push(
			code.replace(/%s/g, currentDataPath).replace(/%p/g, function() {
				return params.shift();
			})
		);
	},
};

Compiler.compile = function(schema) {
	_DEBUG_ && logger('compile', schema);
	var compiler = new Compiler(schema);
	return compiler.generate();
};

module.exports = Compiler;
