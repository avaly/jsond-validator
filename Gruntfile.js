module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-saucelabs');
	grunt.loadNpmTasks('grunt-webpack');

	grunt.initConfig({
		connect: {
			server: {
				options: {
					base: '',
					port: 9999
				}
			}
		},
		jscs: {
			all: {
				options: {
					config: '.jscs.json'
				},
				files: {
					src: [
						'bin/*',
						'lib/**/*.js',
						'test/!(client)/*.js'
					]
				}
			}
		},
		jshint: {
			all: {
				options: {
					jshintrc: '.jshint.json',
					reporter: require('jshint-stylish')
				},
				files: {
					src: [
						'bin/*',
						'lib/**/*.js',
						'test/!(client)/*.js'
					]
				}
			}
		},
		// Client-side mocha tests
		mocha: {
			test: {
				src: [
					'test/client/*.html'
				],
				options: {
					reporter: 'List',
					run: true
				}
			}
		},
		// Node mocha tests
		mochaTest: {
			test: {
				options: {
					ui: 'tdd',
					reporter: 'dot',
					clearRequireCache: true
				},
				src: [
					'test/**/*.js'
				]
			}
		},
		'saucelabs-mocha': {
			tests: {
				options: {
					urls: [
						'http://localhost:9999/test/client/index.html'
					],
					tunnelTimeout: 5,
					build: process.env.CIRCLE_BUILD_NUM || 'dev',
					concurrency: 3,
					testname: 'jsond-validator',
					'public': 'public',
					browsers: [
						{
							browserName: 'googlechrome',
							platform: 'Windows 8'
						},
						{
							browserName: 'firefox',
							platform: 'Windows 8'
						},
						{
							browserName: 'internet explorer',
							platform: 'Windows 8.1',
							version: '11.0'
						},
						{
							browserName: 'internet explorer',
							platform: 'Windows 8',
							version: '10.0'
						},
						{
							browserName: 'internet explorer',
							platform: 'Windows 7',
							version: '9.0'
						},
						{
							browserName: 'safari',
							platform: 'OS X 10.10',
							version: '8.0'
						}
					]
				}
			}
		},
		webpack: {
			tests: {
				entry: {
					cases: './test/cases.js',
				},
				output: {
					path: './test/client/',
					filename: '[name].js'
				},
				stats: {
					modules: true
				}
			}
		},
		watch: {
			all: {
				files: [
					'lib/**/*.js',
					'test/**/*.js',
					'test/**/*.json'
				],
				tasks: ['mochaTest', 'jshint']
			}
		}
	});

	grunt.util._.each({
		'default': ['watch'],
		'dev': ['connect', 'watch'],
		'saucelabs': ['connect', 'saucelabs-mocha']
	}, function(tasks, alias){
		grunt.registerTask(alias, tasks);
	});
};
