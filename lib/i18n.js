var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');


module.exports = function (filepath) {
  return _.each(file.readJSONSync(filepath).languages, function (lang, index, list) {
    _.each(file.expand('**.hbs').map(function (page) {
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