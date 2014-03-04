/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2014 Upstage.
 * Licensed under the MIT License (MIT).
 */

// Node.js
var path = require('path');

// node modules
var expect = require('chai').expect;
var cheerio = require('cheerio');
var file = require('fs-utils');

/**
 * Initilize an object of {filename: true}
 * pairs used for expect later
 * 
 * @param  {[Array]} files - List of base files
 * @return {[Object]}      - Object of {filename: true}
 */
var initFileList = function (files) {
  var list = {};
  files.forEach(function (f) {
    list[f.filename] = true;
  });
  return list;
};

/**
 * Validate that each file in the list exists.
 * 
 * @param  {[Object]} files - List of base files
 * @param  {[String]} base  - Base path to look for filenames
 * @return {[Object]}       - Object of {filename: (true|false)}
 */
var validateFileListExists = function (files, base) {
  var list = {};
  files.forEach(function (f) {
    list[f.filename] = file.exists(base, f.filename);
  });
  return list;
};

var validateLanguageAttribute = function (files, base) {
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    var filepath = path.join(base, f.filename);
    var contents = file.readFileSync(filepath);
    var $ = cheerio.load(contents);
    var actual = $('html[lang="' + f.language + '"]');
    expect(actual.length).to.eql(1);
  };
};

// tests
describe('assemble-contrib-i18n', function() {

  describe('when no plugin is used', function() {

    // this metadata shows there are some issues
    // with the regular data or front-matter
    // when adding pages through the pages collection
    // on assemble options
    var metadata = [
      { filename: 'en.html', language: 'fr' },
      { filename: 'es.html', language: 'fr' },
      { filename: 'fr.html', language: 'fr' },
      { filename: 'index.html', language: 'fr' }
    ];

    it('it should create four files', function() {
      var expected = initFileList(metadata);
      var actual = validateFileListExists(metadata, 'test/actual/without-plugin');
      expect(actual).to.eql(expected);
    });

    it('it should contain a language attibute on the html tag', function() {
      validateLanguageAttribute(metadata, 'test/actual/without-plugin');
    });

  });


  describe('when i18n plugin is used', function() {

    var metadata = [
      { filename: 'index-en.html', language: 'en' },
      { filename: 'index-es.html', language: 'es' },
      { filename: 'index-fr.html', language: 'fr' }
    ];

    it('it should create three index-{lang}.html files', function() {
      var expected = initFileList(metadata);
      var actual = validateFileListExists(metadata, 'test/actual/with-plugin');
      expect(actual).to.eql(expected);
    });

    it('it should contain a language attibute on the html tag', function () {
      validateLanguageAttribute(metadata, 'test/actual/with-plugin');
    });

  });

  describe('when i18n and permalinks plugins are used', function() {

    var metadata = [
      { filename: 'en/index.html', language: 'en' },
      { filename: 'es/index.html', language: 'es' },
      { filename: 'fr/index.html', language: 'fr' }
    ];

    it('it should create three {lang}/index.html files', function() {
      var expected = initFileList(metadata);
      var actual = validateFileListExists(metadata, 'test/actual/with-permalinks');
      expect(actual).to.eql(expected);
    });

    it('it should contain a language attribute on the html tag', function () {
      validateLanguageAttribute(metadata, 'test/actual/with-permalinks');
    });

  });

  describe('when i18n plugin is used with a list of languages', function() {

    var metadata = [
      { filename: 'index-en.html', language: 'en' },
      { filename: 'index-es.html', language: 'es' },
      { filename: 'index-fr.html', language: 'fr' }
    ];

    it('it should create three index-{lang}.html files', function() {
      var expected = initFileList(metadata);
      var actual = validateFileListExists(metadata, 'test/actual/with-plugin');
      expect(actual).to.eql(expected);
    });

    it('it should contain a language attibute on the html tag', function () {
      validateLanguageAttribute(metadata, 'test/actual/with-plugin');
    });

  });
});