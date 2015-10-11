module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		nodemon:{
			dev: {
				script: 'server.js',
			},
		},
		browserSync: {
			dev: {
				bsFiles: {
					src : 'public/'
				},
				options: {
					proxy: 'http://localhost:3000/',
					port:4000,
					reloadDelay: 1000,
					reloadOnRestart: false
				}
			}
		},
		jshint:{
			options:{
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			target:{
				src: ["*.js", "public/controllers/**/*.js", "public/views/**/*.js", "public/controllers/**/*.js"]
			}
		},
		env:{
			dev:{
				NODE_ENV : 'development'
			}
		},
		concurrent:{
			dev:{
				tasks:['nodemon', 'browserSync'],
				options:{
					logConcurrentOutput:true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['nodemon']);
	grunt.registerTask('dev', ['env:dev','nodemon']);
	grunt.registerTask('dev-sync', ['concurrent:dev']);
	grunt.registerTask('run-jshint',['jshint']);
};