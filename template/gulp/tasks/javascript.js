'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');

gulp.task('javascript', function() {
  return gulp.src(config.scripts.src)
      //.pipe(jshint())
      //.pipe(jshint.reporter('jshint-stylish'))
      //.pipe(concat('all.js'))
      .pipe(gulpif(global.isProd, uglify()))
      .pipe(gulp.dest(config.scripts.dest));
});
