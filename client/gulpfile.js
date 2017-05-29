var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var sass = require('gulp-sass')

gulp.task('js', function () {
  gulp.src([
    'app.js',
    'components/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/'))
})

gulp.task('styles', function () {
  gulp.src('assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/'))
})

gulp.task('watch', ['js', 'styles'], function () {
  gulp.watch(['./**/*.js', '!./build/*.js'], ['js'])
  gulp.watch(['./assets/sass/**/*.scss'], ['styles'])
})
