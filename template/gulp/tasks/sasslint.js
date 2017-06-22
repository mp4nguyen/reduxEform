'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var lint 		 = require('gulp-sass-lint');

gulp.task('sasslint', function () {
  return gulp.src(config.sasslint.src)
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError());
});
