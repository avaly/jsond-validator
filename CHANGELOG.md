# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/avaly/jsond-validator/compare/v1.3.0...v2.0.0) (2017-04-21)


### Features

* Refactor using generated functions :zap: ([96789a0](https://github.com/avaly/jsond-validator/commit/96789a0)), closes [#13](https://github.com/avaly/jsond-validator/issues/13)


### BREAKING CHANGES

* `validate` second parameter needs to be the schema ID
under which a schema was added with `addSchema`.
* Array validation is no longer done according to spec.
New behavior will check all array items in the data accord to the first
item in the schema array.



<a name="1.3.0"></a>
# [1.3.0](https://github.com/avaly/jsond-validator/compare/v1.2.1...v1.3.0) (2017-04-21)


### Features

* Include build with rollup :rocket: ([b40de69](https://github.com/avaly/jsond-validator/commit/b40de69))
