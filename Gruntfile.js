'use strict';

module.exports = function(grunt) {
  var pages = require('./lib/i18n');

  var read = function(src) {
    return grunt.file.readJSON(src);
  };

  grunt.util._.mixin({
    read: read,
    expand: function(src) {
      return grunt.file.expand(src).map(read);
    }
  });

  // Project configuration.
  grunt.initConfig({

    i18n_alt: grunt.file.readJSON('test/fixtures/data/i18n-alt.json'),

    assemble: {
      options: {
        data: 'test/fixtures/data/**/*.json',
        flatten: true,
        partials: 'test/fixtures/templates/includes/*.hbs',
        layoutdir: 'test/fixtures/templates/layouts',
        layout: 'default.hbs'
      },

      "without-plugin": {
        options: {
          language: 'fr',
          pages: '<%= i18n_alt.languages %>'
        },
        files: {'test/actual/without-plugin/': ['test/fixtures/templates/without-plugin/*.hbs']},
      },

      "with-plugin": {
        options: {
          plugins: ['./index.js'],
          i18n: {
            data: ['test/fixtures/data/i18n.json'],
            templates: ['test/fixtures/templates/*.hbs']
          }
        },
        dest: 'test/actual/with-plugin/',
        src: '!*.*'
      },

      "with-permalinks": {
        options: {
          plugins: ['./index.js', 'assemble-contrib-permalinks'],
          i18n: {
            data: 'test/fixtures/data/i18n.json',
            templates: ['test/fixtures/templates/*.hbs']
          },
          permalinks: {
            structure: ':language/index.html'
          }
        },
        dest: 'test/actual/with-permalinks/',
        src: '!*.*'
      },

      "with-list-of-languages": {
        options: {
          plugins: ['./index.js'],
          i18n: {
            languages: ["en", "fr", "es"],
            templates: ['test/fixtures/templates/*.hbs']
          }
        },
        dest: 'test/actual/with-list-of-languages/',
        src: '!*.*'
      }

    },

    /**
     * Run mocha tests.
     */
    mochaTest: {
      tests: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*-test.js']
      }
    },

    // Before creating new files, remove files from previous build.
    clean: ['test/actual/**/*.html']

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble', 'test']);
};
