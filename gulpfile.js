require('require-dir')('./gulp');
const gulp = require('gulp');

gulp.task('test', ['sasslint', 'eslint']);

gulp.task('dist', [
    'webpack',
    'htmlmin',
    'copy:dist'
]);

gulp.task('build', ['clean:dist', 'load:config:prod'], () =>
    gulp.run(['dist'])
);

gulp.task('build:uat', ['clean:dist', 'load:config:uat'], () =>
    gulp.run('dist')
);
