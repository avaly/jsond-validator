var JSOND_BOOLEAN = 'boolean',
	JSOND_STRING = 'string',
	JSOND_NUMBER = 'number',
	JSOND_INTEGER = 'integer',
	JSON_NUMBER = '\\-?(?:0|[1-9]\\d*)(?:\\.\\d+)?',
	JSOND_SET_PATTERN = new RegExp('^\{(' + JSON_NUMBER + '(,' + JSON_NUMBER + ')*)\}$'),
	JSOND_INTERVAL_PATTERN = new RegExp(
		'^(\\[|\\()(' + JSON_NUMBER + ')?,(' + JSON_NUMBER + ')?(\\]|\\))$'
	),
	JSOND_OPTIONAL_PATTERN = /\?$/,
	debug = require('debug')('jsond-validator');

/**
 * Validates whether a given data object is a valid boolean value
 *
 * @param  {Mixed} data   An arbitrary data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateBoolean(data) {
	debug('validateBoolean', data);

	if (typeof data !== 'boolean') {
		return {
			code: 'BOOLEAN_REQUIRED',
			path: '.' // TODO
		};
	}

	return null;
}

/**
 * Validates whether a given data object is a valid string value
 *
 * @param  {Mixed} data   An arbitrary data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateString(data) {
	debug('validateString', data);

	if (typeof data !== 'string') {
		return {
			code: 'STRING_REQUIRED',
			path: '.' // TODO
		};
	}

	return null;
}

/**
 * Validates whether a given data object is a valid number value
 *
 * @param  {Mixed} data   An arbitrary data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateNumber(data) {
	debug('validateNumber', data, typeof data);

	if (typeof data !== 'number') {
		return {
			code: 'NUMBER_REQUIRED',
			path: '.' // TODO
		};
	}

	return null;
}

/**
 * Validates whether a given data object is a valid integer value
 *
 * @param  {Mixed} data   An arbitrary data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateInteger(data) {
	debug('validateInteger', data, typeof data);

	if (typeof data !== 'number' || data < 0 || data % 1 !== 0) {
		return {
			code: 'INTEGER_REQUIRED',
			path: '.' // TODO
		};
	}

	return null;
}

/**
 * Validates whether a given data object is a valid special value,
 * which can be a set, an interval or a regular expression.
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateSpecial(data, schema) {
	var parsed;

	debug('validateSpecial', data, schema);

	parsed = schema.match(JSOND_SET_PATTERN);
	if (parsed) {
		return validateSet(data, schema, parsed);
	}
	else {
		parsed = schema.match(JSOND_INTERVAL_PATTERN);
		if (parsed) {
			return validateInterval(data, schema, parsed);
		}
		else {
			return validateRegularExpression(data, schema);
		}
	}
}

/**
 * Validates whether a given data object is a valid set value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Mixed} parsed The result of the schema parsing by regex
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateSet(data, schema, parsed) {
	var values = parsed[1].split(','),
		dataStringified = String(data),
		err;

	err = validateNumber(data);

	debug('validateSet', dataStringified, schema, values);

	if (!err && values.indexOf(dataStringified) === -1) {
		err = {
			code: 'NOT_IN_SET',
			path: '.' // TOOD
		};
	}

	return err;
}

/**
 * Validates whether a given data object is a valid interval value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Mixed} parsed The result of the schema parsing by regex
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateInterval(data, schema, parsed) {
	var startInclusive = (parsed[1] === '['),
		endInclusive = (parsed[4] === ']'),
		start,
		end,
		valid,
		err;

	debug('validateInterval', data, schema, parsed, startInclusive, endInclusive);

	err = validateNumber(data);

	// interval start
	if (!err && parsed[2] && parsed[2].length) {
		start = Number(parsed[2]);
		valid = false;

		if (startInclusive) {
			valid = (data >= start);
		}
		else {
			valid = (data > start);
		}

		if (!valid) {
			err = {
				code: 'INTERVAL_START',
				path: '.' // TODO
			};
		}
	}

	// interval end
	if (!err && parsed[3] && parsed[3].length) {
		end = Number(parsed[3]);
		valid = false;

		if (endInclusive) {
			valid = (data <= end);
		}
		else {
			valid = (data < end);
		}

		if (!valid) {
			err = {
				code: 'INTERVAL_END',
				path: '.' // TODO
			};
		}
	}

	return err;
}

/**
 * Validates whether a given data object is a valid regular expression value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateRegularExpression(data, schema) {
	var pattern;

	if (schema[0] !== '^') {
		schema = '^' + schema;
	}
	if (schema[schema.length - 1] !== '$') {
		schema = schema + '$';
	}
	pattern = new RegExp(schema);

	debug('validateRegularExpression', data, pattern);

	if (!pattern.test(data)) {
		return {
			code: 'STRING_PATTERN',
			path: '.' // TODO
		};
	}

	return null;
}

/**
 * Get a schema definition based on a possible reference
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
 * Determines if the input data is a plain object
 *
 * @param  {Mixed}  data
 *
 * @return {Boolean}
 */
