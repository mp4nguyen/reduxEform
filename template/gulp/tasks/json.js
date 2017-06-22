'use strict';

var config      = require('../config');
var gulp        = require('gulp');


gulp.task('json', function() {
  return gulp.src(config.json.src)
      .pipe(gulp.dest(config.json.dest));
});
