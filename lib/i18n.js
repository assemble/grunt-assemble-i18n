var _ = require('lodash');
var path = require('path');
var file = require('fs-utils');
var matter = require('gray-matter');

module.exports = function (data, options) {
  // Specify and exapnd the template(s) to use for each language
  var templates = file.expand(options.templates = options.templates || ['templates/*.hbs']);

  var pages = {};

  var languages = options.languages || [];

  var process = function () {
    var i18n = [];

    //Adds the i18n context
    languages.forEach(function (language) {
      i18n[language] = _.extend({}, data[language]);
    });

    // Iterate over the languages
    languages.forEach(function (language) {

      templates.forEach(function (page) {
        var ext = path.extname(page);
        var pageObj = matter.read(page);
        var i18nContext;

        i18n = _.extend({}, i18n, {languages: languages});
        i18nContext = {language: language, i18n: i18n};

        pageObj.context = JSON.parse(_.template(JSON.stringify(pageObj.context))(i18nContext));

        var context = _.extend({}, data, i18nContext, pageObj.context);
        var filename = page.replace(ext, "-" + language + ext);

        pages[filename] = {
          filename: filename,
          content: pageObj.content,
          data: context
        };

      });
    });
  };

  if (options.data) {
    var filepaths = file.expand(options.data);

    _.each(filepaths, function (filepath, index) {

      // Read in the data from each file
      var i18nData = file.readDataSync(filepath);

      if (i18nData.languages) {
        languages = _.union(languages, i18nData.languages || []);
      } else {
        var languageKey = path.basename(filepath, path.extname(filepath));
        data[languageKey] = i18nData;
      }
    });
  }

  process();

  return pages;
};
