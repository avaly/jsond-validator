module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-webpack');

	grunt.initConfig({
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
					modules: false
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
		'default': ['watch']
	}, function(tasks, alias){
		grunt.registerTask(alias, tasks);
	});
};
