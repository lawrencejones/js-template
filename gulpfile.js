'use strict';

const path        = require('path');

const gulp        = require('gulp');
const taskMaker   = require('gulp-helpers').taskMaker(gulp);
const runSequence = require('gulp-helpers').framework('run-sequence');

const config = {
  output: 'dist/',  // output directory for compiled assets
  jsSource: ['!client/system.config.js', 'client/**/*.js'],  // all client javascript
  json: 'client/**/*.json',  // all client json
  html: 'client/**/*.html',  // all client html
  jspm: 'jspm_packages',  // location of jspm packages
  systemConfig: 'client/system.config.js',  // SystemJS configuration file
  assets: 'client/assets/**',  // media assets for client
  watch: 'client/**',  // watch pattern that triggers server reload
};

taskMaker.defineTask('babel', {
  taskName: 'babel',
  src: config.jsSource,
  dest: config.output,
  ngAnnotate: true,
  compilerOptions: {modules: 'system'},
});

taskMaker.defineTask('copy', {taskName: 'systemConfig', src: config.systemConfig, dest: config.output});
taskMaker.defineTask('copy', {taskName: 'assets', src: config.assets, dest: path.join(config.output, 'assets')});
taskMaker.defineTask('copy', {taskName: 'json', src: config.json, dest: config.output});
taskMaker.defineTask('copy', {taskName: 'html', src: config.html, dest: config.output});

taskMaker.defineTask('watch', {taskName: 'watch', src: config.watch, tasks: ['compile']});

taskMaker.defineTask('clean', {taskName: 'clean', src: config.output});

taskMaker.defineTask('browserSync', {
  taskName: 'serve',
  historyApiFallback: true,
  config: {
    open: false,
    port: process.env.PORT || 4567,
    server: {
      baseDir: [config.output],
      routes: {
        '/system.config.js': config.systemConfig,
        '/jspm_packages': config.jspm,
      },
    },
  },
});

gulp.task('compile', ['babel', 'systemConfig', 'assets', 'json', 'html']);
gulp.task('recompile', (cb) => { runSequence('clean', 'compile', cb) });

gulp.task('run', ['recompile', 'serve', 'watch']);

gulp.task('default', ['run']);
