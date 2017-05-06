const gutil = require('gulp-util');

exports.handler = function (title) {
	'use strict';

	return function (err) {
		gutil.beep();
		gutil.log(
			gutil.colors.red('[' + title + ']'),
			err.toString()
		);
		this.emit('end');
	};
};