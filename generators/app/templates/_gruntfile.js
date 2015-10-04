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
					proxy: "http://localhost:3000/",
					port:4000,
					reloadOnRestart: true
				}
			}
		},
		jshint:{
			options:{
				eqeqeq: true,
				undef: false,
				unused: false
			},
			target:{
				src: ["*.js", "utils/*.js","models/*.js","app/controllers/*.js", "app/services/*.js", "app/views/*.js", "app/templates/*.js"],
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
	grunt.registerTask('dev', ['env','nodemon']);
	grunt.registerTask('dev-sync', ['concurrent:dev']);
	grunt.registerTask('run-jshint',['jshint']);
};