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
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateBoolean(data, path) {
	debug('validateBoolean', data, path);

	if (typeof data !== 'boolean') {
		return [{
			code: 'BOOLEAN_REQUIRED',
			path: [].concat(path)
		}];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid string value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateString(data, path) {
	debug('validateString', data, path);

	if (typeof data !== 'string') {
		return [{
			code: 'STRING_REQUIRED',
			path: [].concat(path)
		}];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid number value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateNumber(data, path) {
	debug('validateNumber', data, typeof data, path);

	if (typeof data !== 'number') {
		return [{
			code: 'NUMBER_REQUIRED',
			path: [].concat(path)
		}];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid integer value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateInteger(data, path) {
	debug('validateInteger', data, typeof data, path);

	if (typeof data !== 'number' || data < 0 || data % 1 !== 0) {
		return [{
			code: 'INTEGER_REQUIRED',
			path: [].concat(path)
		}];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid special value,
 * which can be a set, an interval or a regular expression.
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateSpecial(data, schema, path) {
	var parsed;

	debug('validateSpecial', data, schema, typeof schema, path);

	parsed = schema.match(JSOND_SET_PATTERN);
	if (parsed) {
		return validateSet(data, schema, parsed, path);
	}
	else {
		parsed = schema.match(JSOND_INTERVAL_PATTERN);
		if (parsed) {
			return validateInterval(data, schema, parsed, path);
		}
		else {
			return validateRegularExpression(data, schema, path);
		}
	}

	return [];
}

/**
 * Validates whether a given data object is a valid set value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Mixed} parsed The result of the schema parsing by regex
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateSet(data, schema, parsed, path) {
	var values = parsed[1].split(','),
		dataStringified = String(data),
		errors;

	errors = validateNumber(data);

	debug('validateSet', dataStringified, schema, values, path);

	if (!errors.length && values.indexOf(dataStringified) === -1) {
		errors = [{
			code: 'NOT_IN_SET',
			path: [].concat(path)
		}];
	}

	return errors;
}

/**
 * Validates whether a given data object is a valid interval value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Mixed} parsed The result of the schema parsing by regex
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateInterval(data, schema, parsed, path) {
	var startInclusive = (parsed[1] === '['),
		endInclusive = (parsed[4] === ']'),
		start,
		end,
		valid,
		errors;

	debug('validateInterval', data, schema, parsed, startInclusive, endInclusive, path);

	errors = validateNumber(data);

	// interval start
	if (!errors.length && parsed[2] && parsed[2].length) {
		start = Number(parsed[2]);
		valid = false;

		if (startInclusive) {
			valid = (data >= start);
		}
		else {
			valid = (data > start);
		}

		if (!valid) {
			errors = [{
				code: 'INTERVAL_START',
				path: [].concat(path)
			}];
		}
	}

	// interval end
	if (!errors.length && parsed[3] && parsed[3].length) {
		end = Number(parsed[3]);
		valid = false;

		if (endInclusive) {
			valid = (data <= end);
		}
		else {
			valid = (data < end);
		}

		if (!valid) {
			errors = [{
				code: 'INTERVAL_END',
				path: [].concat(path)
			}];
		}
	}

	return errors;
}

/**
 * Validates whether a given data object is a valid regular expression value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary JSOND text
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
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

	debug('validateRegularExpression', data, pattern, path);

	if (!pattern.test(data)) {
		return [{
			code: 'STRING_PATTERN',
			path: [].concat(path)
		}];
	}

	return [];
}

/**
 * Validates whether a given data object is a valid constant value
 *
 * @param  {Mixed} data   An arbitrary data object
 * @param  {Mixed} schema An arbitrary constant value
 * @param  {Array} path   The JSON schema path to this data object
 *
 * @return {Object}       An error object, if the validation failed
 */
function validateConstant(data, schema, path) {
	debug('validateConstant', data, schema, path);

	if (data !== schema) {
		return [{
			code: 'CONSTANT',
			path: [].concat(path)
		}];
	}

	return [];
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
	this.path = [];
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
		var self = this,
			result = {
				valid: true,
				errors: []
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
			path = self.path,
			schemaData = getSchemaByRef(schema, self.schemas),
			errors;

		debug('validateRoot', data, schema, schemaData, self.path);

		if (Array.isArray(schemaData)) {
			errors = self.validateArray(data, schemaData);
		}
		else if (isPlainObject(schemaData)) {
			errors = self.validateObject(data, schemaData);
		}
		else {
			if (schemaData === JSOND_BOOLEAN) {
				errors = validateBoolean(data, path);
			}
			else if (schemaData === JSOND_NUMBER) {
				errors = validateNumber(data, path);
			}
			else if (schemaData === JSOND_INTEGER) {
				errors = validateInteger(data, path);
			}
			else if (schemaData === JSOND_STRING) {
				errors = validateString(data, path);
			}
			else if (typeof schemaData === 'string') {
				errors = validateSpecial(data, schemaData, path);
			}
			else {
				errors = validateConstant(data, schemaData, path);
			}
		}

		if (errors.length) {
			debug('validateRoot errors', errors);
		}

		return errors;
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
		var self = this,
			errors = [],
			di, dl,
			si, sl,
			valid,
			errs;

		debug('validateArray', data, schema);

		if (!Array.isArray(data)) {
			return [{
				code: 'ARRAY_REQUIRED',
				path: [].concat(self.path)
			}];
		}

		sl = schema.length;

		// Using `for` due to speed over native `forEach` or `reduce`
		for (di = 0, dl = data.length; di < dl; di++) {
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
						path: [].concat(self.path)
					});
				}
				// Otherwise we can safely return the error that
				// caused the validation to fail
				else {
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
	 * @param  {Mixed} data   An arbitrary data object
	 * @param  {Mixed} schema An arbitrary JSOND text
	 *
	 * @return {Object}       An error object, if the validation failed
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

		debug('validateObject', data, schema);

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
					path: [].concat(self.path)
				});
			}
			else if (keyIndex !== -1) {
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
					path: [].concat(self.path, key)
				});
			});
		}

		return errors;
	}
};
