var express = require('express');
var app = express();
var router = express.Router();
var passport = require("passport");

var middleware = require("../lib/middleware");
var membership = require("../lib/membership");
var config = require("../config/"+ process.env.NODE_ENV +".js");
var i18n = require("../i18n/en.js");
var User = require("../models/user");
var Account = require("../models/account");

router.get('/me',
  isAuthenticated,
  function (req, res) {
    res.json({ user: req.user });
  }
);

router.post('/signin', 
  isUnAuthenticated,
  passport.authenticate('local-signin'),
  function (req, res) {
    res.json({ message: i18n.successfully_login, return_url: req.body.return_url });
  }
);

router.post('/signup', 
  isUnAuthenticated,
  passport.authenticate('local-signup'),
  function (req, res) {
    res.json({ message: i18n.successfully_signup });
  }
);

router.post('/forgot-password', 
  isUnAuthenticated,
  middleware.verifyCaptcha,
  passport.authenticate('forgot-password'),
  function (req, res) {
    res.json({ message: i18n.successfully_forgot_pass });
  }
);

router.post('/reset-password', 
  isUnAuthenticated,
  passport.authenticate('reset-password'),
  function (req, res) {
    res.json({ message: i18n.successfully_reset_pass });
  }
);

router.post('/change-password', 
  isAuthenticated,
  passport.authenticate('change-password'),
  function (req, res) {
    res.json({ message: i18n.successfully_change_pass });
  }
);

router.post('/change-email', 
  isAuthenticated,
  passport.authenticate('change-email'),
  function (req, res) {
    res.json({ message: i18n.successfully_change_email });
  }
);

router.post('/change-profile', 
  isAuthenticated,
  passport.authenticate('change-profile'),
  function (req, res) {
    res.json({ message: i18n.successfully_change_profile });
  }
);
 
router.post('/signout', 
  isAuthenticated,
  function (req, res) {
    req.logout();
    res.json({ message: i18n.successfully_signed_out });
});

router.get("/accounts", isAuthenticated, getAccounts, function(req, res) {
   res.json(req.result);
});

router.get("/accounts/:app_id", isAuthenticated, function(req, res) {
   // bu account gerçekten bu kullanıcının mı?
   
   // select app
   
   // select token
   
   // call api
   var api_path = util.format("../apps/%s/api.js", req.params.name)
   var Api = require(api_path);
   Api.getSiteList(account, function(body){
       res.json(body);
   });
});


function getAccounts (req, res, next) { 
    // select params
    var page = req.body.page || 1;
    var q = req.body.q;
    var page_size = req.body.page_size || 50;
    var app_id = req.body.app_id || "";
    // set default params
    if(page < 1) page = 1;
    // set query
    var query = { user_id: req.user.id };
    if(app_id) query["app_id"] = app_id;
    if(q) query["account_name"] = { $regex: ""+ q +"", $options: 'i'  }
    console.log(query)
    // select count
    Account.count(query, function (err, count) {
      // find items
      Account.find(query, projection)
      .sort({ updated_on: -1 })
      .skip( ( page - 1) * page_size )
      .limit(page_size)
      .exec(function (err, docs) {
          if(!docs) next(new Error(i18n.no_result_found));
          var result = new Result();
          result.items = docs;
          result.total = count;
          result.page_count = Math.ceil(count / page_size);
          result.page = page;
          result.page_size = page_size;
          req.result = result;
          next();
      });
    });
}

function isAuthenticated (req, res, next) {
  if ( req.isAuthenticated() ) return next();
  else res.redirect("/signin?returnUrl=" + encodeURIComponent(req.originalUrl));
}

function isUnAuthenticated (req, res, next) {
  if ( req.user ) res.redirect("/");
  else next();
}

module.exports = router;