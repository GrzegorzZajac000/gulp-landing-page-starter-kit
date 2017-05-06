'use strict';

const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const path = require('path');
const plumber = require('gulp-plumber');

var fileList = [
	path.join(conf.paths.src, '/manifest.json'),
	path.join(conf.paths.src, '/robots.txt')
];

gulp.task('copy-files-to-dist', function (cb) {
	gulp.src(fileList)
		.pipe(plumber({
			errorHandler: error.handler('Copy files to dist error')
		}))
		.pipe(gulp.dest(function (file) {
			var relativePath = path.relative(conf.paths.src, file.base);
			return path.join(conf.paths.dist, relativePath, '/')
		}));

	cb();
});

exports.files = fileList;