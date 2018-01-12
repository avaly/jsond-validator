(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['jsond-validator'] = factory());
}(this, (function () { 'use strict';

/**
 * @flow weak
 */

function after(compiler) {
	compiler.add('return E');
}

var after_1 = after;

/**
 * @flow weak
 */

function array(compiler, schema) {
	if (!Array.isArray(schema)) {
		return;
	}

	var index = compiler.var('i');

	compiler.add('if(!Array.isArray(%s))');
	compiler.error('ARRAY_REQUIRED');
	compiler.add('else');

	compiler.add('for(var %p=0;%p<%s.length;%p++){', index, index, index);
	if (schema.length) {
		compiler.stack(index, index);
		compiler.visit(schema[0]);
		compiler.pop();
	}
	compiler.add('}');
}

var array_1 = array;

/**
 * @flow weak
 */

var NUMBER = '\\-?(?:0|[1-9]\\d*)(?:\\.\\d+)?';

var patterns = {
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

/**
 * @flow weak
 */



function boolean(compiler, schema) {
	if (schema !== patterns.boolean) {
		return;
	}

	compiler.add('if(typeof %s!=="boolean")');
	compiler.error('BOOLEAN_REQUIRED');
}

var boolean_1 = boolean;

/**
 * @flow weak
 */

function varant(compiler, schema) {
	compiler.add('if(%s!==%p)', JSON.stringify(schema));
	compiler.error('CONSTANT');
}

var constant = varant;

/**
 * @flow weak
 */



function integer(compiler, schema) {
	if (schema !== patterns.integer) {
		return;
	}

	compiler.add('if(typeof %s!=="number"||%s<0||%s%1!==0)');
	compiler.error('INTEGER_REQUIRED');
}

var integer_1 = integer;

/**
 * @flow weak
 */



function number(compiler, schema) {
	if (schema !== patterns.number) {
		return;
	}

	compiler.add('if(typeof %s!=="number")');
	compiler.error('NUMBER_REQUIRED');
}

var number_1 = number;

/**
 * @flow weak
 */



function object(compiler, schema) {
	if (typeof schema !== 'object') {
		return;
	}

	compiler.add('if(typeof %s!=="object")');
	compiler.error('OBJECT_REQUIRED');
	compiler.add('else {');

	var required = {};
	var keys = Object.keys(schema).map(function(key) {
		var keyName = key.replace(patterns.optional, '');
		required[keyName] = key === keyName;
		return keyName;
	});

	for (var keyIndex = 0, length = keys.length; keyIndex < length; keyIndex++) {
		var key = keys[keyIndex];
		if (required[key]) {
			compiler.add('if(!%s.hasOwnProperty("%p"))', key);
			compiler.error('OBJECT_PROPERTY_REQUIRED', JSON.stringify(key));
			compiler.add('else {');
			compiler.stack(JSON.stringify(key), "'" + key + "'");
			compiler.visit(schema[key]);
			compiler.pop();
			compiler.add('}');
		} else {
			compiler.add('if(%s.hasOwnProperty("%p"))', key);
			compiler.stack(JSON.stringify(key), "'" + key + "'");
			compiler.visit(schema[key + '?']);
			compiler.pop();
		}
	}

	var keysData = compiler.var('k');
	var index = compiler.var('i');
	var keysComparators = keys.map(function(key) {
		return keysData + '[' + index + ']!=="' + key + '"';
	});
	var condition = keys.length ? keysComparators.join('&&') : 'true';

	compiler.add('var %p=Object.keys(%s)', keysData);
	compiler.add(
		'for(var %p=0;%p<%p.length;%p++){',
		index,
		index,
		keysData,
		index
	);
	compiler.add('if(%p)', condition);
	compiler.error(
		'OBJECT_PROPERTIES_ADDITIONAL',
		undefined,
		keysData + '[' + index + ']'
	);
	compiler.add('}');

	compiler.add('}');
}

var object_1 = object;

/**
 * @flow weak
 */




function interval(compiler, schema, parsed) {
	if (typeof schema !== 'string') {
		return;
	}

	number_1(compiler, patterns.number);

	var start = parsed[2] && parsed[2].length ? Number(parsed[2]) : null;
	var end = parsed[3] && parsed[3].length ? Number(parsed[3]) : null;
	var startComparator = parsed[1] === '[' ? '<' : '<=';
	var endComparator = parsed[4] === ']' ? '>' : '>=';

	if (start) {
		compiler.add('if(%s%p%p)', startComparator, start);
		compiler.error('INTERVAL_START');
	}
	if (end) {
		compiler.add('if(%s%p%p)', endComparator, end);
		compiler.error('INTERVAL_END');
	}
}

var interval_1 = interval;

/**
 * @flow weak
 */




function set(compiler, schema, parsed) {
	if (typeof schema !== 'string') {
		return;
	}

	number_1(compiler, patterns.number);

	var values = parsed[1].split(',').map(function(n) {
		return parseFloat(n);
	});

	compiler.add('if(%p.indexOf(%s)===-1)', JSON.stringify(values));
	compiler.error('NOT_IN_SET');
}

var set_1 = set;

/**
 * @flow weak
 */

function set$1(compiler, schema) {
	if (typeof schema !== 'string') {
		return;
	}

	var pattern = schema;
	if (pattern[0] !== '^') {
		pattern = '^' + pattern;
	}
	if (pattern[pattern.length - 1] !== '$') {
		pattern = pattern + '$';
	}
	pattern = pattern.replace(/\//g, '\\/');

	compiler.add('if(typeof %s!=="string")');
	compiler.error('STRING_PATTERN');
	compiler.add('else if(!/%p/.test(%s))', pattern);
	compiler.error('STRING_PATTERN');
}

var regexp = set$1;

/**
 * @flow weak
 */






function special(compiler, schema) {
	if (typeof schema !== 'string') {
		return;
	}

	var next;
	var parsed = schema.match(patterns.set);
	if (parsed) {
		next = set_1;
	} else {
		parsed = schema.match(patterns.interval);
		if (parsed) {
			next = interval_1;
		} else {
			next = regexp;
		}
	}

	next(compiler, schema, parsed);
}

var special_1 = special;

/**
 * @flow weak
 */



function string(compiler, schema) {
	if (schema !== patterns.string) {
		return;
	}

	compiler.add('if(typeof %s!=="string")');
	compiler.error('STRING_REQUIRED');
}

var string_1 = string;

/**
 * @flow weak
 */











function any(compiler, schema) {
	var next;
	if (Array.isArray(schema)) {
		next = array_1;
	} else if (typeof schema === 'object') {
		next = object_1;
	} else if (schema === patterns.boolean) {
		next = boolean_1;
	} else if (schema === patterns.number) {
		next = number_1;
	} else if (schema === patterns.integer) {
		next = integer_1;
	} else if (schema === patterns.string) {
		next = string_1;
	} else if (typeof schema === 'string') {
		next = special_1;
	} else {
		next = constant;
	}

	next(compiler, schema);
}

var any_1 = any;

/**
 * @flow weak
 */

function before(compiler) {
	// Errors
	compiler.add('var E=[]');
}

var before_1 = before;

/**
 * @flow weak
 */

function error(compiler, code, path, keyAtRuntime) {
	var pathValue =
		'[' +
		path.join(',') +
		']' +
		(keyAtRuntime ? '.concat([' + keyAtRuntime + '])' : '');

	compiler.add('E.push({code:%p,path:%p})', JSON.stringify(code), pathValue);
}

var error_1 = error;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/* istanbul ignore if */
if (process.env.DEBUG) {
	commonjsGlobal._DEBUG_ = true;
	
}

if (typeof commonjsGlobal._DEBUG_ === 'undefined') {
	commonjsGlobal._DEBUG_ = false;
}

/**
 * @flow weak
 */







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

		

		var fn = new Function('data', src);

		return fn;
	},

	start: function(schema) {
		before_1(this);
		this.stack(JSON.stringify('$'), 'data');
		this.visit(schema);
		after_1(this);
	},

	stack: function(pathKey, dataKey) {
		this.path.push(pathKey);
		this.data.push(dataKey === 'data' ? dataKey : '[' + dataKey + ']');
	},

	visit: function(schema) {
		any_1(this, schema);
	},

	error: function(code, keyAtCompile, keyAtRuntime) {
		var path = []
			.concat(this.path)
			.concat(typeof keyAtCompile === 'undefined' ? [] : [keyAtCompile]);

		error_1(this, code, path, keyAtRuntime);
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
	
	var compiler = new Compiler(schema);
	return compiler.generate();
};

var Compiler_1 = Compiler;

/**
 * @flow
 */

/**
 * @private
 */




/**
 * Get a schema definition based on a possible reference
 *
 * @private
 *
 * @param  {Mixed} ref
 * @param  {Object} schemas
 *
 * @return {Mixed}
 */
function getSchemaByRef(ref, schemas) {
	var schema = ref;
	while (typeof schema === 'string' && schemas[schema]) {
		schema = schemas[schema];
	}
	return schema;
}

/**
 * Dereferences a schema definition
 *
 * @private
 *
 * @param  {Mixed} schema
 * @param  {Object} schemas [description]
 *
 * @return {Mixed}
 */
function dereferenceSchema(schema, schemas) {
	var schemaData = getSchemaByRef(schema, schemas);
	var dereferenced;

	if (Array.isArray(schemaData)) {
		dereferenced = schemaData.map(function(item) {
			return dereferenceSchema(item, schemas);
		});
	} else if (isPlainObject(schemaData)) {
		dereferenced = {};
		Object.keys(schemaData).forEach(function(key) {
			dereferenced[key] = dereferenceSchema(schemaData[key], schemas);
		});
	} else {
		dereferenced = schemaData;
	}

	return dereferenced;
}

/**
 * Determines if the input data is a plain object
 *
 * @private
 *
 * @param  {Mixed}  data
 *
 * @return {Boolean}
 */
function isPlainObject(data) {
	return (
		data != null &&
		typeof data === 'object' &&
		!Array.isArray(data) &&
		data.constructor === Object
	);
}

/**
 * The main validator class
 *
 * @constructor
 */
function JSONDValidator() {
	this.schemas = {};
	this.compiled = {};
}

JSONDValidator.prototype = {
	/**
	 * Adds a schema definition for references lookup
	 *
	 * @example
	 * var validator = new JSONDValidator();
	 * validator.addSchema('http://foo.com/id.json', 'integer')
	 * // With lazy mode, schema compilation is done on the first use
	 * validator.addSchema('http://foo.com/id.json', 'integer', true)
	 *
	 * @param {String} schemaID	Schema identifier
	 * @param {Mixed}  schema		An arbitrary JSOND text
	 */
	addSchema: function(schemaID, schema) {
		

		if (
			schemaID === patterns.boolean ||
			schemaID === patterns.integer ||
			schemaID === patterns.number ||
			schemaID === patterns.string
		) {
			throw new Error('Schema IDs should not match any JSOND types');
		}

		this.schemas[schemaID] = schema;

		return this;
	},

	/**
	 * Returns the dereferenced schema for the given ID.
	 * The dereferenced schema contains the resolved references based on
	 * the interal schema map.
	 *
	 * @param {String} schemaID     A JSOND schema identifier
	 *
	 * @return {Object}
	 */
	getDereferencedSchema: function(schemaID) {
		return dereferenceSchema(this.schemas[schemaID], this.schemas);
	},

	/**
	 * Validates a given data object based on a schema definition or identifier.
	 * Returns an object with the following properties:
	 *
	 * - `valid` - boolean result of the validation
	 * - `errors` - list of errors detected at validation
	 *
	 * @example
	 * var validator = new JSONDValidator();
	 * validator.addSchema('http://foo.com/id.json', 'integer');
	 * var result = validator.validate(id, 'http://foo.com/id.json');
	 *
	 * @param  {Mixed} data     An arbitrary data object
	 * @param  {String} schemaID Schema identifier
	 *
	 * @return {Object} { valid: Boolean, errors: Array<Object> }
	 */
	validate: function(data, schemaID) {
		

		if (!this.schemas[schemaID]) {
			return {
				valid: false,
				errors: [
					{
						code: 'NO_SCHEMA',
						path: ['$'],
					},
				],
			};
		}

		if (!this.compiled[schemaID]) {
			var dereferencedSchema = dereferenceSchema(
				this.schemas[schemaID],
				this.schemas
			);
			this.compiled[schemaID] = Compiler_1.compile(dereferencedSchema);
		}

		var errors = this.compiled[schemaID](data);
		

		return {
			valid: errors.length === 0,
			errors: errors,
		};
	},
};

var lib = JSONDValidator;

var jsondValidator = lib;

return jsondValidator;

})));
