# [JSOND](http://www.jsond.org/) Validator

**node.js and browser module for validating JSON definitions**

[![Travis CI](https://img.shields.io/travis/avaly/jsond-validator/master.svg)](https://travis-ci.org/avaly/jsond-validator)
[![Sauce Test Status](https://saucelabs.com/buildstatus/avaly-jsond-v)](https://saucelabs.com/u/avaly-jsond-v)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/avaly-jsond-v.svg)](https://saucelabs.com/u/avaly-jsond-v)
[![Code Coverage](https://img.shields.io/codecov/c/github/avaly/jsond-validator.svg)](https://codecov.io/gh/avaly/jsond-validator)
[![Dependencies](https://img.shields.io/david/dev/avaly/jsond-validator.svg)](https://david-dm.org/avaly/jsond-validator)


A validator for JSON definitions according to the [JSOND specification](http://tools.ietf.org/html/draft-oskarsson-jsond-00) with the following exceptions:

* Array items are matched only agains the first array definition in the schema (see `test/data/array.js` for missing test cases)

## Documentation

[http://avaly.github.io/jsond-validator](http://avaly.github.io/jsond-validator)

## Usage

```cli
yarn add jsond-validator
```

OR

```cli
npm install jsond-validator
```

Then:

```
const validator = require('jsond-validator');
```

The package also ships with two UMD bundles:

- `dist/jsond-validator.js`
- `dist/jsond-validator.min.js`

## Tools

A simple script is shipped with this module to verify a JSON file against a
JSON schema:

```
validate-jsond INPUT_FILE SCHEMA_FILE
```

## Development

```
npm run test
npm run test-client
```

## License

Copyright (c) 2015-2017, Valentin Agachi ([http://agachi.name](http://agachi.name))

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
