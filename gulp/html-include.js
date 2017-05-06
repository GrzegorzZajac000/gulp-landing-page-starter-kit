'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const conf = require('./conf');
const error = require('./error-handler');
const plumber = require('gulp-plumber');
const prettify = require('gulp-prettify');
const newer = require('gulp-newer');
const replace = require('gulp-replace');

gulp.task('html-include-development', function (cb) {
	gulp.src(['src/*.html'])
		.pipe(plumber({
			errorHandler: error.handler('HTML Inject')
		}))
		.pipe(fileinclude({
			prefix: '<!--@',
			suffix: '-->',
			basepath: 'src/components/'
		}))
		.pipe(gulp.dest('dist/'));

	cb();
});

gulp.task('html-include-development-newer', function (cb) {
	gulp.src(['src/*.html'])
		.pipe(plumber({
			errorHandler: error.handler('HTML Inject')
		}))
		.pipe(newer('dist/'))
		.pipe(fileinclude({
			prefix: '<!--@',
			suffix: '-->',
			basepath: 'src/components/'
		}))
		.pipe(gulp.dest('dist/'));

	cb();
});

gulp.task('html-include-production', function (cb) {
	gulp.src(['src/*.html'])
		.pipe(plumber({
			errorHandler: error.handler('HTML Inject')
		}))
		.pipe(fileinclude({
			prefix: '<!--@',
			suffix: '-->',
			basepath: 'src/components/'
		}))
		.pipe(replace('css/style.css', 'css/style.min.css'))
		.pipe(replace('js/script.js', 'js/script.min.js'))
		.pipe(prettify({indent_size: 4}))
		.pipe(gulp.dest('dist/'));

	cb();
});