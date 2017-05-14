/**
 * @flow weak
 */
/* eslint no-unused-vars: 0 */

var logger = function(a, b, c) {};

/* istanbul ignore if */
if (process.env.DEBUG) {
	global._DEBUG_ = true;
	logger = require('debug')('jsond-validator');
}

if (typeof global._DEBUG_ === 'undefined') {
	global._DEBUG_ = false;
}

module.exports = logger;
