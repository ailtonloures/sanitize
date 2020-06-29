"use strict"

const gulp = require('gulp');
const minify = require('gulp-minify');

gulp.task("minify", () => {
    return gulp.src("./src/sanitize.js")
        .pipe(minify())
        .pipe(gulp.dest("./dist"));
});