/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2014 Upstage.
 * Licensed under the MIT License (MIT).
 */

var _ = require('lodash');
var i18n = require('./lib/i18n');

var options = {
  stage: 'options:post:configuration'
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

  var opts = params.assemble.options.i18n;
  grunt.verbose.writeln('Options: '.bold, require('util').inspect(opts));

  if (opts) {
    var o = {};
    var data = opts.data;
    var templates = opts.templates;
    var languages = opts.languages;

    if (templates) {
      o.templates = templates;
    }

    if (languages) {
      o.languages = languages;
    }

    var pages = i18n(data, o);

    grunt.verbose.writeln('Pages: '.bold, require('util').inspect(pages));
    params.assemble.options.pages = _.extend({}, (params.assemble.options.pages || {}), pages);

  }

  callback();
};

module.exports.options = options;