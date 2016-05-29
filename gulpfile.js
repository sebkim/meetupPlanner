var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('minify-html', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', function() {
  return gulp.src('css/**/*.css')
  .pipe(cssmin())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist/css'))
});

gulp.task('minify-js1', function() {
  return gulp.src('js/index.js')
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-js2', function() {
  return gulp.src(['js/main.js', 'js/idb.js'])
  .pipe(concat('main-idb.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['minify-js1', 'minify-js2']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('*.html', ['minify-html']);
});

gulp.task('default',['minify-html', 'minify-css', 'minify-js1', 'minify-js2']);
