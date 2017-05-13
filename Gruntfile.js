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
        output: {
          comments: /^\! /
        },
        sourceMap: true
      },
      all: {
        files: {
          'dist/upup.min.js': ['src/upup.js'],
          'dist/upup.sw.min.js': ['src/upup.sw.js']
        }
      }
    },
    imagemin: {
      demoimages: {                       // Target
        options: {                        // Target options
        },
        files: [{
          expand: true,                   // Enable dynamic expansion
          cwd: 'demo/img',                // Src matches are relative to this path
          src: ['*.{png,jpg,gif}'],       // Actual patterns to match
          dest: 'demo/img'                // Destination path prefix
        }]
      }
    },
    watch: {
      files: ['src/**', 'demo/css/online.css', '!**/node_modules/**'],
      tasks: ['devwatcher']
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
    cssmin: {
      combine: {
        files: {
          'demo/css/online.min.css': ['demo/css/online.css']
        }
      }
    },
    markdox: {
      target: {
        files: [
          {src: 'src/upup.js', dest: 'docs/README.md'}
        ]
      }
    },
    compress: {
      main: {
        options: {
          archive: 'dist/upup.zip'
        },
        files: [
          {expand: true, cwd: 'dist', src: ['*.js']}
        ]
      }
    }
  });

  // Load NPM Tasks
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'markdox', 'imagemin', 'cssmin', 'compress']);

  grunt.registerTask('devwatcher', ['jshint', 'uglify', 'cssmin']);

  grunt.registerTask('dev', ['default', 'connect', 'watch']);

};
