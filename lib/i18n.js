var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');
var matter = require('gray-matter');

module.exports = function (data, options) {
  // Specify and exapnd the template(s) to use for each language
  var templates = file.expand(options.templates = options.templates || ['templates/*.hbs']);

  var pages = {};

  var process = function (languages, i18n) {
    // Iterate over the languages
    languages.forEach(function (language) {

      templates.forEach(function (page) {
        var ext = path.extname(page);
        var pageObj = matter.read(page);
        console.log('i18n', i18n);

        // add languages to i18n of page context
        i18n = _.extend({}, i18n, {languages: languages});

        var context = _.extend({}, {language: language, i18n: i18n}, pageObj.context);
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
    var i18n = {};
    _.each(filepaths, function (filepath, index) {

      // Read in the data from each file
      var data = file.readDataSync(filepath);

      if (data.languages) {
        options.languages = _.union(data.languages || [], options.languages || []);
      } else {
        var languageKey = path.basename(filepath, path.extname(filepath));
        i18n[languageKey] = data;
      }
    });
    process(options.languages, i18n);
  } else {
    process(options.languages);
  }

  return pages;
};
