/* eslint no-console: 0 */

const assert = require('assert');
const ajv = require('ajv');
const isMyJSONValid = require('is-my-json-valid');
const Benchmark = require('benchmark');
const JSONDValidator = require('../');
const JSONDValidator130 = require('jsond-validator');

const inputValid = require('./data/input-valid');
const inputInvalid = require('./data/input-invalid');
const schemaJSOND = require('./data/schema-jsond');
const schemaJSONSchema = require('./data/schema-jsonschema');

const validatorJSONDValidator = new JSONDValidator();
validatorJSONDValidator.addSchema('schema', schemaJSOND);
function validateJSONDValidator(input) {
	return validatorJSONDValidator.validate(input, 'schema');
}

const validatorJSONDValidator130 = new JSONDValidator130();
validatorJSONDValidator130.addSchema('schema', schemaJSOND);
function validateJSONDValidator130(input) {
	return validatorJSONDValidator130.validate(input, 'schema');
}

const validatorisMyJSONValid = isMyJSONValid(schemaJSONSchema, {
	greedy: true,
});
function validateisMyJSONValid(input) {
	return validatorisMyJSONValid(input);
}

const validatorAJV = new ajv({
	allErrors: true,
});
const compiledAJV = validatorAJV.compile(schemaJSONSchema);
function validateAJV(input) {
	return compiledAJV(input);
}

function testAll() {
	[
		function testJSONDValidatorCurrent() {
			const resultJSONDValidatorSuccess = validateJSONDValidator(inputValid);
			assert(resultJSONDValidatorSuccess.valid, 'valid');
			assert(
				resultJSONDValidatorSuccess.errors.length === 0,
				'errors.length === 0'
			);

			const resultJSONDValidatorError = validateJSONDValidator(inputInvalid);
			assert(!resultJSONDValidatorError.valid, 'valid');
			assert(resultJSONDValidatorError.errors.length === 2, 'errors.length');
		},
		function testJSONDValidator130() {
			const resultJSONDValidator130Success = validateJSONDValidator130(
				inputValid
			);
			assert(resultJSONDValidator130Success.valid, 'valid');
			assert(
				resultJSONDValidator130Success.errors.length === 0,
				'errors.length === 0'
			);

			const resultJSONDValidator130Error = validateJSONDValidator130(
				inputInvalid
			);
			assert(!resultJSONDValidator130Error.valid, 'valid');
			assert(resultJSONDValidator130Error.errors.length === 2, 'errors.length');
		},
		function testIsMyJSONValid() {
			const resultisMyJSONValidSuccess = validateisMyJSONValid(inputValid);
			assert(resultisMyJSONValidSuccess === true, 'valid result');
			assert(validatorisMyJSONValid.errors === null, 'valid errors');

			const resultisMyJSONValidError = validateisMyJSONValid(inputInvalid);
			assert(resultisMyJSONValidError === false, 'invalid result');
			assert(validatorisMyJSONValid.errors.length === 2, 'invalid errors');
		},
		function testAJV() {
			const resultAJVSuccess = validateAJV(inputValid);
			assert(resultAJVSuccess, 'valid result');

			const resultAJVError = validateAJV(inputInvalid);
			assert(!resultAJVError, 'invalid result');
			assert(compiledAJV.errors.length === 2, 'invalid errors');
		},
	].forEach(function(test) {
		test();
	});
	console.log('Tests are OK!');
}

function runAll() {
	const suite = new Benchmark.Suite();

	suite
		.add('JSONDValidator current version', function() {
			validateJSONDValidator(inputValid);
		})
		.add('JSONDValidator 1.3.0', function() {
			validateJSONDValidator130(inputValid);
		})
		.add('is-my-json-valid', function() {
			validateisMyJSONValid(inputValid);
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
