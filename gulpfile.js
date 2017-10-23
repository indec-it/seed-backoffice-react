require('require-dir')('./gulp');
const gulp = require('gulp');

gulp.task('test', ['sasslint', 'eslint']);

gulp.task('dist', [
    'webpack',
    'htmlmin',
    'copy:dist',
    'package'
]);

gulp.task('build', ['clean:dist'], () =>
    gulp.run(['dist', 'config:prod'])
);

gulp.task('build:uat', ['clean:dist'], () =>
    gulp.run(['dist', 'config:uat'])
);
