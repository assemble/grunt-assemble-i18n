var file = require('fs-utils');

var _ = require('lodash');

_.each(grunt.file.readJSON('data/i18n.json').languages, function (lang, index, list) {
  _.each(grunt.file.expand('**.hbs').map(function (page) {
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
});