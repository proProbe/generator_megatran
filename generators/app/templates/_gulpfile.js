'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

var BROWSER_SYNC_RELOAD_DELAY = 2000;


gulp.task('default', ['browser-sync'], function(){
	return gutil.log('Gulp is running');
});

gulp.task('browser-sync', ['nodemon'], function(){
	browserSync.init(null, {
		proxy:"http://localhost:3000",
		files:["public/"],
		// browser: "google chrome",
		port:4000,
		reloadDelay: BROWSER_SYNC_RELOAD_DELAY
	});
});

gulp.task('nodemon', function(cb){
	var started = false;

	return nodemon({
		script:'server.js',
	})
	.on('start', function(){
		if(!started){
			cb();
			started=true;
		}
	}).on('restart', function onRestart(){
		browserSync.reload();
	});
});