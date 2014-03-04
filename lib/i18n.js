var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');
var matter = require('gray-matter');

module.exports = function (data, options) {
  // Specify and exapnd the template(s) to use for each language
  var templates = file.expand(options.templates = options.templates || ['templates/*.hbs']);

  var pages = {};

  var process = function (languages) {
    // Iterate over the languages
    languages.forEach(function (language) {

      templates.forEach(function (page) {
        var ext = path.extname(page);
        var pageObj = matter.read(page);

        var context = _.extend({}, {language: language}, pageObj.context);
        var filename = page.replace(ext, "-" + language + ext);

        pages[filename] = {
          filename: filename,
          content: pageObj.content,
          data: context
        };

      });
    });
  }

  // Expand given filepaths
  if (data) {
    var filepaths = file.expand(data);
    _.each(filepaths, function (filepath, index) {

      // Read in the data from each file
      var data = file.readDataSync(filepath);

      if (data.languages) {
        options.languages = data.languages;
      }
      process(options.languages);
    });
  } else {
    process(options.languages);
  }

  return pages;
};
