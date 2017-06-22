'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassLint = require('gulp-sass-lint');
// var sassLint = require('../../_sass-lint.yml');
var cleanCSS = require('gulp-clean-css');
var cssbeautify = require('gulp-cssbeautify')
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');


gulp.task('styles', function () {
  return gulp.src(config.styles.src)
    .pipe(sass({
      errLogToConsole: true,
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    // .pipe(autoprefixer({
    //   browsers: ['last 30 versions'],
    //   cascade: false
    // }))
    // .pipe(sassLint({
    //   'config': '../../.sass-lint.yml'
    // }))
    // .pipe(sassLint.format())
    // .pipe(sassLint.failOnError())
    .on('error', handleErrors)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(cssbeautify())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});

// gulp.task('sass', function () {
//     return gulp.src('base/scss/*.scss')
//                 .pipe(sass())
//                 .pipe(gulp.dest('base/css'))
//                 .pipe(bs.reload({stream: true}));
// });
