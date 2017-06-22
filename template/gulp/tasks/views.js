'use strict';

var config   = require('../config');
var gulp     = require('gulp');
var jade     = require('gulp-jade');
// var htmlhint = require('gulp-htmlhint');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var htmlclean = require('gulp-htmlclean');

gulp.task('views', function() {

  // Process view files from /views
  return gulp.src([
    config.views.src,
    '!views/layout.jade' // Exclude layout jade
  ])
    // .pipe(jade({
    //   pretty: global.isProd ? false : true
    // }))
    // .on('error', handleErrors)
    // .pipe(htmlclean({
    //     protect: /<\!--%fooTemplate\b.*?%-->/g,
    //     edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
    // }))
    .pipe(gulp.dest(config.dist.root))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});
