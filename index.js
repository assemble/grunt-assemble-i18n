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

  var opt = params.assemble.options.i18n;
  grunt.verbose.writeln('Options'.bold, require('util').inspect(opt));

  if (opt) {
    var data = opt.data;
    var patterns = opt.patterns;

    var pages = {};
    if (patterns) {
      patterns = { patterns: patterns };
      pages = i18n(data, patterns);
    } else {
      pages = i18n(data);
    }

    params.assemble.options.pages = pages; //_.extend({}, params.assemble.options.pages, pages);

  }

  callback();
};

module.exports.options = options;