(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['jsond-validator'] = factory());
}(this, (function () { 'use strict';

/**
 * @flow
 */

var JSOND_BOOLEAN = 'boolean';
var JSOND_STRING = 'string';
var JSOND_NUMBER = 'number';
var JSOND_INTEGER = 'integer';
var JSON_NUMBER = '\\-?(?:0|[1-9]\\d*)(?:\\.\\d+)?';
var JSOND_SET_PATTERN = new RegExp(
		'^\{(' + JSON_NUMBER + '(,' + JSON_NUMBER + ')*)\}$'
	);
var JSOND_INTERVAL_PATTERN = new RegExp(
		'^(\\[|\\()(' + JSON_NUMBER + ')?,(' + JSON_NUMBER + ')?(\\]|\\))$'
	);
var JSOND_OPTIONAL_PATTERN = /\?$/;

/**
 * Validates whether a given data object is a valid boolean value
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateBoolean(data, path) {
	

	if (typeof data !== 'boolean') {
		return [
			{
				code: 'BOOLEAN_REQUIRED',
				path: [].concat(path),
			},
		];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid string value
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateString(data, path) {
	

	if (typeof data !== 'string') {
		return [
			{
				code: 'STRING_REQUIRED',
				path: [].concat(path),
			},
		];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid number value
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateNumber(data, path) {
	

	if (typeof data !== 'number') {
		return [
			{
				code: 'NUMBER_REQUIRED',
				path: [].concat(path),
			},
		];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid integer value
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateInteger(data, path) {
	

	if (typeof data !== 'number' || data < 0 || data % 1 !== 0) {
		return [
			{
				code: 'INTEGER_REQUIRED',
				path: [].concat(path),
			},
		];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid special value,
 * which can be a set, an interval or a regular expression.
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateSpecial(data, schema, path) {
	var parsed;

	

	parsed = schema.match(JSOND_SET_PATTERN);
	if (parsed) {
		return validateSet(data, schema, parsed, path);
	} else {
		parsed = schema.match(JSOND_INTERVAL_PATTERN);
		if (parsed) {
			return validateInterval(data, schema, parsed, path);
		} else {
			return validateRegularExpression(data, schema, path);
		}
	}
}

/**
 * Validates whether a given data object is a valid set value
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Mixed} parsed The result of the schema parsing by regex
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateSet(data, schema, parsed, path) {
	var values = parsed[1].split(','), dataStringified = String(data), errors;

	errors = validateNumber(data);

	

	if (!errors.length && values.indexOf(dataStringified) === -1) {
		errors = [
			{
				code: 'NOT_IN_SET',
				path: [].concat(path),
			},
		];
	}

	return errors;
}

/**
 * Validates whether a given data object is a valid interval value
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Mixed} parsed The result of the schema parsing by regex
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateInterval(data, schema, parsed, path) {
	var startInclusive = parsed[1] === '[',
		endInclusive = parsed[4] === ']',
		start,
		end,
		valid,
		errors;

	

	errors = validateNumber(data);

	// interval start
	if (!errors.length && parsed[2] && parsed[2].length) {
		start = Number(parsed[2]);
		valid = false;

		if (startInclusive) {
			valid = data >= start;
		} else {
			valid = data > start;
		}

		if (!valid) {
			errors = [
				{
					code: 'INTERVAL_START',
					path: [].concat(path),
				},
			];
		}
	}

	// interval end
	if (!errors.length && parsed[3] && parsed[3].length) {
		end = Number(parsed[3]);
		valid = false;

		if (endInclusive) {
			valid = data <= end;
		} else {
			valid = data < end;
		}

		if (!valid) {
			errors = [
				{
					code: 'INTERVAL_END',
					path: [].concat(path),
				},
			];
		}
	}

	return errors;
}

/**
 * Validates whether a given data object is a valid regular expression value
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateRegularExpression(data, schema, path) {
	var pattern;

	if (schema[0] !== '^') {
		schema = '^' + schema;
	}
	if (schema[schema.length - 1] !== '$') {
		schema = schema + '$';
	}
	pattern = new RegExp(schema);

	

	if (!pattern.test(data)) {
		return [
			{
				code: 'STRING_PATTERN',
				path: [].concat(path),
			},
		];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid constant value
 *
 * @private
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary constant value
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An errors list
 */
function validateConstant(data, schema, path) {
	

	if (data !== schema) {
		return [
			{
				code: 'CONSTANT',
				path: [].concat(path),
			},
		];
	}

	return [];
}

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
	var schemaData = getSchemaByRef(schema, schemas), dereferenced;

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
}

JSONDValidator.prototype = {
	/**
	 * Adds a schema definition for references lookup
	 *
	 * @example
	 * var validator = new JSONDValidator();
	 * validator.addSchema('http://foo.com/id.json', 'integer')
	 *
	 * @param {String} id     A JSOND schema identifier
	 * @param {Mixed}  schema An arbitrary JSOND text
	 */
	addSchema: function(id, schema) {
		this.schemas[id] = schema;
	},

	/**
	 * Returns the dereferenced schema for the given ID.
	 * The dereferenced schema contains the resolved references based on
	 * the interal schema map.
	 *
	 * @param {String} id     A JSOND schema identifier
	 *
	 * @return {Object}
	 */
	getDereferencedSchema: function(id) {
		return dereferenceSchema(this.schemas[id], this.schemas);
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
	 * @param  {Mixed} data   An arbitrary data object
	 * @param  {Mixed} schema An arbitrary JSOND text or reference
	 *
	 * @return {Object}
	 */
	validate: function(data, schema) {
		var self = this,
			result = {
				valid: true,
				errors: [],
			},
			errors;

		self.path = ['$'];
		errors = self.validateRoot(data, schema);

		if (errors.length) {
			result.valid = false;
			result.errors = [].concat(errors);
		}

		return result;
	},

	/**
	 * Validates a given data object according to a given schema
	 *
	 * @private
	 *
	 * @param  {Mixed} data   An arbitrary data object
	 * @param  {Mixed} schema An arbitrary JSOND text or reference
	 *
	 * @return {Object}       An errors list
	 */
	validateRoot: function(data, schema) {
		var self = this,
			path = self.path,
			schemaData = getSchemaByRef(schema, self.schemas),
			errors;

		

		if (Array.isArray(schemaData)) {
			errors = self.validateArray(data, schemaData);
		} else if (isPlainObject(schemaData)) {
			errors = self.validateObject(data, schemaData);
		} else {
			if (schemaData === JSOND_BOOLEAN) {
				errors = validateBoolean(data, path);
			} else if (schemaData === JSOND_NUMBER) {
				errors = validateNumber(data, path);
			} else if (schemaData === JSOND_INTEGER) {
				errors = validateInteger(data, path);
			} else if (schemaData === JSOND_STRING) {
				errors = validateString(data, path);
			} else if (typeof schemaData === 'string') {
				errors = validateSpecial(data, schemaData, path);
			} else {
				errors = validateConstant(data, schemaData, path);
			}
		}

		if (errors.length) {
			
		}

		return errors;
	},

	/**
	 * Validates whether a given data object is a valid array value
	 *
	 * @private
	 *
	 * @param  {Mixed} data   An arbitrary data object
	 * @param  {Mixed} schema An arbitrary JSOND text
	 *
	 * @return {Object}       An errors list
	 */
	validateArray: function(data, schema) {
		var self = this, errors = [], di, dl, si, sl, valid, errs;

		

		if (!Array.isArray(data)) {
			return [
				{
					code: 'ARRAY_REQUIRED',
					path: [].concat(self.path),
				},
			];
		}

		sl = schema.length;

		// Using `for` due to speed over native `forEach` or `reduce`
		for ((di = 0), (dl = data.length); di < dl; di++) {
			valid = false;

			self.path.push(di);

			for (si = 0; si < sl; si++) {
				errs = self.validateRoot(data[di], schema[si]);
				if (!errs.length) {
					valid = true;
					break;
				}
			}

			if (!valid) {
				// If there are multiple definitions for an array item
				// we have to return a generic error
				if (sl > 1) {
					errors.push({
						code: 'ARRAY_ITEM',
						path: [].concat(self.path),
					});
				} else {
					// Otherwise we can safely return the error that
					// caused the validation to fail
					errors = errors.concat(errs);
				}
			}

			self.path.pop();
		}

		return errors;
	},

	/**
	 * Validates whether a given data object is a valid object value
	 *
	 * @private
	 *
	 * @param  {Mixed} data   An arbitrary data object
	 * @param  {Mixed} schema An arbitrary JSOND text
	 *
	 * @return {Object}       An errors list
	 */
	validateObject: function(data, schema) {
		var self = this,
			errors = [],
			keysData = Object.keys(data),
			keysSchema = Object.keys(schema),
			l = keysSchema.length,
			keySchema,
			keyData,
			keyIndex,
			optional,
			errs,
			i;

		

		for (i = 0; i < l; i++) {
			keyData = keySchema = keysSchema[i];
			optional = keySchema.match(JSOND_OPTIONAL_PATTERN);
			if (optional) {
				keyData = keyData.replace(JSOND_OPTIONAL_PATTERN, '');
			}
			keyIndex = keysData.indexOf(keyData);
			errs = [];

			self.path.push(keySchema);
			if (keyIndex === -1 && !optional) {
				errors.push({
					code: 'OBJECT_PROPERTY_REQUIRED',
					path: [].concat(self.path),
				});
			} else if (keyIndex !== -1) {
				errs = self.validateRoot(data[keyData], schema[keySchema]);
				if (errs.length) {
					errors = errors.concat(errs);
				}
				keysData.splice(keyIndex, 1);
			}
			self.path.pop();
		}

		if (keysData.length) {
			keysData.forEach(function(key) {
				errors.push({
					code: 'OBJECT_PROPERTIES_ADDITIONAL',
					path: [].concat(self.path, key),
				});
			});
		}

		return errors;
	},
};

var index$2 = JSONDValidator;

var index = index$2;

return index;

})));
