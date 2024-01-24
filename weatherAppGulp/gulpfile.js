const {task, src, dest, series, parallel, watch} = require('gulp')
const uglify = require('gulp-uglify');
const concat = require("gulp-concat");
const clean_css = require("gulp-clean-css");
const fs = require("fs");
const browserSync = require('browser-sync').create();

task('js', () => {
    return src("src/js/**/*.js")
        .pipe(concat("bundle.min.js"))
        .pipe(uglify())
        .pipe(dest("dist"))
        .pipe(browserSync.stream());
})

task('css', () => {
    return src("src/css/**/*.css")
        .pipe(concat("style.min.css"))
        .pipe(clean_css())
        .pipe(dest("dist"))
        .pipe(browserSync.stream());
})

task('html', () => {
    return src('src/*.html')
        .pipe(dest('dist'));
})

task('clean', (cb) => {
    fs.rm('./dist', {recursive: true, force: true}, cb)
});

task('dev', () => {
    browserSync.init({
        server: "./dist"
    });

    watch('src/*.html', series('html')).on('change', browserSync.reload);;
    watch('src/css/**/*.css', series('css'));
    watch('src/js/**/*.js', series('js'));
})

task('build', series('clean', parallel('js', 'css', 'html')));

task('default', series('build', 'dev'))
// exports.default = function() {
//     return gulp.src('./src/js/**.js')
//         .pipe(browserify())
//         .pipe(gulp.dest('./dist/js'));
// }npm install --save-dev gulp del