var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

var browserSupport = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 31',
    'chrome >= 36',
    'safari >= 6',
    'ios >= 6',
    'android >= 4'
];

gulp.task('sass', function () {
  return gulp.src(['./sources/scss/*.scss'])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer(browserSupport))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './public/'
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function() {
    gulp.watch("./sources/scss/*.scss", ['sass', browserSync.reload]);
    gulp.watch('./public/*.html', browserSync.reload);
});
