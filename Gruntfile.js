module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'src/upupup.js',
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
          'dist/upupup.min.js': ['src/upupup.js']
        }
      }
    },
    watch: {
      files: ['src/upupup.js', '!**/node_modules/**'],
      tasks: ['default'],
    },
    connect: {
      server: {
        options: {
          protocol: 'https',
          port: 8443,
          hostname: '*',
          base: '.',
          open: 'https://localhost:8443/demo'
        }
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);

  grunt.registerTask('dev', ['default', 'connect', 'watch']);

};