'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const path = require('path');
const plumber = require('gulp-plumber');
const clean = require('gulp-clean');

gulp.task('clean', function (cb) {
	return gulp.src([
		'.sass-cache',
		'.tmp',
		conf.paths.dist
	], {read: true})
		.pipe(plumber({
			errorHandler: error.handler('Clean')
		}))
		.pipe(clean({force: true}));

	cb();
});