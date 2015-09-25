/*!
 * grunt-assemble-i18n <https://github.com/assemble/grunt-assemble-i18n>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var _ = require('lodash');
var i18n = require('./lib/i18n');
var helper = require('handlebars-helper-i18n');

var options = {
  stage: 'assemble:post:data'
};

/**
 * postprocess
 * @param  {Object}   params
 * @param  {Function} callback
 */
module.exports = function (params, callback) {
  'use strict';

  var grunt = params.grunt;

  grunt.verbose.subhead('Running:'.bold, '"assemble-contrib-i18n"');
  grunt.verbose.writeln('Stage:  '.bold, '"' + params.stage + '"\n');

  grunt.verbose.writeln('Loading the i18n helper');
  params.assemble.engine.registerFunctions(helper.i18n);

  var opts = params.assemble.options.i18n;
  grunt.verbose.writeln('Options: '.bold, require('util').inspect(opts));

  if (opts) {
    var o = {};
    var data = params.assemble.options.data;
    var templates = opts.templates;
    var languages = opts.languages;
    var defaultLanguage = opts.defaultLanguage;

    if (opts.data) {
       o.data = opts.data;
    }

    if (templates) {
      o.templates = templates;
    }

    if (languages) {
      o.languages = languages;
    }

    if (defaultLanguage) {
      o.defaultLanguage = defaultLanguage;
    }

    var pages = i18n(data, o);

    grunt.verbose.writeln('Pages: '.bold, require('util').inspect(pages));
    params.assemble.options.pages = _.extend({}, (params.assemble.options.pages || {}), pages);

  }

  callback();
};

module.exports.options = options;
