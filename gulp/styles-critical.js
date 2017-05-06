'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const path = require('path');
const plumber = require('gulp-plumber');
const concatUtil = require('gulp-concat-util');
const cssmin = require('gulp-cssmin');
const criticalCss = require('gulp-critical-css');
const rename = require('gulp-rename');

gulp.task('critical-css-development', function () {
	return gulp.src(path.join(conf.paths.dist, '/css/style.css'))
		.pipe(plumber({
			errorHandler: error.handler('Critical CSS Development')
		}))
		.pipe(criticalCss())
		.pipe(gulp.dest(path.join(conf.paths.dist, '/css/')));
});

gulp.task('critical-css-production', function () {
	return gulp.src(path.join(conf.paths.dist, '/css/style.min.css'))
		.pipe(plumber({
			errorHandler: error.handler('Critical CSS Production')
		}))
		.pipe(criticalCss())
		.pipe(cssmin({
			'keepSpecialComments': false
		}))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/css/')));
});

gulp.task('generate-critical-css-development-inject', function () {
	return gulp.src(path.join(conf.paths.dist, '/css/style.css'))
		.pipe(plumber({
			errorHandler: error.handler('Generate Critical CSS Development Inject')
		}))
		.pipe(concatUtil.header('<style>'))
		.pipe(concatUtil.footer('</style>'))
		.pipe(rename({
			basename: 'critical.css',
			extname: '.html'
		}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/components/header/')));
});

gulp.task('generate-critical-css-production-inject', function () {
	return gulp.src(path.join(conf.paths.dist, '/css/style.css'))
		.pipe(plumber({
			errorHandler: error.handler('Generate Critical CSS Production Inject')
		}))
		.pipe(concatUtil.header('<style>'))
		.pipe(concatUtil.footer('</style>'))
		.pipe(rename({
			basename: 'critical.css',
			extname: '.html'
		}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/components/header/')));
});