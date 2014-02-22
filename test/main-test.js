/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2014 Upstage.
 * Licensed under the MIT License (MIT).
 */

// node modules
var expect = require('chai').expect;
var file = require('fs-utils');

var initFileList = function (files) {
  var list = {};
  files.forEach(function (f) {
    list[f] = true;
  });
  return list;
};

var validateFileList = function (files, base) {
  var list = {};
  files.forEach(function (f) {
    list[f] = file.exists(base, f);
  });
  return list;
};

// tests
describe('assemble-contrib-i18n', function() {

  describe('when no plugin is used', function() {
    it('it should create four files', function() {
      var files = [
        'en.html',
        'es.html',
        'fr.html',
        'index.html'
      ];

      var expected = initFileList(files);
      var actual = validateFileList(files, 'test/actual/without-plugin');
      expect(actual).to.eql(expected);
    });
  });


  describe('when i18n plugin is used', function() {
    it('it should create three index-{lang}.html files', function() {
      var files = [
        'index-en.html',
        'index-es.html',
        'index-fr.html'
      ];

      var expected = initFileList(files);
      var actual = validateFileList(files, 'test/actual/with-plugin');
      expect(actual).to.eql(expected);
    });
  });

  describe('when i18n and permalinks plugins are used', function() {
    it('it should create three {lang}/index.html files', function() {
      var files = [
        'en/index.html',
        'es/index.html',
        'fr/index.html'
      ];

      var expected = initFileList(files);
      var actual = validateFileList(files, 'test/actual/with-permalinks');
      expect(actual).to.eql(expected);
    });
  });


});