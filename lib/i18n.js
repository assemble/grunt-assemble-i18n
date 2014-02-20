var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');
var matter = require('gray-matter');

module.exports = function () {
  var args = _.toArray(arguments);

  // If the last argument is an object, assume it's options and
  // remove it from the array.
  var options = _.isPlainObject(args[args.length - 1]) ? args.pop() : {};

  // Specify the template(s) to use for each language
  options.templates = options.templates || ['templates/*.hbs'];

  var pages = {};

  // Expand given filepaths
  var filepaths = file.expand(args);

  _.each(filepaths, function (filepath, index) {

    // Read in the data from each file
    var data = file.readDataSync(filepath);

    // Iterate over the languages
    data.languages.forEach(function (language) {

      // Expand the templates
      var templates = file.expand(options.templates);

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
  });

  return pages;
};
