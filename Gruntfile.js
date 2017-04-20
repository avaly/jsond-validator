module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-saucelabs');

	grunt.initConfig({
		connect: {
			server: {
				options: {
					base: '',
					port: 9999,
				},
			},
		},
		jsonlint: {
			all: {
				src: ['jsdoc.json', 'test/_fixtures_/*.json'],
				options: {
					formatter: 'prose',
				},
			},
		},
		// Client-side mocha tests
		mocha: {
			test: {
				src: ['test/client/*.html'],
				options: {
					reporter: 'List',
					run: true,
				},
			},
		},
		'saucelabs-mocha': {
			tests: {
				options: {
					urls: ['http://localhost:9999/test/client/index.html'],
					tunnelTimeout: 5,
					build: process.env.CIRCLE_BUILD_NUM || 'dev',
					concurrency: 3,
					testname: 'jsond-validator',
					public: 'public',
					browsers: [
						{
							browserName: 'chrome',
							platform: 'Windows 10',
						},
						{
							browserName: 'firefox',
							platform: 'Windows 10',
						},
						{
							browserName: 'MicrosoftEdge',
							platform: 'Windows 10',
						},
						{
							browserName: 'internet explorer',
							platform: 'Windows 10',
						},
						{
							browserName: 'internet explorer',
							platform: 'Windows 8.1',
							version: '11.0',
						},
						{
							browserName: 'internet explorer',
							platform: 'Windows 8',
							version: '10.0',
						},
						{
							browserName: 'chrome',
							platform: 'Linux',
						},
						{
							browserName: 'firefox',
							platform: 'Linux',
						},
						{
							browserName: 'safari',
							platform: 'OS X 10.10',
							version: '8.0',
						},
					],
				},
			},
		},
		watch: {
			all: {
				files: ['lib/**/*.js', 'test/**/*.js', 'test/**/*.json'],
				tasks: ['mochaTest', 'jshint'],
			},
		},
	});

	grunt.util._.each(
		{
			default: ['watch'],
			dev: ['connect', 'watch'],
			saucelabs: ['connect', 'saucelabs-mocha'],
		},
		function(tasks, alias) {
			grunt.registerTask(alias, tasks);
		}
	);
};
