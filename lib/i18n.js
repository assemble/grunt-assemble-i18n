var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');
var matter = require('gray-matter');

module.exports = function () {
  var args = _.toArray(arguments);

  var options = _.isPlainObject(args[args.length - 1]) ? args.pop() : {};
  options.patterns = options.patterns || ['**.hbs'];

  var filepaths = file.arrayify(_.flatten(args));

  return _.each(filepaths, function(filepath, index, list) {
    _.each(file.readJSONSync(filepath).languages, function (lang) {
      _.each(file.expand(options.patterns).map(function (page) {
        var ext = path.extname(page);
        var parsedData = matter.read(page);
        return {
          filename: page.replace(ext, "-" + lang + ext),
          content: parsedData.content,
          data: _.assign({language: lang}, parsedData.context)
        };
      }), function (page) {
        list.push(page);
      });
    });
    return list;
  });
};
