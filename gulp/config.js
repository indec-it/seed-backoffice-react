const gulp = require('gulp');

const loadConfig = environment => require('dotenv').load({path: `.env-${environment}`});

gulp.task('load:config:uat', () => loadConfig('uat'));
gulp.task('load:config:prod', () => loadConfig('prod'));
