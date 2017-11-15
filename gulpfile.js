var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean')

var config = {
  src: './src/ilazy.js',
  dist: './dist'
}

gulp.task('js', ['clean'], function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dist))
    .pipe(rename({ suffix: '.min'}))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(config.dist))
})

gulp.task('clean', function () {
  return gulp.src(config.dist, { read: false })
    .pipe(clean());
});

gulp.task('default', ['js'])