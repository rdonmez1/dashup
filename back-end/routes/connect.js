var express = require('express');
var app = express();
var router = express.Router();
var request = require("request");
var format = require('util').format;

var helper = require("../lib/helper");
var middleware = require("../lib/middleware");
var config = require("../config/"+ process.env.NODE_ENV +".js");
var i18n = require("../i18n/en");

var Application = require("../models/application");
var Credential = require("../models/credential");
var Account = require("../models/account");
    
router.get("/:app", 
    getApplication, 
    getCredential, 
    processAuthorization, 
    function (req, res) {
        res.redirect(req.access_url);
});

router.get("/callback/:app",
    getApplication,
    getCredential,
    handleResponse,
    function (req, res) {
        res.redirect("../token/"+ req.app_name +"?code="+ req.query.code);
});

router.get("/token/:app",
    getApplication,
    getCredential,
    getToken,
    saveAccount, 
    function (req, res) {
        res.set('Content-Type', 'text/html');
        res.send(new Buffer('<script type="text/javascript">window.close();</script>'));
});

function getApplication (req, res, next) {
    App.findOne({ name: req.params.app }, function (err, doc) {
        req.app_credential = doc.credential;
        req.app_name = doc.name;
        if(err) next(err);
        else next();
    });
}

function getCredential (req, res, next) {
    Credential.findOne({ name: req.app_credential }, function (err, doc) {
        if(doc) req.credential = JSON.parse(JSON.stringify(doc));
        if(err) next(err);
        else next();
    });
}

function processAuthorization (req, res, next) {
    if(req.credential.type == "oauth2") {
        var access_url = format(
                "%s?access_type=%s&scope=%s&response_type=%s&client_id=%s&redirect_uri=%s",
                req.credential.auth_url,
                encodeURI( req.credential.access_type ),
                encodeURI( req.credential.scope.join(" ") ),
                encodeURI( req.credential.response_type ),
                encodeURI( req.credential.client_id ),
                encodeURI( req.credential.redirect_uri )
            );
        req.access_url = access_url;
        next();
     } else next();
}

function handleResponse(req, res, next) {
    if(req.credential.type == "oauth2") {
        next();
    } else next();
}

function getToken(req, res, next) {
    if(req.query.error) res.send("an error occurred: "+ req.query.error);
    console.log(req.query.code)
    var options = { 
        url: "https://www.googleapis.com/oauth2/v4/token",
        form: {
            code: req.query.code,
            client_id: req.credential.client_id,
            client_secret: req.credential.client_secret,
            redirect_uri: req.credential.redirect_uri,
            grant_type: "authorization_code",
            access_type: "offline"
        }
    };
    request.post(options, function (err, response, body) {
        req.body = JSON.parse(body);
        next();
    });
}

function saveAccount(req, res, next) {
    var expires_on = new Date();
    expires_on.setDate(expires_on.getDate() + parseInt(req.body.expires_in));
    
    var account = {};
    account.app = req.app_name;
    account.access_token = req.body.access_token;
    account.refresh_token = req.body.refresh_token;
    account.expires_on = expires_on;
    account.token_type = req.body.token_type;

    Account.update(
        { user_id: req.user.id },
        { $set: account },
        {
          $currentDate: { updated_on: true },
          $setOnInsert: { created_on: new Date() },
          upsert: true
        }, 
    function (err, doc) {
        if(err) next(err);
        else next();
    });
}

module.exports = router;