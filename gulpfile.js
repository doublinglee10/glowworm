var gulp = require('gulp');
var inlineResources = require('./scripts/gulp/inline-resources');
var sass = require('gulp-sass');


gulp.task('copy-and-inline-resource', copyHtml);

function copyHtml() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./lib/')).on('end', copyScss);
}

function copyAssets() {
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/assets')).on('end', copyScss);
}

function copyScss() {
    gulp.src('./src/**/*.css')
        .pipe(gulp.dest('./lib')).on('end', inlineResource);
}

function inlineResource() {
    inlineResources('./lib');
}

gulp.task('default', ['copy-and-inline-resource']);