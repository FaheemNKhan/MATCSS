let gulp    = require('gulp'),
    render  = require('gulp-nunjucks-render'),
    bs      = require('browser-sync').create();
    
gulp.task('nj', () => {
  return gulp.src('src/pages/**/*.+(html)')
  .pipe(render({
      path: ['src/templates']
    }))
  .pipe(gulp.dest('components'));  
});

gulp.task("browser-sync", () => {
    bs.init({
        server: {
            baseDir: './',
            index: 'components/banner.html'
        }
    });
  
    gulp.watch('src/', gulp.series('nj'))
    gulp.watch("components/*.html").on('change', bs.reload);
});
  
gulp.task('default', gulp.series('browser-sync'));

//gulp.task('default', gulp.series('nj', 'js'));