const gulp = require('gulp');
const config = require('./config.json');

gulp.task('clean:dist', () => require('del')(config.clean.dist));

gulp.task('webpack', () =>
    gulp.src('src/app.module.js')
        .pipe(require('webpack-stream')(require('../webpack.prod.js'), require('webpack')))
        .pipe(gulp.dest('dist/assets'))
);

gulp.task('copy:dist', () => 
    gulp.src(config.copy.dist.src).
        pipe(gulp.dest(config.copy.dist.dest))
);

gulp.task('htmlmin', () =>
    gulp.src(config.htmlmin.src)
        .pipe(require('gulp-replace')('@version', `v=${Date.now()}`))
        .pipe(require('gulp-htmlmin')(config.htmlmin.options))
        .pipe(gulp.dest(config.htmlmin.dest))
);
