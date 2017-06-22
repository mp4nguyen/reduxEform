'use strict';

var config       = require('../config');
var gulp = require('gulp');
var sitemap = require('gulp-sitemap');
 
gulp.task('sitemap', function () {
    gulp.src(config.dist.root + '**/*.html')
        .pipe(sitemap({
            siteUrl: 'https://patientportal-fed06.firebaseapp.com/'
        }))
        .pipe(gulp.dest(config.dist.root));
});



