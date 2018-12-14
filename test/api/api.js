require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));
var expect = require('chai').expect;
var api = require('../../lib/api/api')();

describe("beanstream", function() {
  describe("api", function() {
    it('Should base64 encode passcode and api key', function() {
      return expect(api._encode("mid", "passcode")).to.equal('bWlkOnBhc3Njb2Rl');
    });
  })
});