function isPlainObject(data) {
	return (data != null && typeof data === 'object' &&
		!Array.isArray(data) && data.constructor === Object);
}

/**
 * The main validator class
 *
 * @constructor
 */
function Validator() {
	this.schemas = {};
}

module.exports = Validator;

Validator.prototype = {
	/**
	 * Validates a given data object based on a schema
	 *
	 * @param  {Mixed} data
	 * @param  {Mixed} schema
	 *
	 * @return {Object}
	 */
	validate: function(data, schema) {
		var result = {
				valid: true,
				errors: []
			},
			errors;

		errors = this.validateRoot(data, schema);

		if (errors) {
			result.valid = false;
			result.errors = errors;
		}

		return result;
	},

	/**
	 * Adds a schema definition for references lookup
	 *
	 * @param {String} id
	 * @param {Mixed} schema
	 */
	addSchema: function(id, schema) {
		this.schemas[id] = schema;
	},

	/**
	 * Validates a given data object according to a given schema
	 *
	 * @param  {Mixed} data   An arbitrary data object
	 * @param  {Mixed} schema An arbitrary JSOND text
	 *
	 * @return {Object}       An error object, if the validation failed
	 */
	validateRoot: function(data, schema) {
		var self = this,
			schemaData = getSchemaByRef(schema, self.schemas),
			err;

		debug('validateRoot', data, schema, schemaData);

		if (Array.isArray(schemaData)) {
			err = self.validateArray(data, schemaData);
		}
		else if (isPlainObject(schemaData)) {
			err = self.validateObject(data, schemaData);
		}
		else {
			if (schemaData === JSOND_BOOLEAN) {
				err = validateBoolean(data);
			}
			else if (schemaData === JSOND_NUMBER) {
				err = validateNumber(data);
			}
			else if (schemaData === JSOND_INTEGER) {
				err = validateInteger(data);
			}
			else if (schemaData === JSOND_STRING) {
				err = validateString(data);
			}
			else {
				err = validateSpecial(data, schemaData);
			}
		}

		if (err) {
			debug('validateRoot error', err);
		}

		return err;
	},

	/**
	 * Validates whether a given data object is a valid array value
	 *
	 * @param  {Mixed} data   An arbitrary data object
	 * @param  {Mixed} schema An arbitrary JSOND text
	 *
	 * @return {Object}       An error object, if the validation failed
	 */
	validateArray: function(data, schema) {
		var di, dl,
			si, sl,
			valid,
			err;

		debug('validateArray', data, schema);

		if (!Array.isArray(data)) {
			return {
				code: 'ARRAY_REQUIRED',
				path: '.' // TODO
			};
		}

		sl = schema.length;

		// Using `for` due to speed over native `forEach` or `reduce`
		for (di = 0, dl = data.length; di < dl; di++) {
			valid = false;

			for (si = 0; si < sl; si++) {
				err = this.validateRoot(data[di], schema[si]);
				if (!err) {
					valid = true;
					break;
				}
			}

			if (!valid) {
				return {
					code: 'ARRAY_ITEM',
					path: '.' // TODO
				};
			}
		}

		return null;
	},

	/**
	 * Validates whether a given data object is a valid object value
	 *
	 * @param  {Mixed} data   An arbitrary data object
	 * @param  {Mixed} schema An arbitrary JSOND text
	 *
	 * @return {Object}       An error object, if the validation failed
	 */
	validateObject: function(data, schema) {
		var keysData = Object.keys(data),
			keysSchema = Object.keys(schema),
			l = keysSchema.length,
			keySchema,
			keyData,
			keyIndex,
			optional,
			err,
			i;

		debug('validateObject', data, schema);

		for (i = 0; i < l; i++) {
			keyData = keySchema = keysSchema[i];
			optional = keySchema.match(JSOND_OPTIONAL_PATTERN);
			if (optional) {
				keyData = keyData.replace(JSOND_OPTIONAL_PATTERN, '');
			}
			keyIndex = keysData.indexOf(keyData);
			err = null;

			if (keyIndex === -1 && !optional) {
				return {
					code: 'OBJECT_PROPERTY_REQUIRED',
					path: '.' // TODO
				};
			}
			else if (keyIndex !== -1) {
				err = this.validateRoot(data[keyData], schema[keySchema]);
				if (err) {
					return {
						code: 'OBJECT_PROPERTY_MATCH',
						path: '.' // TODO
					};
				}
				keysData.splice(keyIndex, 1);
			}
		}

		if (keysData.length) {
			return {
				code: 'OBJECT_PROPERTIES_ADDITIONAL',
				path: '.' // TODO
			};
		}

		return null;
	}
};
