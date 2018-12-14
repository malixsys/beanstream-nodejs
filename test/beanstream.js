'use strict';

require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));
var expect = require('chai').expect;
var beanstream = require('../lib/beanstream')('56789', 'abc123');

describe("beanstream", function() {
  describe("config", function() {

    it('Should have set merchantId in constructor', function() {
      return expect(beanstream.getConfigField("merchantId")).to.equal('56789');
    });
    it('Should have set payments api key in constructor', function() {
      return expect(beanstream.getConfigField("paymentsApiKey")).to.equal('abc123');
    });
    it('Should have set payments API Key in constructor', function() {
      return expect(beanstream.getConfigField("paymentsApiKey")).to.equal('abc123');
    });
    it('Should have default version', function() {
      return expect(beanstream.getConfigField("apiVersion")).to.equal('v1');
    });
    it('Should have default host', function() {
      return expect(beanstream.getConfigField("host")).to.equal('https://www.beanstream.com/api/');
    });
    it('Should have default timeout', function() {
      return expect(beanstream.getConfigField("timeout")).to.equal(120000);
    });
    it('Should set version', function() {
      beanstream.setApiVersion("v2");
      return expect(beanstream.getConfigField("apiVersion")).to.equal('v2');
    });
    it('Should set host', function() {
      beanstream.setHost("https://example.com");
      return expect(beanstream.getConfigField("host")).to.equal('https://example.com');
    });
    it('Should set merchantID', function() {
      beanstream.setMerchantId("12345");
      return expect(beanstream.getConfigField("merchantId")).to.equal('12345');
    });
    it('Should set payments API key', function() {
      beanstream.setPaymentsApiKey("payKey");
      return expect(beanstream.getConfigField("paymentsApiKey")).to.equal('payKey');
    });
    it('Should set reports API key', function() {
      beanstream.setReportsApiKey("reportKey");
      return expect(beanstream.getConfigField("reportsApiKey")).to.equal('reportKey');
    });
    it('Should set profile API key', function() {
      beanstream.setProfilesApiKey("profileKey");
      return expect(beanstream.getConfigField("profilesApiKey")).to.equal('profileKey');
    });
    it('Should set timeout', function() {
      beanstream.setTimeout(1);
      return expect(beanstream.getConfigField("timeout")).to.equal(1);
    });
    it('Should define payments API', function() {
      return expect(beanstream.payments).to.not.be.null;
    });
  });
});