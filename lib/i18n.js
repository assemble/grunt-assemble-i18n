var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');


module.exports = function () {
  var args = _.toArray(arguments);

  var options = _.isPlainObject(args[args.length - 1]) ? args.pop() : {};
  options.patterns = options.patterns || ['**.hbs'];

  var filepath = args;

  return _.each(file.readJSONSync(filepath).languages, function (lang, index, list) {
    _.each(file.expand(options.patterns).map(function (page) {
      var ext = path.extname(page);
      return {
        filename: page.replace(ext, "-" + lang + ext),
        content: file.readFileSync(page),
        data: {
          language: lang
        }
      };
    }), function (page) {
      list.push(page);
    });
    return list;
  });
};