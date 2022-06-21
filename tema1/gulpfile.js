const gulp = require('gulp')
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')

function style() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(concat('main.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css'))
}

function watch() {
  gulp.watch('./scss/**/*.scss', style)
}

exports.style = style;
exports.watch = watch;