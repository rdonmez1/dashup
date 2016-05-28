var express = require('express');
var app = express();
var router = express.Router();
var request = require("request");

var helper = require("../lib/helper");
var middleware = require("../lib/middleware");
var config = require("../config/"+ process.env.NODE_ENV +".js");
var i18n = require("../i18n/en");

var Account = require("../models/account");

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var analytics = google.analytics('v3');
var oauth2Client = new OAuth2(
    config.ga_client_id, 
    config.ga_client_secret, 
    config.ga_redirect_uri);

router.get("/accounts", getToken, getAccounts, function (req, res) {
    res.json(req.result);
});

router.get("/properties/:account_id", getToken, getProperties, function (req, res) {
    res.json(req.result);
});

router.get("/views/:account_id/:property_id/",  getToken, getViews, function (req, res) {
    res.json(req.result); 
});

function getAccounts(req, res, next) {
    oauth2Client.setCredentials({
      access_token: req.access_token
    });
    analytics.management.accounts.list({
      auth: oauth2Client,
      "max-results": 1000,
      "start-index": 1
    }, function (err, body) {
      req.result = body;
      if (err) next(err);
      else next();
    });
}

function getProperties(req, res, next) {
    var account_id = req.params.account_id;
    oauth2Client.setCredentials({
      access_token: req.access_token
    });
    analytics.management.webproperties.list({
      auth: oauth2Client,
      "accountId": account_id,
      "max-results": 1000,
      "start-index": 1
    }, function (err, body) {
      req.result = body;
      if (err) next(err);
      else next();
    });
}

function getViews(req, res, next) {
    var account_id = req.params.account_id;
    var property_id = req.params.property_id;
    oauth2Client.setCredentials({
      access_token: req.access_token
    });
    analytics.management.profiles.list({
      auth: oauth2Client,
      "accountId": account_id,
      "webPropertyId": property_id,
      "max-results": 1000,
      "start-index": 1
    }, function (err, body) {
      req.result = body;
      if (err) next(err);
      else next();
    });
}


function getToken(req, res, next) {
    Account.findOne({ user_id: req.user.id, app: "ga" }, { access_token: 1 }, function (err, doc) {
        req.access_token = doc.access_token;
        if(err) next(err);
        else next();
    });
}

module.exports = router;