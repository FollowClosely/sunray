var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps');

var rootDir = './',
    cssDest = 'assets/css/',
    sassSrc = 'assets/css/sass/screen.scss',
    sassGlob = 'assets/css/sass/**/*.scss',
    jsDest = 'assets/js/',
    jsSrc = 'assets/js/main.js',
    jsGlob = 'assets/js/**/*.js';

gulp.task('compile:css', function(){
  return gulp
    .src(sassSrc)
    .pipe(sourcemaps.init())
    // .pipe(sass().on('error', sass.logError))
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDest));
});

gulp.task('watch', function(){
  gulp.watch(sassGlob, ['compile:css']);
});

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: rootDir
    }
  });
  gulp.watch(sassGlob, ['compile:css']).on('change', browserSync.reload);
  gulp.watch(jsGlob, []).on('change', browserSync.reload);
  gulp.watch(rootDir + '**/*.html', []).on('change', browserSync.reload);
});

gulp.task('default', ['compile:css', 'serve'], function(){
  console.log(' glug glug glug... \n\n');
});
