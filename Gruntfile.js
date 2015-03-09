module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-jsonlint');

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
		}
	});

	grunt.util._.each({
		'default': ['watch'],
	}, function(tasks, alias){
		grunt.registerTask(alias, tasks);
	});
};
