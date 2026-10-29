module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['src/upup.js', 'Gruntfile.js'],
      options: {
        jshintrc: true,
      },
    },
    uglify: {
      options: {
        output: {
          comments: /^\! /,
        },
        sourceMap: true,
      },
      all: {
        files: {
          'dist/upup.min.js': ['src/upup.js'],
          'dist/upup.sw.min.js': ['src/upup.sw.js'],
        },
      },
    },
    connect: {
      server: {
        options: {
          protocol: 'http',
          port: 8443,
          hostname: '*',
          base: '.',
          open: 'http://localhost:8443/demo',
        },
      },
    },
    cssmin: {
      combine: {
        files: {
          'demo/css/online.min.css': ['demo/css/online.css'],
        },
      },
    },
  });

  // Load NPM Tasks
  require('load-grunt-tasks')(grunt);
  require('./tasks/build')(grunt);

  // Default task(s).
  grunt.registerTask('default', [
    'jshint',
    'uglify',
    'markdox',
    'cssmin',
    'compress',
  ]);

  grunt.registerTask('devwatcher', ['jshint', 'uglify', 'cssmin']);

  grunt.registerTask('dev', ['default', 'connect', 'watch']);
};
