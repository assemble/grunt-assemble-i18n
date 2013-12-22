'use strict';

module.exports = function(grunt) {

  grunt.util._.mixin({
    read: function(src) {
      return grunt.file.readJSON(src);
    }
  });

  // Project configuration.
  grunt.initConfig({

    i18n: grunt.file.readJSON('data/i18n.json'),

    assemble: {
      options: {
        data: 'data/**/*.json',
        partials: 'templates/includes/*.hbs',
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',
      },
      i18n: {
        options: {
          language: 'fr',
          pages: '<%= i18n.languages %>'
        },
        files: {'_demo/': ['*.hbs']},
      },
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
