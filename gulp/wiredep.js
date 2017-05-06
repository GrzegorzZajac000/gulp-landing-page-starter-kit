'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const path = require('path');
const plumber = require('gulp-plumber');
const wiredep = require('wiredep').stream;
const merge = require('event-stream').merge;

gulp.task('bower-dev', function () {
	var bowerFooter = gulp.src(path.join(conf.paths.src, '/components/footer/footer.html'), {base: './'})
		.pipe(plumber({
			errorHandler: error.handler('Bower Dev [footer]')
		}))
		.pipe(wiredep())
		.pipe(gulp.dest('./'));

	var bowerHeader = gulp.src(path.join(conf.paths.src, '/components/header/header.html'), {base: './'})
		.pipe(plumber({
			errorHandler: error.handler('Bower Dev [header]')
		}))
		.pipe(wiredep())
		.pipe(gulp.dest('./'));

	return merge(bowerFooter, bowerHeader);
});

gulp.task('bower-dev-clean', function () {
	var bowerFooter = gulp.src(path.join(conf.paths.src, '/components/footer/footer.html'), {base: './'})
		.pipe(plumber({
			errorHandler: error.handler('Bower Dev [footer]')
		}))
		.pipe(wiredep({
			dependencies: false,
			devDependencies: false,
			includeSelf: false
		}))
		.pipe(gulp.dest('./'));

	var bowerHeader = gulp.src(path.join(conf.paths.src, '/components/header/header.html'), {base: './'})
		.pipe(plumber({
			errorHandler: error.handler('Bower Dev [header]')
		}))
		.pipe(wiredep({
			dependencies: false,
			devDependencies: false,
			includeSelf: false
		}))
		.pipe(gulp.dest('./'));

	return merge(bowerFooter, bowerHeader);
});