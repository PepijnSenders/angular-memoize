var gulp = require('gulp');
var karma = require('gulp-karma');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');

var bower = 'tests/lib/bower_components';

var testFiles = [
  bower + '/angular/angular.js',
  bower + '/angular-mocks/angular-mocks.js',
  'tests/specs/**/*.js',
  'src/memoizeApp.js',
  'src/**/*.js'
];

gulp.task('test', ['eslint'], function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'tests/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('eslint', function() {
  return gulp.src([
      'src/memoizeApp.js',
      'src/**/*.js'
    ])
    .pipe(eslint({
      configFile: './eslint.conf.json'
    }))
    .pipe(eslint.format('stylish'));
});

gulp.task('bundle', ['test'], function() {
  return gulp.src([
    'src/memoizeApp.js',
    'src/**/*.js'
  ])
  .pipe(ngAnnotate())
  .pipe(concat('angular-memoize.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('uglify', ['bundle'], function() {
  return gulp.src([
    'dist/angular-memoize.js'
  ])
  .pipe(uglify())
  .pipe(rename('angular-memoize.min.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['uglify', 'eslint']);
