'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const path = require('path');
const plumber = require('gulp-plumber');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');
const imageresize = require('gulp-image-resize');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');

gulp.task('generating-2x-sprites-icon', function (cb) {
	gulp.src(path.join(conf.paths.src, '/sprites/**/*.png'))
		.pipe(plumber({
			errorHandler: error.handler('Sprites generating [Generating 2x sprites icon]')
		}))
		.pipe(imageresize({
			width: "200%",
			height: "200%",
			crop: false,
			upscale: true
		}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/sprites/retina/')));

	cb();
});

gulp.task('generating-2x-sprites-icon-newer', function (cb) {
	gulp.src(path.join(conf.paths.src, '/sprites/**/*.png'))
		.pipe(plumber({
			errorHandler: error.handler('Sprites generating [Generating 2x sprites icon newer]')
		}))
		.pipe(newer(path.join(conf.paths.src, '/sprites/retina/')))
		.pipe(imageresize({
			width: "200%",
			height: "200%",
			crop: false,
			upscale: true
		}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/sprites/retina/')));

	cb();
});

gulp.task('generating-sprites', function (cb) {
	var spriteData = gulp.src(path.join(conf.paths.src, '/sprites/**/*.png'))
		.pipe(plumber({
			errorHandler: error.handler('Generating Sprites [spriteData]')
		}))
		.pipe(spritesmith({
			imgName: 'sprites.png',
			retinaSrcFilter: [path.join(conf.paths.src, '/sprites/retina/**/*.png')],
			retinaImgName: 'sprites-2x.png',
			cssName: 'sprites.scss',
			cssTemplate: 'sprites.css.handlebars',
			algorithm: 'binary-tree'
		}));

	var imgStream = spriteData.img
		.pipe(plumber({
			errorHandler: error.handler('Generating Sprites [imgStream]')
		}))
		.pipe(buffer())
		.pipe(gulp.dest(path.join(conf.paths.src, '/images/')));

	var cssStream = spriteData.css
		.pipe(plumber({
			errorHandler: error.handler('Generating Sprites [cssStream]')
		}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/styles/')));

	merge(imgStream, cssStream);
	cb();
});

gulp.task("generating-svg-sprites", function (cb) {
	var config = {
		mode: {
			symbol: {
				dest: ".",
				sprite: "svg-sprite.svg"
			}
		}
	};

	gulp.src(path.join(conf.paths.src, '/svg-sprites/*.svg'))
		.pipe(svgSprite(config))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/images/')));

	cb();
});