'use strict';

var expect = require('chai').expect;
var testUtil = require('../testUtils');
var beanstream = testUtil.getTestBeanstream();

describe("api", function() {
  describe("reports", function() {
    it('Should successfully get a record', function(done) {
      var cardPayment = {
        order_number: testUtil.getOrderNum("reports"),
        amount:6.00,
        payment_method:"card",
        card:{
          name:"John Doe",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        }
      };
      beanstream.payments.makePayment(cardPayment)
        .then(function(response){
          expect(response).to.have.property('approved', '1');
          expect(response).to.have.property('type', 'P');
        })
        .then(function() {
          var start = new Date();
          start.setHours(start.getHours()-4-8);
          var end = new Date();
          end.setHours(end.getHours()+2-8); // -8 to convert to PDT, the time the test account is in
          
          return beanstream.reports.query(start.toISOString(), end.toISOString(), 1, 3);
        })
        .then(function(response) {
          expect(response).to.not.be.null;
          expect(response).to.have.property('records');
          expect(response.records).to.be.an('array');
          expect(response.records).to.have.length.within(1,3);
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it('Should successfully get a record with criteria', function(done) {
      var cardPayment = {
        order_number: testUtil.getOrderNum("reports"),
        amount:6.00,
        payment_method:"card",
        card:{
          name:"John Doe",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        }
      };
      
      var transId;

      beanstream.payments.makePayment(cardPayment)
        .then(function(response){
          expect(response).to.have.property('approved', '1');
          expect(response).to.have.property('type', 'P');
          transId = response.id;
        })
        .then(function() {

          var Reports = require('../../lib/api/reports');

          var start = new Date();
          start.setHours(start.getHours()-4-8);
          var end = new Date();
          end.setHours(end.getHours()+2-8); // -8 to convert to PDT, the time the test account is in
          
          var criteria = [
            {
              field: Reports.FIELDS.TransactionId,
              operator: Reports.OPERATORS.Equals,
              value: transId
            }
          ];

          return beanstream.reports.query(start.toISOString(), end.toISOString(), 1, 10, criteria);
        })
        .then(function(response) {
          expect(response).to.not.be.null;
          expect(response).to.have.property('records');
          expect(response.records).to.be.an('array');
          expect(response.records).to.have.length(1);
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
  });
});