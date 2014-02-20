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
    _.each(file.readDataSync(filepath).languages, function (lang) {
      _.each(file.expand(options.patterns).map(function (page) {
        var ext = path.extname(page);
        var parsedData = matter.read(page);
        var sysData = {
          language: lang
        };
        var renderedFrontMatterData = _.mapValues(parsedData.context, function(value) {
          return _.template(value, sysData);
        });
        var renderedData = _.assign(sysData, renderedFrontMatterData);
        return {
          filename: page.replace(ext, "-" + lang + ext),
          content: parsedData.content,
          data: renderedData
        };
      }), function (page) {
        list.push(page);
      });
    });
    return list;
  });
};
