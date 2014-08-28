/**
 * Handlebars Helpers Tests: i18n Helpers
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

// node_modules
var expect = require('chai').expect;
var Handlebars = require('handlebars');

// Local helpers
var helper = require('../lib/helpers/helpers-i18n');

var context = {
  language: 'en',
  en: {
    key: 'value'
  },
  fr: {
    key: 'valeur'
  }
};

Handlebars.registerHelper(helper);

describe('i18n helper', function () {
  describe('{{#i18n}}', function () {
    it('should take a key and return for the default language', function () {
      var source = '{{#i18n "key"}}{{/i18n}}';
      var template = Handlebars.compile(source);
      expect(template(context)).to.eql('value');
    });
    it('should take a key and return for the override language', function () {
      var source = '{{#i18n "key" language="fr"}}{{/i18n}}';
      var template = Handlebars.compile(source);
      expect(template(context)).to.equal('valeur');
    });
  });
});
