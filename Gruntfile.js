var webpack = require('webpack'),
	WebpackStrip = require('strip-loader');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-mocha');
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
						'test/!(client|flow)/*.js'
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
						'test/!(client|flow)/*.js'
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
							browserName: 'chrome',
							platform: 'Windows 10'
						},
						{
							browserName: 'firefox',
							platform: 'Windows 10'
						},
						{
							browserName: 'MicrosoftEdge',
							platform: 'Windows 10'
						},
						{
							browserName: 'internet explorer',
							platform: 'Windows 10'
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
							browserName: 'chrome',
							platform: 'Linux'
						},
						{
							browserName: 'firefox',
							platform: 'Linux'
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
					cases: [
						'./test/cases.js',
						'./test/dereferenced-schema.js'
					]
				},
				output: {
					path: './test/client/',
					filename: '[name].js'
				},
				module: {
					loaders: [
						{
							test: /\.js$/,
							loader: 'strip-loader?strip[]=debug'
						}
					],
				},
				plugins: [
					new webpack.NormalModuleReplacementPlugin(
						/debug/,
						process.cwd() + '/lib/debug-fake.js'
					)
				],
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
