'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./gulp');
const runSequence = require('run-sequence');
const gulpsync = require('gulp-sync')(gulp);

gulp.task('development-build', gulpsync.sync([
	'clean',
	'favicon',
	'bower-dev',
	'javascript-development',
	'generating-2x-sprites-icon',
	'generating-sprites',
	'generating-svg-sprites',
	'webfont-copy',
	'scss-lint',
	'scss-development',
	'critical-css-development',
	'generate-critical-css-development-inject',
	'html-include-development',
	'image-copy-newer'
]));

gulp.task('production-build', gulpsync.sync([
	'clean',
	'bower-dev-clean',
	'webfont-bower-copy',
	'javascript-production',
	'generating-2x-sprites-icon',
	'generating-sprites',
	'generating-svg-sprites',
	'webfont-copy',
	'scss-lint',
	'scss-production',
	'critical-css-production',
	'generate-critical-css-production-inject',
	'html-include-production',
	'image-compression',
	'copy-svg-sprite'
]));

gulp.task('default', ['development-build', 'watch']);