var express = require('express');
var app = express();
var router = express.Router();
var passport = require("passport");

var helper = require("../lib/helper");
var middleware = require("../lib/middleware");
var config = require("../config/"+ process.env.NODE_ENV +".js");
var i18n = require("../i18n/en");

router.get("/", isAuthenticated, function(req, res) {
    res.render("index", { metaTitle: i18n.homepage });
});

router.get("/signin", isUnAuthenticated, function(req, res) {
    var return_url = req.query.returnUrl;
    if(return_url == null || isLocalUrl(return_url))
        res.render("user/signin", { metaTitle: i18n.signin, return_url: return_url });
    else
        res.send("Opps, Return URL must be valid local url.")
});

router.get("/signup", isUnAuthenticated, function(req, res) {
    res.render("user/signup", { metaTitle: i18n.signup });
});

router.get("/forgot-password", isUnAuthenticated, function(req, res) {
    res.render("user/forgot-password", { metaTitle: i18n.forgotpassword });
});

router.get("/email-activation", 
    isUnAuthenticated, 
    passport.authenticate("email-activation"),
    function(req, res) {
        res.render("user/email-activation", { metaTitle: i18n.activation  });
});

router.get("/reset-password/:secret", 
    isUnAuthenticated, 
    function(req, res) {
    res.render("user/reset-password", { metaTitle: i18n.resetpassword, secret: req.params.secret });
});

router.get("/signout", isAuthenticated, function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/settings", isAuthenticated, function(req, res) {
    res.render("user/settings", { metaTitle: i18n.settings });
});
 
function isAuthenticated (req, res, next) {
  if ( req.isAuthenticated() ) return next();
  else res.redirect("/signin?returnUrl=" + encodeURIComponent(req.originalUrl));
}

function isUnAuthenticated (req, res, next) {
  if ( req.user ) res.redirect("/");
  else next();
}

function isLocalUrl(url) {
    return /^([\/\w \.-]*)*\/?$/.test(decodeURI(url));
}

module.exports = router;