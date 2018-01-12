/**
 * @flow
 */

/**
 * @private
 */
var Compiler = require('./Compiler');
var logger = require('./logger');
var patterns = require('./patterns');

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
		_DEBUG_ && logger('addSchema', schemaID, schema);

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
		_DEBUG_ && logger('validate', data, schemaID);

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
			this.compiled[schemaID] = Compiler.compile(dereferencedSchema);
		}

		var errors = this.compiled[schemaID](data);
		_DEBUG_ && logger('validate.errors', errors);

		return {
			valid: errors.length === 0,
			errors: errors,
		};
	},
};

module.exports = JSONDValidator;
