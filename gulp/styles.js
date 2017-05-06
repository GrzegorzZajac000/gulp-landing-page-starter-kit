'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const path = require('path');
const sass = require('gulp-ruby-sass');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const scsslint = require('gulp-scss-lint');
const mainBowerFiles = require('main-bower-files');
const merge = require('event-stream').merge;
const order = require('gulp-order');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

gulp.task('scss-lint', function (cb) {
	gulp.src([
		path.join(conf.paths.src, '/styles/**/*.scss'),
		path.join(conf.paths.src, '/components/**/*.scss')
	])
		.pipe(plumber({
			errorHandler: error.handler('SCSS Linter')
		}))
		.pipe(scsslint({
			'config': 'scssLint.yml'
		}));

	cb();
});

gulp.task('scss-development', function () {
	var sass_files = sass([
		path.join(conf.paths.src, '/styles/**/*.scss'),
		path.join(conf.paths.src, '/components/**/*.scss')
	], {
		tempDir: conf.paths.tmp,
		stopOnError: false
	})
		.pipe(plumber({
			errorHandler: error.handler('SCSS Generating Development')
		}))
		.pipe(sourcemaps.init({debug: false}))
		.pipe(sourcemaps.write({debug: false}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'ie 10', 'ie 11', 'opera 12.1', 'ios 6', 'ios 7', 'Android >= 2.1'],
			cascade: false,
			add: true,
			remove: false
		}))
		.pipe(cssbeautify({
			indent: '  ',
			openbrace: 'separate-line',
			autosemicolon: true
		}))
		.pipe(concat('sass.css'));

	var vendor = gulp.src(path.join(conf.paths.src, '/vendor/css/**/*.css'))
		.pipe(plumber({
			errorHandler: error.handler('SCSS Generating Development [vendor]')
		}))
		.pipe(concat('vendor.css'));

	return merge(vendor, sass_files)
		.pipe(plumber({
			errorHandler: error.handler('SCSS Generating Development [merge]')
		}))
		.pipe(order([
			'vendor.css',
			'sass.css'
		]))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/css/')));
});

gulp.task('scss-production', function () {
	var sass_files = sass([
		path.join(conf.paths.src, '/styles/**/*.scss'),
		path.join(conf.paths.src, '/components/**/*.scss')
	], {
		sourcemap: false,
		tempDir: conf.paths.tmp,
		stopOnError: false
	})
		.pipe(plumber({
			errorHandler: error.handler('SCSS Generating Production')
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions', 'safari 5', 'ie 8', 'ie 9', 'ie 10', 'ie 11', 'opera 12.1', 'ios 6', 'ios 7', 'Android >= 2.1'],
			cascade: false,
			add: true,
			remove: false
		}))
		.pipe(concat('sass.css'));

	var bower_files = gulp.src(mainBowerFiles('**/*.css'))
		.pipe(plumber({
			errorHandler: error.handler('SCSS Generating Production [bower]')
		}))
		.pipe(concat('bower.css'));

	var vendor = gulp.src(path.join(conf.paths.src, '/vendor/css/**/*.css'))
		.pipe(plumber({
			errorHandler: error.handler('SCSS Generating Production [vendor]')
		}))
		.pipe(concat('vendor.css'));

	return merge(bower_files, vendor, sass_files)
		.pipe(plumber({
			errorHandler: error.handler('SCSS Generating Production [merge]')
		}))
		.pipe(order([
			'bower.css',
			'vendor.css',
			'sass.css'
		]))
		.pipe(concat('style.min.css'))
		.pipe(cssmin({
			'keepSpecialComments': false
		}))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/css/')));
});