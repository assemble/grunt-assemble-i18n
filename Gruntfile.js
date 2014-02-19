'use strict';

var _u = require('underscore');
var path = require('path')

module.exports = function(grunt) {
  var pages = require('./lib/i18n')(grunt);

  // Project configuration.
  grunt.initConfig({

    i18n:     grunt.file.readJSON('data/i18n.json'),
    i18n_alt: grunt.file.readJSON('data/i18n-alt.json'),

    assemble: {
      options: {
        data: 'data/**/*.json',
        partials: 'templates/includes/*.hbs',
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',
      },
      i18n: {
        options: {
          pages: pages('data/i18n.json')
        },
        dest: '_demo/i18n/',
        src: '!*.*'
      },
      i18n_alt: {
        options: {
          language: 'fr',
          pages: '<%= i18n_alt.languages %>'
        },
        files: {'_demo/i18n-alt/': ['*.hbs']},
      }
    },
    // Before creating new files, remove files from previous build.
    clean: ['_demo/**/*.html']

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
