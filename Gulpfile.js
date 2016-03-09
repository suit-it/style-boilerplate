"use strict";

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var uglifycss = require('gulp-uglifycss');

var scss_src = './scss/app.scss';

gulp.task('dev', function () {
  return gulp.src(scss_src)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  return gulp.src(scss_src)
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('./serve/'));
});

gulp.task('default', function() {
    browserSync.init({
        server: "./",
        index: "playground.html"
    });

    gulp.watch("scss/*.scss", ['dev']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

