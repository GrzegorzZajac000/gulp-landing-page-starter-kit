'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const error = require('./error-handler');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');
const Gaze = require('gaze').Gaze;
const gulpsync = require('gulp-sync')(gulp);


gulp.task('watch', function () {
	/* STYLES */
	var stylesPath = new Gaze([
		path.join(conf.paths.src, '/components/**/*.scss'),
		path.join(conf.paths.src, '/styles/**/*.scss')
	]);
	stylesPath.on('all', function () {
		runSequence('scss-lint', 'scss-development');
		browserSync.reload();
	});

	/* CRITICAL CSS */
	var criticalCSS = new Gaze(path.join(conf.paths.dist, '/css/style.css'));
	criticalCSS.on('all', function () {
		runSequence('critical-css-development', 'generate-critical-css-development-inject');
		browserSync.reload();
	});

	/* SPRITES */
	var spritesPath = new Gaze(path.join(conf.paths.src, '/sprites/**/*.png'));
	spritesPath.on('all', function () {
		runSequence('generating-2x-sprites-icon-newer',
			'generating-sprites',
			'scss-lint',
			'scss-development',
			'image-copy-newer',
			function () {
				browserSync.reload();
			});
	});

	/* SVG SPRITES */
	var svgSpritesPath = new Gaze(path.join(conf.paths.src, '/svg-sprites/*.svg'));
	svgSpritesPath.on('all', function () {
		runSequence('generating-svg-sprites',
			'image-copy-newer',
			function () {
				browserSync.reload();
			});
	});

	/* IMAGES */
	var imagesPath = new Gaze(path.join(conf.paths.src, '/images/**/*.{jpg,png,gif,svg}'));
	imagesPath.on('all', function () {
		runSequence('image-copy-newer', function () {
			browserSync.reload();
		});
	});

	/* WEBFONT */
	var fontPath = new Gaze(path.join(conf.paths.src, '/fonts/*'));
	fontPath.on('all', function () {
		runSequence('webfont-copy', function () {
			browserSync.reload();
		});
	});

	/* FAVICON */
	var faviconPath = new Gaze(path.join(conf.paths.src, '/components/favicon/icon.png'));
	faviconPath.on('all', function () {
		runSequence('favicon', function () {
			browserSync.reload();
		});
	});

	/* HTML */
	var htmlPath = new Gaze([
		path.join(conf.paths.src, '/components/**/*.html'),
		path.join(conf.paths.src, '**/*.html')
	]);
	htmlPath.on('all', function () {
		runSequence('html-include-development', function () {
			browserSync.reload();
		});
	});

	/* BOWER */
// wywala skrypt przy usunięciu
//    var bowerPath = new Gaze('bower_components/**/*');
//    bowerPath.on('all', function() {
//        runSequence('bower-dev',
//                    'html-include-development-newer',
//                    function() { browserSync.reload(); });
//    });

	/* JAVASCRIPT */
	var jsPath = new Gaze(path.join(conf.paths.src, '/components/**/*.js'));
	jsPath.on('all', function () {
		runSequence('javascript-development', function () {
			browserSync.reload();
		});
	});
});

gulp.task('watch-production', function () {
	/* STYLES */
	var stylesPath = new Gaze([
		path.join(conf.paths.src, '/components/**/*.scss'),
		path.join(conf.paths.src, '/styles/**/*.scss')
	]);
	stylesPath.on('all', function () {
		runSequence('scss-lint', 'scss-production');
		browserSync.reload();
	});

	/* CRITICAL CSS */
	var criticalCSS = new Gaze(path.join(conf.paths.dist, '/css/style.min.css'));
	criticalCSS.on('all', function () {
		runSequence('critical-css-production', 'generate-critical-css-production-inject');
		browserSync.reload();
	});

	/* SPRITES */
	var spritesPath = new Gaze(path.join(conf.paths.src, '/sprites/**/*.png'));
	spritesPath.on('all', function () {
		runSequence('generating-2x-sprites-icon-newer',
			'generating-sprites',
			'scss-lint',
			'scss-production',
			'image-compression',
			function () {
				browserSync.reload();
			});
	});

	/* SVG SPRITES */
	var svgSpritesPath = new Gaze(path.join(conf.paths.src, '/svg-sprites/*.svg'));
	svgSpritesPath.on('all', function () {
		runSequence('generating-svg-sprites',
			'copy-svg-sprite',
			function () {
				browserSync.reload();
			});
	});

	/* IMAGES */
	var imagesPath = new Gaze([
		path.join(conf.paths.src, '/images/**/*.{jpg,jpeg,png,gif,svg}'),
		path.join('!', conf.paths.src, '/images/svg-sprite.svg')
	]);
	imagesPath.on('all', function () {
		runSequence('image-compression', function () {
			browserSync.reload();
		});
	});

	/* WEBFONT */
	var fontPath = new Gaze(path.join(conf.paths.src, '/fonts/*'));
	fontPath.on('all', function () {
		runSequence('webfont-copy', function () {
			browserSync.reload();
		});
	});

	/* FAVICON */
	var faviconPath = new Gaze(path.join(conf.paths.src, '/components/favicon/icon.png'));
	faviconPath.on('all', function () {
		runSequence('favicon', function () {
			browserSync.reload();
		});
	});

	/* HTML */
	var htmlPath = new Gaze([
		path.join(conf.paths.src, '/components/**/*.html'),
		path.join(conf.paths.src, '**/*.html')
	]);
	htmlPath.on('all', function () {
		runSequence('html-include-production', function () {
			browserSync.reload();
		});
	});

	/* BOWER */
//    var bowerPath = new Gaze('bower_components/**/*');
//    bowerPath.on('all', function() {
//        runSequence('bower-dev',
//                    'html-include-development-newer',
//                    function() { browserSync.reload(); });
//    });

	/* JAVASCRIPT */
	var jsPath = new Gaze(path.join(conf.paths.src, '/components/**/*.js'));
	jsPath.on('all', function () {
		runSequence('javascript-production', function () {
			browserSync.reload();
		});
	});
});
