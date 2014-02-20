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

  // Expand given filepaths
  var filepaths = file.expand(args);

  return _.each(filepaths, function (filepath, index, list) {

    // Read in the data from each file
    var data = file.readDataSync(filepath);

    // Iterate over the languages
    data.languages.forEach(function (language) {

      // Expand the templates
      var templates = file.expand(options.templates);

      templates.map(function (page) {
        var ext = path.extname(page);
        var pageObj = matter.read(page);

        var expandedData = _.mapValues(pageObj.context, function (value) {
          return _.template(value, {language: language});
        });

        var context = _.extend({}, {language: language}, expandedData);

        list.push({
          filename: page.replace(ext, "-" + language + ext),
          content: pageObj.content,
          data: context
        });
      });
    });
    return list;
  });
};
