'use strict';

var expect = require('chai').expect;
var testUtil = require('../testUtils');
var beanstream = testUtil.getTestBeanstream();

describe("api", function() {
  describe("profiles", function() {
    it('Should successfully create a profile', function(done) {
      var profile = {
        card:{
          name:"Jon Profile",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        },
        billing: {
          name: "Jon Profile",
          address_line1: "123 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it('Should successfully create a profile with a token', function(done) {
      var card = {
          name:"Jon Profile",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        };
      
      testUtil.tokenizeCard(card)
        .then(function(response){
          expect(response).to.have.property('token');
          var profile = {
            token: {
              name: "Jon Profile",
              code: response.token
            },
            billing: {
              name: "Jon Profile",
              address_line1: "123 fake street",
              city: "victoria",
              province: "bc",
              postal_code: "V9A3Z4",
              country: "ca",
              email_address: "fake@example.com",
              phone_number:"12345678"
            }
          };
          return beanstream.profiles.createProfile(profile)
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it('Should successfully retrieve a profile', function(done) {
      var profile = {
        card:{
          name:"Jon Profile",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        },
        billing: {
          name: "Jon Profile",
          address_line1: "123 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return response.customer_code;
        })
        .then(function(profileId){
          return beanstream.profiles.getProfile(profileId);
        })
        .then(function(profile2){
          expect(profile2).to.have.property('card');
          expect(profile2.card).to.have.property('name', 'Jon Profile');
          expect(profile2.card).to.have.property('expiry_year', '19');
          expect(profile2.card).to.have.property('expiry_month', '02');
          expect(profile2).to.have.property('billing');
          expect(profile2.billing).to.have.property('name', 'Jon Profile');
          expect(profile2.billing).to.have.property('city', 'victoria');
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it('Should successfully delete a profile', function(done) {
      var profile = {
        card:{
          name:"Jon Profile",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        },
        billing: {
          name: "Jon Profile",
          address_line1: "123 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return response.customer_code;
        })
        .then(function(profileId){
          return beanstream.profiles.getProfile(profileId);
        })
        .then(function(profile2){
          expect(profile2).to.have.property('card');
          expect(profile2.card).to.have.property('name', 'Jon Profile');
          return beanstream.profiles.deleteProfile(profile2.customer_code);
        })
        .then(function(response){
          console.log("Delete response:", response);
          expect(response).to.have.property('message', 'Operation Successful');
          return beanstream.profiles.getProfile(response.customer_code);
        })
        .catch(function(error){
          expect(error).to.not.be.null;
          expect(error).to.have.property('status', 404);
          done();
        });
    });
    it('Should successfully update a profile', function(done) {
      var profile = {
        card:{
          name:"Jon Profile",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        },
        billing: {
          name: "Jon Profile",
          address_line1: "123 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return response.customer_code;
        })
        .then(function(profileId){
          return beanstream.profiles.getProfile(profileId);
        })
        .then(function(profile2){
          expect(profile2).to.have.property('card');
          expect(profile2.card).to.have.property('name', 'Jon Profile');
          profile2.billing.name = "Tester Test";
          return beanstream.profiles.updateProfile(profile2);
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          return beanstream.profiles.getProfile(response.customer_code);
        })
        .then(function(profile3){
          expect(profile3).to.have.property('billing');
          expect(profile3.billing).to.have.property('name', 'Tester Test');
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it.skip('Should successfully update a minimal profile', function(done) {
      var profile = {
        card:{
          name:"Jon Update",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        },
        billing: {
          name: "Jon Update",
          address_line1: "456 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return response.customer_code;
        })
        .then(function(profileId){
          var updatedProfile = {
            billing: {
              address_line1: "123 fake street"
            }
          };
          return beanstream.profiles.updateProfile(updatedProfile, profileId);
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          return beanstream.profiles.getProfile(response.customer_code);
        })
        .then(function(profile3){
          expect(profile3).to.have.property('billing');
          expect(profile3.billing).to.have.property('address_line1', '123 fake street');
          expect(profile3.billing).to.have.property('name', 'John Update');
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it('Should successfully add a card to a profile and get cards', function(done) {
      var profile = {
        card:{
          name:"Jon Profile",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        },
        billing: {
          name: "Jon Profile",
          address_line1: "123 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return response.customer_code;
        })
        .then(function(profileId){
          var card2 = {
            name:"Jon Profile",
            number:"4030000010001234",
            expiry_month:"04",
            expiry_year:"20",
            cvd:"123"
          };
          return beanstream.profiles.addCard(profileId, card2);
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return beanstream.profiles.getCards(response.customer_code);
        })
        .then(function(cards){
          expect(cards).to.have.property('message', 'Operation Successful');
          expect(cards.card).to.not.be.null;
          expect(cards.card).to.be.an('array');
          expect(cards.card).to.have.length(2);
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it('Should successfully add a token to a profile', function(done) {
      var profile = {
        card:{
          name:"Jon Profile",
          number:"4030000010001234",
          expiry_month:"11",
          expiry_year:"22",
          cvd:"123"
        },
        billing: {
          name: "Jon Profile",
          address_line1: "123 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      var profile_id;

      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return response.customer_code;
        })
        .then(function(profileId){
          profile_id = profileId;
          var card = {
            number:"5100000010001004",
            expiry_month:"02",
            expiry_year:"19",
            cvd:"123"
          };
          return testUtil.tokenizeCard(card);
        })
        .then(function(tokenResp){
          expect(tokenResp).to.have.property('token');
          var token = {
            name: "Jon Profile",
            code: tokenResp.token
          };
          return beanstream.profiles.addToken(profile_id, token);
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it('Should successfully delete a card from a profile', function(done) {
      var profile = {
        card:{
          name:"Jon Profile",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        },
        billing: {
          name: "Jon Profile",
          address_line1: "123 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return response.customer_code;
        })
        .then(function(profileId){
          var card2 = {
            name:"Jon Profile",
            number:"4030000010001234",
            expiry_month:"04",
            expiry_year:"20",
            cvd:"123"
          };
          return beanstream.profiles.addCard(profileId, card2);
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return beanstream.profiles.getCards(response.customer_code);
        })
        .then(function(cards){
          expect(cards).to.have.property('message', 'Operation Successful');
          expect(cards.card).to.not.be.null;
          expect(cards.card).to.be.an('array');
          expect(cards.card).to.have.length(2);
          return cards.customer_code;
        })
        .then(function(profileId){
          return beanstream.profiles.deleteCard(profileId, 2);
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          return beanstream.profiles.getCards(response.customer_code);
        })
        .then(function(cards){
          expect(cards).to.have.property('message', 'Operation Successful');
          expect(cards.card).to.not.be.null;
          expect(cards.card).to.be.an('array');
          expect(cards.card).to.have.length(1);
          done();
        })
        .catch(function(error){
          console.log(error);
          expect(error.message).to.be.null;
          done();
        });
    });
    it('Should successfully update a card on a profile', function(done) {
      var profile = {
        card:{
          name:"Jon Profile",
          number:"5100000010001004",
          expiry_month:"02",
          expiry_year:"19",
          cvd:"123"
        },
        billing: {
          name: "Jon Profile",
          address_line1: "123 fake street",
          city: "victoria",
          province: "bc",
          postal_code: "V9A3Z4",
          country: "ca",
          email_address: "fake@example.com",
          phone_number:"12345678"
        }
      };
      beanstream.profiles.createProfile(profile)
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return response.customer_code;
        })
        .then(function(profileId){
          var card2 = {
            name:"Jon Profile",
            number:"4030000010001234",
            expiry_month:"04",
            expiry_year:"20",
            cvd:"123"
          };
          return beanstream.profiles.addCard(profileId, card2);
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          expect(response).to.have.property('customer_code');
          return beanstream.profiles.getCards(response.customer_code);
        })
        .then(function(cards){
          expect(cards).to.have.property('message', 'Operation Successful');
          expect(cards.card).to.not.be.null;
          expect(cards.card).to.be.an('array');
          expect(cards.card).to.have.length(2);
          return cards;
        })
        .then(function(cardResponse){
          var card = cardResponse.card[1];
          card.expiry_year = '30';
          return beanstream.profiles.updateCard(cardResponse.customer_code, 2, card);
        })
        .then(function(response){
          expect(response).to.have.property('message', 'Operation Successful');
          return beanstream.profiles.getCards(response.customer_code);
        })
        .then(function(cards){
          expect(cards).to.have.property('message', 'Operation Successful');
          expect(cards.card).to.not.be.null;
          expect(cards.card).to.be.an('array');
          expect(cards.card).to.have.length(2);
          expect(cards.card[1]).to.have.property('expiry_year', '30');
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