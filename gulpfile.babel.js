import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import pug from 'gulp-pug';
import stylus from 'gulp-stylus';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import watch from 'gulp-watch';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import debug from 'gulp-debug';
import bs from 'browser-sync';
import zip from 'gulp-zip';
import core from './core';
const browserSync = bs.create()

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
});

gulp.task('zip', () => {
  gulp.src('./build/*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./archive'))
})

gulp.task('js', () => {
  gulp.src('./src/js/main.js')
    .pipe(debug({title: 'JavaScript:'}))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
  gulp.src('./src/stylus/style.styl')
    .pipe(debug({title: 'Stylus:'}))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(stylus({'include css': true}))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  gulp.src('./src/pug/**/!(_)*.pug')
    .pipe(debug({title: 'Pug:'}))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  gulp.src('./src/images/**/*.*')
    .pipe(debug({title: 'images:'}))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(imagemin({
      optimizationLevel: 5,
    }))
    .pipe(gulp.dest('./build/images'))
    .pipe(browserSync.stream());
})

gulp.task('watch', () => {
  watch('./src/js/**/*.*', () => {gulp.start('js'); browserSync.reload()});
  watch('./src/stylus/**/*.*', () => {gulp.start('css'); browserSync.reload()});
  watch('./src/pug/**/*.*', () => {gulp.start('html'); browserSync.reload()});
  watch('./src/fonts/**/*.*', () => {gulp.start('fonts'); browserSync.reload()});
  watch('./src/images/**/*.*', () => {gulp.start('images'); browserSync.reload()});
  watch('./src/vendor/**/*.*', () => {gulp.start('vendor'); browserSync.reload()});
})

gulp.task('fonts', () => gulp.src('./src/fonts/**/*.*').pipe(gulp.dest('./build/fonts')))
gulp.task('vendor', () => gulp.src('./src/vendor/**/*.*').pipe(gulp.dest('./build/vendor')))

gulp.task('default', ['js', 'css', 'html', 'fonts', 'vendor', 'images', 'browser-sync', 'watch'])
gulp.task('build', ['js', 'css', 'html', 'fonts', 'vendor', 'images'])
