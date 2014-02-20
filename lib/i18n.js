var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');
var matter = require('gray-matter');

module.exports = function () {
  var args = _.toArray(arguments);

  var options = _.isPlainObject(args[args.length - 1]) ? args.pop() : {};
  options.patterns = options.patterns || ['**.hbs'];

  var filepaths = file.arrayify(_.flatten(args));

  var pages = {};
  _.each(filepaths, function(filepath, index) {
    _.each(file.readDataSync(filepath).languages, function (lang) {
      _.each(file.expand(options.patterns).map(function (page) {
        var ext = path.extname(page);
        var parsedData = matter.read(page);
        return {
          filename: page.replace(ext, "-" + lang + ext),
          content: parsedData.content,
          data: _.assign({language: lang}, parsedData.context)
        };
      }), function (page) {
        pages[page.filename] = page;
      });
    });
  });
  return pages;
};
