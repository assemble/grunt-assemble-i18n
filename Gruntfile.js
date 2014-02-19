'use strict';

var _u = require('underscore');
var path = require('path');

module.exports = function(grunt) {

  grunt.util._.mixin({
    read: function(src) {
      return grunt.file.readJSON(src);
    }
  });

  // Project configuration.
  grunt.initConfig({
    assemble: {
      options: {
        data: 'data/**/*.json',
        partials: 'templates/includes/*.hbs',
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',
      },
      i18n: {
        options: {
          pages: _u.each(
            grunt.file.readJSON('data/i18n.json').languages, function(lang, index, list) {
              _u.each(
                grunt.file.expand('**.hbs').map(function(page) {
                  var ext = path.extname(page);
                  return {filename: page.replace(ext, "-" + lang + ext), content: grunt.file.read(page), data: {language: lang}};
                }), function(page) {
                    list.push(page);
                }
              );
            }
          )
        },
        //files: {'_demo/i18n/': ['*.hbs']},
        dest: '_demo/i18n/',
        src: '!*.*'
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
