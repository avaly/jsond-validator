/* eslint no-console: 0 */

const assert = require('assert');
const ajv = require('ajv');
const djv = require('djv');
const Benchmark = require('benchmark');
const JSONDValidator = require('../');

const inputValid = require('./data/input-valid');
const inputInvalid = require('./data/input-invalid');
const schemaJSOND = require('./data/schema-jsond');
const schemaJSONSchema = require('./data/schema-jsonschema');

const validatorJSONDValidator = new JSONDValidator();
validatorJSONDValidator.addSchema('schema', schemaJSOND);
function validateJSONDValidator(input) {
	return validatorJSONDValidator.validate(input, 'schema');
}

const validatorDJV = new djv();
validatorDJV.addSchema('schema', schemaJSONSchema);
function validateDJV(input) {
	return validatorDJV.validate('schema', input);
}

const validatorAJV = new ajv();
const compiledAJV = validatorAJV.compile(schemaJSONSchema);
function validateAJV(input) {
	return compiledAJV(input);
}

function testAll() {
	const resultJSONDValidatorSuccess = validateJSONDValidator(inputValid);
	assert(resultJSONDValidatorSuccess.valid, 'valid');
	assert(
		resultJSONDValidatorSuccess.errors.length === 0,
		'errors.length === 0'
	);

	const resultJSONDValidatorError = validateJSONDValidator(inputInvalid);
	assert(!resultJSONDValidatorError.valid, 'valid');
	assert(resultJSONDValidatorError.errors.length > 0, 'errors.length > 0');

	const resultDJVSuccess = validateDJV(inputValid);
	assert(typeof resultDJVSuccess === 'undefined', 'valid result');

	const resultDJVError = validateDJV(inputInvalid);
	assert(typeof resultDJVError === 'string', 'invalid result');

	const resultAJVSuccess = validateAJV(inputValid);
	assert(resultAJVSuccess, 'valid result');

	const resultAJVError = validateAJV(inputInvalid);
	assert(!resultAJVError, 'invalid result');
}

function runAll() {
	const suite = new Benchmark.Suite();

	suite
		.add('JSONDValidator', function() {
			validateJSONDValidator(inputValid);
		})
		.add('djv', function() {
			validateDJV(inputValid);
		})
		.add('ajv', function() {
			validateAJV(inputValid);
		})
		.on('cycle', function(event) {
			console.log(String(event.target));
		})
		.on('complete', function() {
			console.log('Fastest is ' + this.filter('fastest').map('name'));
		})
		.run({ async: true });
}

testAll();
runAll();
