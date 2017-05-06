'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const browserSync = require('browser-sync');
const browserSyncSpa = require('browser-sync-spa');
const util = require('util');
const runSequence = require('run-sequence');

function browserSyncInit(baseDir, browser) {
	browser = browser === undefined ? 'default' : browser;

	var routes = null;
	if ((baseDir === conf.paths.src || (util.isArray(baseDir)) && (baseDir.indexOf(conf.paths.src) !== -1))) {
		routes = {
			'/bower_components': 'bower_components'
		};
	}

	var server = {
		baseDir: baseDir,
		routes: routes
	};

	browserSync.instance = browserSync.init({
		startPath: '/',
		server: server,
		browser: browser
	});
}

gulp.task('serve', function (cb) {
	runSequence('development-build', 'watch', function () {
		browserSyncInit([conf.paths.dist, conf.paths.src]);
	});

	cb();
});

gulp.task('serve-production', function (cb) {
	runSequence('production-build', 'watch-production', function () {
		browserSyncInit(conf.paths.dist);
	});

	cb();
})