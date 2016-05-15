// Include Gulp and all required plugins

var gulp = require('gulp');
var less = require('gulp-less');
var lessGlob = require('less-plugin-glob');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var sourcePath = 'src/styles/';
var targetPath = 'www/css';

// Create gulp task named 'less' that
// will take 'styles.less' file from 'sourcePath' folder, 
// compress it,
// add browser specific prefixes,
// minify it,
// save result CSS file into 'targetPath' folder

// Добавил плагин less-plugin-glob для glob-паттернов.
// 
// Временно исключил: .pipe(minifyCSS({keepBreaks: false}))
// 
// И временно отключил компрессию less-файлов.

gulp.task('less', function () {
  return gulp.src( [sourcePath + '/styles.less'] )
    .pipe(less({
      plugins: [lessGlob],
      compress: false
    }).on('error', gutil.log))
    .pipe(autoprefixer('last 10 versions', 'ie 7', 'ie 8', 'ie 9'))
    
    .pipe(gulp.dest(targetPath));
});

// Automate the task
gulp.task('watch', function() {
  gulp.watch([sourcePath + '/**/*.less'], ['less']);
});

// Combine scripts
gulp.task('scripts', function() {
  return gulp.src([
  	'bower_components/jquery/dist/jquery.slim.min.js',
  	'bower_components/bootstrap/dist/js/bootstrap.min.js'
	])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('www/js/'));
});