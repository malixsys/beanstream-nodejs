'use strict';

var api = require('./api');


function Profiles(beanstream) {
  if (!(this instanceof Profiles)) {
    return new Profiles();
  }
  
  this._api = new api(beanstream);
}

Profiles.prototype = {

  createProfile: function(profile) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles";
    
    return this._api._POST(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), profile);
  },

  getProfile: function(profileId) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles/${profileId}";
    
    var ids = {'profileId': profileId};

    return this._api._GET(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), ids);
  },

  // the profileID parameter is optional, but you must include the customerCode in the profile object instead then.
  updateProfile: function(profile, profileId) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles/${profileId}";
    
    var ids = {};
    if (profileId) {
      ids = {'profileId': profileId};
    } else {
      ids = {'profileId': profile.customer_code};
    }

    if (profile.card) {
      delete profile.card.number;
    }

    return this._api._PUT(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), profile, ids);
  },

  deleteProfile: function(profileId) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles/${profileId}";
    
    var ids = {'profileId': profileId};

    return this._api._DELETE(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), ids);
  },

  getCards: function(profileId) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles/${profileId}/cards";
    
    var ids = {'profileId': profileId};

    return this._api._GET(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), ids);
  },

  addCard: function(profileId, card) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles/${profileId}/cards";
    
    var ids = {'profileId': profileId};

    // api requires a "card" property in the message body.
    // if one is not there, add it and set the card object to that
    if (!card.card) {
      var wrapper = {
        card: card
      };
      card = wrapper;
    }

    return this._api._POST(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), card, ids);
  },

  addToken: function(profileId, token) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles/${profileId}/cards";
    
    var ids = {'profileId': profileId};

    // api requires a "card" property in the message body.
    // if one is not there, add it and set the card object to that
    if (!token.token) {
      var wrapper = {
        token: token
      };
      token = wrapper;
    }

    return this._api._POST(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), token, ids);
  },

  updateCard: function(profileId, cardId, card) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles/${profileId}/cards/${cardId}";
    
    var ids = {'profileId': profileId, 'cardId': cardId};

    // api requires a "card" property in the message body.
    // if one is not there, add it and set the card object to that
    if (!card.card) {
      var wrapper = {
        card: card
      };
      card = wrapper;
    }
    if (card.card.number.indexOf("X") > -1) {
      delete card.card.number;
    }

    return this._api._PUT(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), card, ids);
  },

  deleteCard: function(profileId, cardId) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "profiles/${profileId}/cards/${cardId}";
    
    var ids = {'profileId': profileId, 'cardId': cardId};

    return this._api._DELETE(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("profilesApiKey"), ids);
  },
};

module.exports = Profiles;
module.exports.Profiles = Profiles;
