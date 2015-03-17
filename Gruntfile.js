module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-mocha-test');

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
						'test/**/*.js'
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
						'test/**/*.js'
					]
				}
			}
		},
		jsonlint: {
			locale: {
				files: {
					src: [
						'test/**/*.json'
					]
				}
			}
		},
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
		watch: {
			all: {
				files: [
					'lib/**/*.js',
					'test/**/*.js',
					'test/**/*.json'
				],
				tasks: ['test', 'jshint']
			}
		}
	});

	grunt.util._.each({
		'default': ['watch'],
		'test': ['mochaTest'],
	}, function(tasks, alias){
		grunt.registerTask(alias, tasks);
	});
};
