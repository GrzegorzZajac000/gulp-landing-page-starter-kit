'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const path = require('path');
const autopolyfiller = require('gulp-autopolyfiller');
const order = require('gulp-order');
const merge = require('event-stream').merge;
const mainBowerFiles = require('main-bower-files');

gulp.task('javascript-development', function (cb) {
	var scripts = gulp.src(path.join(conf.paths.src, '/components/**/*.js'))
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Development Generating [all]')
		}))
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write());

	var vendor = gulp.src(path.join(conf.paths.src, '/vendor/js/**/*.js'))
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Development Generating [vendor]')
		}))
		.pipe(sourcemaps.init())
		.pipe(concat('vendor.js'));

	var all = merge(vendor, scripts);

	var polyfills = all
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Development Generating [polyfills]')
		}))
		.pipe(autopolyfiller('polyfills.js', {
			browsers: ['last 5 versions', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'ie 10', 'ie 11', 'opera 12.1', 'ios 6', 'ios 7', 'Android >= 2.1']
		}));

	merge(polyfills, all)
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Development Generating [merge]')
		}))
		.pipe(order([
			'polyfills.js',
			'vendor.js',
			'all.js'
		]))
		.pipe(concat('script.js'))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/js/')));

	cb();
});

gulp.task('javascript-production', function (cb) {
	var scripts = gulp.src(path.join(conf.paths.src, '/components/**/*.js'))
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Production Generating [all]')
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('scripts.js'));

	var vendor = gulp.src(path.join(conf.paths.src, '/vendor/js/**/*.js'))
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Development Generating [vendor]')
		}))
		.pipe(sourcemaps.init())
		.pipe(concat('vendor.js'));

	var all = merge(vendor, scripts);

	var polyfills = all
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Production Generating [polyfills]')
		}))
		.pipe(autopolyfiller('polyfills.js', {
			browsers: ['last 5 versions', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'ie 10', 'ie 11', 'opera 12.1', 'ios 6', 'ios 7', 'Android >= 2.1']
		}));

	var bower = gulp.src(mainBowerFiles('**/*.js'))
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Production Generating [bower]')
		}))
		.pipe(concat('bower.js'));

	merge(polyfills, all, bower)
		.pipe(plumber({
			errorHandler: error.handler('JavaScript Production Generating [merge]')
		}))
		.pipe(order([
			'polyfills.js',
			'bower.js',
			'vendor.js',
			'all.js'
		]))
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.join(conf.paths.dist, '/js/')));

	cb();
});