'use strict';

module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    assemble: {
      options: {
        flatten: true,
        prettify: {
          indent: 2,
          condense: true,
          newlines: true
        },
        assets: '_demo/assets',
        helpers: 'templates/helpers/*.js',
        partials: 'templates/includes/*.hbs',
        data: 'templates/data/**/*.json',
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',
      },
      i18n: {
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
