var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');


module.exports = function(grunt) {
  return function (filepath) {
    return _.each(file.readJSONSync(filepath).languages, function (lang, index, list) {
      _.each(file.expand('**.hbs').map(function (page) {
        var ext = path.extname(page);
        return {
          filename: page.replace(ext, "-" + lang + ext),
          content: grunt.file.read(page),
          data: {
            language: lang
          }
        };
      }), function (page) {
        list.push(page);
      });
      return list;
    });
  }
};