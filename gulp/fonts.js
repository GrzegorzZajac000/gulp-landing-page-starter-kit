'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const path = require('path');
const plumber = require('gulp-plumber');
const fontgen = require('gulp-fontgen');
const mainBowerFiles = require('main-bower-files');

//require('gulp-grunt')(gulp);

gulp.task('webfont-copy', function (cb) {
	gulp.src(path.join(conf.paths.src, '/fonts/*'))
		.pipe(plumber({
			errorHandler: error.handler('WebFont Copy')
		}))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));

	cb();
});

gulp.task('webfont-bower-copy', function (cb) {
	gulp.src(mainBowerFiles('**/*.{otf,ttf,woff,woff2,eot,svg}'))
		.pipe(plumber({
			errorHandler: error.handler('WebFont Copy [Bower]')
		}))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));

	cb();
});

//gulp.task('webfont-fontgen', function() {
//  return gulp.src("./src/fonts/.{ttf,otf}")
//    .pipe(fontgen({
//      dest: "./dist/fonts/"
//    }));
//});
//
//gulp.task('webfont-generating', [
//  'grunt-fontgen',
//  'webfont-copy'  
//]);