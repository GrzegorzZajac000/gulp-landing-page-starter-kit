'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const path = require('path');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');
const newer = require('gulp-newer');

gulp.task('image-compression', function (cb) {
	return gulp.src([
		path.join(conf.paths.src, '/images/**/*.{jpg,jpeg,png,gif,svg}'),
		path.join('!', conf.paths.src, '/images/svg-sprite.svg')
	])
		.pipe(plumber({
			errorHandler: error.handler('Image Compression')
		}))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/images/')));

	cb();
});

gulp.task('copy-svg-sprite', function (cb) {
	gulp.src(path.join(conf.paths.src, '/images/svg-sprite.svg'))
		.pipe(plumber({
			errorHandler: error.handler('SVG Sprite Copy')
		}))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/images/')));

	cb();
});

gulp.task('image-copy-newer', function (cb) {
	gulp.src(path.join(conf.paths.src, '/images/**/*.{jpg,jpeg,png,gif,svg}'))
		.pipe(plumber({
			errorHandler: error.handler('Image Copy')
		}))
		.pipe(newer(path.join(conf.paths.dist, '/images/')))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/images/')));

	cb();
});