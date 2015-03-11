module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'src/upup.js',
        'Gruntfile.js'
      ],
      options: {
        jshintrc: true
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      all: {
        files: {
          'dist/upup.min.js': ['src/upup.js'],
          'dist/upup.sw.min.js': ['src/upup.sw.js'],
        }
      }
    },
    watch: {
      files: ['src/*', '!**/node_modules/**'],
      tasks: ['default'],
    },
    connect: {
      server: {
        options: {
          protocol: 'http',
          port: 8443,
          hostname: '*',
          base: '.',
          open: 'http://localhost:8443/demo'
        }
      }
    },
    markdox: {
      target: {
        files: [
          {src: 'src/upup.js', dest: 'docs/README.md'}
        ]
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdox');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);

  grunt.registerTask('dev', ['default', 'connect', 'watch']);

};